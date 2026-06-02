---
outline: deep
---

# Individual Block Structure

Each element in the `blocks` array has the following structure:


```json5
{
  "id": "d452c1c0-0a38-483d-91c3-41b376e14c74", // unique block ID
  "name": "",                                    // block internal name (if any)
  "title": "Description",                        // display title
  "own": false,                                  // whether the block belongs to this element (false – inherited from a template)
  "type": "text",                                // block type (text, grid, properties, gallery, script, level, etc.)
  
  "props": { ... },      // block's own values (overridden in the current element)
  "inherited": { ... },  // values inherited from the template
  "computed": { ... },   // resulting values (union of inherited and props, and in the future – computed formulas)
  
  "index": 3.42,                // display order
  "createdAt": "2024-02-17T10:05:04.952Z",
  "updatedAt": "2024-05-24T16:43:35.181Z"
}
```

**For the engine, it is recommended to use the `computed` field**, as it already contains the final values taking inheritance and (prospectively) formulas into account. If `computed` is absent or an overridden value is required, you can look at `props`, or if that is absent – at `inherited`.

## Property Value Types (Leaf Types)

All property values inside `props`, `inherited`, and `computed` are strictly typed. The following types are supported (`AssetPropType` enumeration): [Type Description (`AssetPropValueType`)](#type-description-assetpropvaluetype)

### Formatted Text (`AssetPropValueText`)


```typescript
type AssetPropValueText = {
  Str: string;        // unformatted text representation
  Ops: {              // array of formatting operations (Delta format)
    insert?: any;       // inserted text or object (image, etc.)
    attributes?: any;   // attributes (bold, italic, link, color, etc.)
  }[];
};
```

### Attached File (`AssetPropValueFile`)

```typescript
type AssetPropValueFile = {
  FileId: string;   // file UUID in storage
  Title: string;    // file name
  Size: number;     // size in bytes
  Dir: string | null; // relative path to folder within storage
  Store: string;    // storage (e.g., "local" or "cloud")
};
```

### Arbitrary Data (`AssetPropValueBlob`)

```typescript
type AssetPropValueBlob = {
  Blob: any;       // content (usually base64 encoded)
  Type: string;    // MIME type or custom type
  Key?: string;    // optional comparison key
};
```

### Reference to an Element (`AssetPropValueAsset`)

```typescript
type AssetPropValueAsset = {
  AssetId: string;      // UUID of the target element
  Title: string;        // display name
  Name: string | null;  // internal name (if any)
  Pid?: string;         // project ID (for external elements)
  BlockId?: string | null; // ID of a specific block within the element
  Anchor?: string | null;   // anchor (e.g., "#heading")
};
```

### Reference to a Member (`AssetPropValueAccount`)

```typescript
type AssetPropValueAccount = {
  AccountId: string;    // user ID
  Name: string;         // user name in the project
};
```

### Enum Value (`AssetPropValueEnum`)

```typescript
type AssetPropValueEnum = {
  Enum: string;      // UUID of the enumeration (list of allowed values)
  Name: string;      // internal name of the selected value
  Title: string;     // display name of the selected value
};
```

### Reference to a Project (`AssetPropValueProject`)

```typescript
type AssetPropValueProject = {
  ProjectId: string;    // project ID
  Title: string;        // project title
};
```

### Date/Time (`AssetPropValueTimestamp`)

```typescript
type AssetPropValueTimestamp = {
  Str: string;    // text representation in ISO 8601 format (e.g., "2024-05-24T16:43:35.181Z")
  Ts: number;     // number of seconds since Unix epoch
};
```

### Reference to a Folder (`AssetPropValueWorkspace`)

```typescript
type AssetPropValueWorkspace = {
  WorkspaceId: string;    // folder UUID
  Title: string;          // display name
  Name: string | null;    // internal name
  Pid?: string;           // project ID if the folder is in an external project
};
```

### Element Selection (`AssetPropValueSelection`)

```typescript
type AssetPropValueSelection = {
  Str: string;                    // string representation of the selection (e.g., "type=Enemy, health>50")
  Select: any;                    // selection fields
  Group: any;                     // grouping fields
  Where: AssetPropWhere;          // filter conditions
  Order?: { Field: string; Asc: boolean }[]; // sort order
  Offset?: number;                // offset (pagination)
  Count?: number;                 // number of requested elements
};
```

### Type Description (`AssetPropValueType`)

```typescript
type AssetPropValueType = {
  Type: AssetPropType;        // base type (from the enumeration above)
  Kind?: string;              // refinement (e.g., UUID of an enumeration for the `enum` type)
  Of?: AssetPropValueType;    // element type for arrays (type argument)
};
```

### Example of Engine Reading

Suppose a project has a game object "Warrior" with the following data:

* Title: `Warrior`

* Block "characteristics" (internal name `stats`) contains properties: `health = 100`, `attack = 10`.

* Block "inventory" (internal name `inv`) – a values table with a list of items.

The element JSON file will include:

```json5
{
  "id": "5db2ddf6-580b-4eb8-bd5b-9f6989d7b3ee",
  "title": "Warrior",
  "name": "",
  "values": {
    "stats": {
      "health": 100,
      "attack": 10
    },
    "inv": [ ... ]   // values table data
  },
  "blocks": [ ... ]
}
```

The engine can load this JSON and use:

```csharp
// C# pseudocode
var warriorJson = LoadJson("Warrior.json");
int health = warriorJson["values"]["stats"]["health"]; // 100
int attack = warriorJson["values"]["stats"]["attack"]; // 10
var inventory = warriorJson["values"]["inv"];          // array of items
```

Since the data is presented in an open JSON format, engines in any programming language (C++, C#, Python, JavaScript, Lua) integrate easily with the system.
