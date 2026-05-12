---
outline: deep
---

# Level Storage

A block of type `level` (or `levelEditor`) is designed for visual design of game levels. It represents a **canvas** on which various **shapes** (objects) are placed: polygons, images, ellipses, pointers to project elements, and so on. Level data is stored as a flat dictionary of objects, each having coordinates, type, rendering parameters, and possibly a reference to an element.

## General Block Structure

The level block is located inside the `blocks` array of an element (or can be the only block when creating an element of type "Level"). The content is stored in the `props` field (or `computed`) and has the following structure:

```json
{
  "objects": {
    "object-uuid-1": { ... },
    "object-uuid-2": { ... }
  }
}
```

Dictionary keys are unique object identifiers (UUIDs), values are shape descriptions.

## Basic Fields of All Objects

Each object on the canvas has mandatory and optional fields:

|      Field      |          Type          |                                 Description                                |
|:--------------:|:---------------------:|:-----------------------------------------------------------------------:|
| id             | string (UUID)         | Unique object identifier (matches the key in the dictionary)         |
| type           | string                | Shape type: "polygon", "image", "pointer", "ellipse", "rectangle", etc. |
| x              | number                | X coordinate of the center (or anchor point) on the canvas                       |
| y              | number                | Y coordinate of the center (or anchor point)                                 |
| index          | number                | Rendering order (Z-index, the higher the value, the higher the layer)                      |
| locked         | boolean (optional) | Whether the object is locked from moving/editing                    |
| scaleX, scaleY | number (optional)  | Scale along axes (default is 1)                                        |
| params         | object                | Type-specific parameters (shape, fill, references, etc.)          |

## Object Types and Their Parameters

**Polygon (`type: "polygon"`)**
Defined by an array of points relative to the center (`x`, `y`). Points are listed in local coordinates.

| Field in params |             Type            |                     Description                    |
|:-------------:|:--------------------------:|:-----------------------------------------------:|
| points        | { x: number, y: number }[] | Array of vertices (relative coordinates)        |
| fill          | string (optional)       | Fill color (CSS format, e.g. "#eed81133") |
| stroke        | string (optional)       | Stroke color                                    |
| strokeWidth   | number (optional)       | Stroke width                                 |

**Example:**

```json
{
  "id": "2f40f785-4327-488f-b7b7-e7fc13db98a0",
  "type": "polygon",
  "x": 1124.2,
  "y": 532.36,
  "index": 1.866,
  "params": {
    "points": [
      { "x": 0, "y": 0 },
      { "x": -73, "y": -29.99 },
      { "x": -101, "y": -69.99 },
      { "x": -61, "y": -95.98 },
      { "x": 28, "y": -99.98 },
      { "x": 86, "y": -67.99 },
      { "x": 69, "y": -3.0 }
    ],
    "fill": "#eed81133",
    "stroke": "#eed811"
  }
}
```

**Image (`type: "image"`)**
Places a raster image on the canvas.

| Field in params |         Type        |                  Description                  |
|:-------------:|:------------------:|:------------------------------------------:|
| file          | AssetPropValueFile | Structure of the attached file (see 7.4.2) |
| width         | number             | Image width on the canvas (in pixels)  |
| height        | number             | Image height on the canvas               |

**Example:**

```json
{
  "id": "b1bbc542-fe56-4a69-9fc0-9afcb3b404da",
  "type": "image",
  "x": 672.4,
  "y": 132.76,
  "index": 1.175,
  "locked": true,
  "params": {
    "file": {
      "FileId": "8add86ce-0d56-429b-be13-58c7c869d69f",
      "Title": "image.png",
      "Size": 5075104,
      "Dir": null,
      "Store": "p-1111JG"
    },
    "width": 1024,
    "height": 1024
  }
}
```

**Element Pointer (`type: "pointer"`)**
Used to attach a game object (character, item, event) to a point on the map.
|             Field            |         Type         |                Description                |
|:---------------------------:|:-------------------:|:--------------------------------------:|
| value                       | AssetPropValueAsset | Reference to an element (see 7.4.4)          |
| scaleX, scaleY              | number              | Display scale (optional)      |
| params.width, params.height | number              | Area dimensions (for icon rendering) |

**Example:**

```json
{
  "id": "856948b1-7714-410c-bda4-0b6b4e668097",
  "type": "pointer",
  "x": 1110,
  "y": 488,
  "index": 2.351,
  "scaleX": 1,
  "scaleY": 1,
  "value": {
    "AssetId": "fd856426-2dc1-4fb9-bb99-2b54c8084ef2",
    "Title": "Warrior"
  },
  "params": {
    "width": 100,
    "height": 100
  }
}
```

**Ellipse (`type: "ellipse"`)**
Draws an ellipse (or a circle if `rx == ry`).

| Field in params |          Type         |     Description    |
|:-------------:|:--------------------:|:---------------:|
| rx            | number               | Radius along the X axis |
| ry            | number               | Radius along the Y axis |
| fill          | string (optional) | Fill color    |
| stroke        | string (optional) | Stroke color    |

**Example:**

```json
{
  "id": "28d02eab-269e-4d90-9e9a-b75e6527af19",
  "type": "ellipse",
  "x": 788.49,
  "y": 493.43,
  "index": 5.884,
  "params": {
    "rx": 53.91,
    "ry": 54.59
  }
}
```

**Rectangle (`type: "rectangle"`)**
Expected structure: fields `width`, `height`, `fill`, `stroke`, `strokeWidth` (similar to ellipse and polygon).

### Complete Level Block Example in JSON

```json
{
  "id": "level-block-uuid",
  "name": "level",
  "type": "level",
  "props": {
    "objects": {
      "2f40f785-4327-488f-b7b7-e7fc13db98a0": { ... },
      "856948b1-7714-410c-bda4-0b6b4e668097": { ... },
      "b1bbc542-fe56-4a69-9fc0-9afcb3b404da": { ... }
    }
  }
}
```

### Reading the Level by the Engine

The game engine can:

1. Extract the level block from the element JSON (by type `level` or internal name).

2. Iterate over all objects in `objects`.

3. For each object:

   * Read `type` and render the corresponding shape (`polygon`, `image`, `ellipse`, etc.).

   * For `pointer` — create an instance of the game object specified in `value` and place it at world coordinates `(x, y)` taking scale into account.

   * Use `index` to manage layers (Z-order).

4. Optionally, apply `fill`/`stroke` colors for collision or visual debugging.

Since all data is represented in pure JSON, an engine in any programming language can interpret the level without additional parsers.