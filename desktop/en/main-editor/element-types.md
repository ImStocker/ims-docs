---
outline: deep
---
# Element Types

When creating a new element (via the button in the left panel), you are prompted to select a **base type**. The choice determines the initial structure of the element.

## Main Types (Available Directly)

| Type | Purpose | Initial Content |
|------|---------|-----------------|
| **Text** | Plain text document | Element with one text block (unformatted or with basic formatting) |
| **Markdown** | Document in Markdown format | Element where text is written using Markdown syntax. **Important:** such elements are saved in `.md` format, not `.json` (like all others). This is convenient for exporting to systems that support Markdown. |
| **Game Object** | Object with image, description, and properties | Element with a preset structure: gallery block (for icon), text description, properties table for parameters. More details [see Game Objects and Templates section](game-objects-and-templates.md). |
| **Game Mechanic** | Text description of a game mechanic | Simple text element, optimized for writing rules, formulas, mechanics. |
| **Diagram** | Visual diagram | Element containing only one block – a **diagram** [see Diagram section](block-types.md#diagram). |
| **Script** | Visual script / dialog | Element containing only one block – a **script** [see Script section](block-types.md#script). |
| **Level** | Level editor | Element containing only one block – a **level editor** [see Level Editor section](block-types.md#level-editor). |

## Additional Types (via "Other" Button)

When clicking the **"Other"** button, an extended list opens with two more important types:

| Type | Purpose | Usage |
|------|---------|-------|
| **Structure** | Complex composite data type | Allows creating a **structure** with multiple fields (e.g., coordinate `x, y`; composition `ingredient, quantity`). After creation, the structure can be used in a **properties table** or **values table** as a column type. This allows storing complex values in a single cell. |
| **Enumeration (enum)** | Set of predefined values | Creates an enumeration with options (e.g., attack type: `physical`, `fire`, `ice`, `lightning`). The enumeration can then be selected as a column type in a properties table or values table. The user can choose one of the values from a dropdown (standard or radio buttons). |
| **Other element** | Allows using any element in the project as a **base template** | The "template → instance" mechanism is universal: you can create copies of any documents, preserving their structure, blocks, and settings for quick work [see Any Element as a Template section](game-objects-and-templates.md#any-element-as-a-template-universal-mechanism) |

## Usage Examples

**Example of a structure:**  
Create a "Vector2" structure with fields `x` and `y` (type `Number`). Then in a properties table, create a column with type "Structure" and select "Vector2". In the cell, you can enter a pair of numbers `(10, 20)`, which will be saved as a structured object.

**Example of an enumeration:**  
Create an "Element" enumeration with values "Fire", "Ice", "Lightning". Then in a properties table, create a column with type "Enumeration" and specify "Element". A dropdown with options will appear in the cells.
