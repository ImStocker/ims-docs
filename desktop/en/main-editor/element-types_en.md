---
outline: deep
---
# Element Types

When creating a new element (via the button in the left panel), you are prompted to choose a **base type**. The initial structure of the element depends on this choice.

## Main Types (Available Directly)

| Type | Purpose | Initial Content |
|------|---------|-----------------|
| **Text** | Regular text document | Element with a single text block (without formatting or with basic) |
| **Markdown** | Document in Markdown format | Element where text is written using Markdown markup. **Important:** such elements are saved in `.md` format, not `.json` (like all others). This is convenient for exporting to systems that support Markdown. |
| **Game Object** | Object with an image, description, and properties | Element with a preset structure: gallery block (for icon), text description, properties table for parameters. For more details [see Game Objects and Templates section](game-objects-and-templates_en.md). |
| **Game Mechanic** | Text description of a game mechanic | Simple text element optimized for recording rules, formulas, mechanics. |
| **Diagram** | Visual diagram | Element containing only one block – **diagram** [see Diagram section](block-types_en.md#diagram). |
| **Script** | Visual script / dialog | Element containing only one block – **script** [see Script section](block-types_en.md#script). |
| **Level** | Level editor | Element containing only one block – **level editor** [see Level Editor section](block-types_en.md#level-editor). |

## Additional Types (via the "Other" Button)

When clicking the **"Other"** button, an extended list opens where two more important types are available:

| Type | Purpose | Application |
|------|---------|-------------|
| **Structure** | Complex composite data type | Allows you to create a **structure** from several fields (for example, coordinate `x, y`; composition `ingredient, quantity`). After creation, the structure can be used in a **properties table** or **values table** as a column type. This allows storing complex values in a single cell. |
| **Enumeration (enum)** | A set of predefined values | An enumeration is created with options (for example, attack type: `physical`, `fire`, `ice`, `lightning`). Then the enumeration can be selected as a column type in a properties table or values table. The user will be able to select one of the values via a dropdown list (regular or radio buttons). |
| **Other Element** | Allows using any element in the project as a **base template** | The "template → instance" mechanic is universal: you can create copies of any documents, preserving their structure, blocks, and settings for quick work [see Any Element as a Template section](game-objects-and-templates_en.md#any-element-as-a-template-universal-mechanism) |

## Usage Examples

**Structure Example:**
Create a structure "Vector2" with fields `x` and `y` (type `Number`). Then in the properties table, create a column with type "Structure" and select "Vector2". In the cell, you can enter a pair of numbers `(10, 20)`, which will be saved as a structured object.

**Enumeration Example:**
Create an enumeration "Element" with values "Fire", "Ice", "Lightning". Then in the properties table, create a column with type "Enumeration" and specify "Element". A dropdown list with options will appear in the cells.
