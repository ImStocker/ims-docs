---
outline: deep
---
# General Element File Structure

Each element (document, game object, block, collection) is represented by a JSON object of the following form:


```json5
{
  "id": "5db2ddf6-580b-4eb8-bd5b-9f6989d7b3ee",   // unique element identifier (UUID)
  "projectId": "FPX6pFkX",                       // project identifier (short)
  "title": "Warrior",                            // display name
  "name": "",                                    // internal name (used during export)
  "creatorUserId": 28,                           // element creator ID
  "isAbstract": false,                           // abstract element flag (template from which instances cannot be created)
  
  "parentIds": [...],                            // list of direct parent IDs (base element / template)
  "typeIds": [...],                              // IDs of the entire parent chain (all ancestors)
  
  "createdAt": "2024-02-15T03:42:27.297Z",       // creation date (ISO 8601)
  "updatedAt": "2024-05-24T16:43:35.181Z",       // last update date
  
  "workspaceId": "aa0f0949-53b2-47ef-b7ca-2fb4cc1d36f5", // ID of the folder containing the element
  "ownIcon": null,                               // icon override (if any)
  "icon": "walk-fill",                           // default icon name
  "index": 4,                                    // display order (floating-point number)
  
  "values": { ... },                             // values of blocks with internal name
  "blocks": [ ... ]                              // array of blocks comprising the element
}
```

**Key fields for the engine:**

* `id` – unambiguous reference to the element (used in properties of type `Asset`).

* `name` – internal name (if set, the value goes into the root `values` object).

* `parentIds` / `typeIds` – allow restoring the inheritance hierarchy (templates and instances).

* `values` – a flat object where keys are block internal names and values are block data [see Fields section](#fields-values-and-block-internal-names).

* `blocks` – complete list of blocks with their settings (including those without internal names).

## Fields `values` and block internal names

If a block (property table, values table, text block, etc.) has an **internal name** (`name`) assigned in the editor, its data is duplicated in the root `values` object under that name. This is convenient for quick access to key element data without having to parse the entire `blocks` array.

**Example:**
In a game object, two properties (`health` and `attack`) are created inside a block with the internal name `props`. In JSON this looks like:


```json
"values": {
  "props": {
    "health": 100,
    "attack": 10
  }
}
```

The engine can directly access `values.props.health` and `values.props.attack`.

If no internal name is set, the block data is only present inside the `blocks` array.
