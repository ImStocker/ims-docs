---
outline: deep
---

# Script (Dialog) Storage

Scripts (dialogs, visual scripts) are stored as a **graph** inside a block of type `script`. This graph consists of nodes (`nodes`) connected by transitions (`next`), and may contain variables and speech settings. The script data is fully represented in JSON and can be interpreted directly by the game engine.

## General Script Graph Structure

The graph is described by the `ImscScriptGraph` interface:

```typescript
type ImscScriptGraph = {
  start: string | null;                     // ID of the start node
  variables?: ImscScriptGraphVariables;     // script variables
  __settings?: ImscScriptGraphSettings;     // speech settings
  nodes: { [id: string]: ImscScriptGraphNode }; // node dictionary
}
```

* `start` – identifier of the node where execution begins.

* `variables` – local script variables ([see Script Variables section](#script-variables)).

* `__settings` – field settings for speech lines and options ([see Dialog-Specific Speech Settings section](#dialog-specific-speech-settings)).

* `nodes` – collection of all nodes, each node has a unique string ID (UUID).

## Node Types

|                                                     Node Type                                                     |                   Purpose                   |                                           Fields                                           |
|:----------------------------------------------------------------------------------------------------------------:|:------------------------------------------:|:-----------------------------------------------------------------------------------------:|
| start                                                                                                             | Entry point into the script                | `next: string \| null`                                                                      |
| speech                                                                                                            | Character line or text with choices        | `next, subject: string, values?: ImscScriptGraphVals, options?: ImscScriptGraphNodeOption[]` |
| trigger                                                                                                           | Call external engine function (game logic) | `next, subject: string, params?: { in?, out? }, values?`                                    |
| branch                                                                                                            | Conditional branching (two branches)       | `values: { condition: ImscScriptGraphVal }, options: [option, option]`                      |
| getVar                                                                                                            | Read a variable value                      | `values: { variable: string }`                                                              |
| setVar                                                                                                            | Set a variable value                       | `next, values: { variable: string, value: ImscScriptGraphVal }`                             |
| constAsset, constText, constString, constInteger, constFloat, constBoolean                                        | Constant (value)                           | `values: { value: ... }`                                                                    |
| opAnd, opOr, opMod, opDiv, opMult, opMinus, opPlus, opMoreEqual, opMore, opLessEqual, opLess, opNotEqual, opEqual | Binary operations                          | `values: { arg1, arg2 }`                                                                    |
| opNot                                                                                                             | Unary negation                             | `values: { arg1 }`                                                                          |
| end                                                                                                               | Script termination                         | (no fields)                                                                               |

All nodes inherit base fields: `index` (rendering order), `pos: { x, y }` (editor coordinates), and may also have `next` (ID of the next node).

## Values and Bindings

Node `values` fields can contain:

* **Direct values** – primitives, objects, arrays ([see Property Value Types (Leaf Types)](block-structure.md#property-value-types-leaf-types)).

* **Bindings** (`ImscScriptGraphValBind`) – references to the result of another node:
  `{ get: "node_uuid", param: "output_parameter_name" }`

Example from a real script (branch `condition` node references the result of node `1c9c41e4...`):

```json
"values": {
  "condition": {
    "get": "1c9c41e4-a219-441e-a716-753bfbd77486",
    "param": "result"
  }
}
```

## Script Variables

Variables are described in the `variables.own` field:

```typescript
type ImscScriptGraphVarDef = {
  name: string;           // internal variable name
  type: { Type: string }; // type (integer, boolean, text, etc.)
  title: string;          // display name
  default?: any;          // default value
  description?: string | null;
  index: number;          // order
  autoFill?: boolean | null;
}
```

Example:

```json
"variables": {
  "own": {
    "luck": {
      "name": "luck",
      "type": { "Type": "integer" },
      "title": "Luck",
      "description": "Player luck"
    }
  }
}
```

## Dialog-Specific Speech Settings

The `__settings.speech` field defines which fields can be added to speech lines (`main`) and options (`option`), as well as their types. This allows extending dialogs with additional parameters (e.g., `tools`, `supplies`).

Example from JSON:

```json
"__settings": {
  "speech": {
    "main": {
      "text": { "name": "text", "type": { "Type": "text" }, "index": 0, "title": "[[t:Text]]" },
      "additional": { "name": "additional", "type": { "Type": "text" }, "index": 1, "title": "Additional" }
    },
    "option": {
      "text": { "name": "text", "type": { "Type": "text" }, "title": "[[t:Text]]" },
      "tools": { "name": "tools", "type": { "Type": "integer" }, "index": 1, "title": "Tools" }
    }
  }
}
```

Then in a `speech` node you can specify `values.text` (main text), `values.additional` (additional text), and in options – `values.tools` (number of tools required for selection).

## Example Fragment of a Real Script

Below is a `speech` node with choice options (taken from the "Rotting Bridge" event example):

```json
"f77540c8-5772-4136-a7ed-a913d411f313": {
  "next": null,
  "type": "speech",
  "index": 2.3549749864025,
  "options": [
    {
      "next": "65b8d68c-3da7-4e49-bf41-a0f0388627b6",
      "values": {
        "text": "Use Rope for Safety",
        "condition": {
          "get": "e20893c8-1dde-4a4c-a545-412e726271fe",
          "param": "result"
        }
      }
    },
    {
      "next": "a329d371-1617-471b-8707-62c43d343a65",
      "values": { "text": "Strengthen Bridge", "tools": 5 }
    },
    {
      "next": "b57ca762-dc37-4c89-ad3d-a8cc696b3625",
      "values": { "text": "Risk crossing without safety" }
    },
    {
      "next": "c9748e9c-d771-437e-adf0-e113e3b2466f",
      "values": { "text": "Find a way around" }
    }
  ],
  "pos": { "x": 300, "y": 180 },
  "values": {
    "text": "The squad reaches a deep gorge...",
    "additional": "The bridge is about to collapse..."
  }
}
```

* The node has no `next` transition (it shows an option menu).

* Each option contains text (`text`) and possibly a visibility condition (`condition`) or additional cost (`tools`).

* When an option is selected, execution transitions to the node specified in that option's `next`.

## Script Execution in the Engine

For interpreting the graph and executing dialogs in web engines (Phaser, Pixi.js, Cocos, etc.), a **JavaScript library** [`imsc-script-js`](https://github.com/ImStocker/imsc-script-js/) has been developed. It allows:

* Loading a JSON script description.

* Traversing nodes, processing speech lines, branches, trigger calls.

* Managing variables.

* Integrating with engine rendering and UI.

Similar modules for other environments (Unity, Unreal, Godot) are planned. However, since the format is **open JSON**, any engine can implement its own interpreter by following the described types.

## Location in the Element File

The script graph is stored in a **block of type `script`** inside the `blocks` array. Example from a full JSON:

```json
{
  "blocks": [
    ... // other blocks (props, text, etc.)
    {
      "id": "c85e8ccf-1291-432e-8021-557c95d30e11",
      "name": "script",
      "type": "script",
      "props": { "variables": {...}, "__settings": {...}, "nodes": {...} },
      "computed": { ... }
    }
  ]
}
```

If the `script` block is assigned an internal name (e.g., `"name": "dialog"`), its data will also be accessible in `values.dialog` for quick access.
