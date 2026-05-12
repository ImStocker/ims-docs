---
outline: deep
---
# Content Organization

As the project grows, the number of elements increases. For convenient navigation, structuring, and bulk data operations, the system provides two main tools: **folders** and **collections**.
<img src="../images/folders_collect_en.png" alt="folder" width="270">

## Folders

Folders are designed for **grouping any elements** (documents, game objects, blocks, scripts, etc.) **without type restrictions**. A single folder can contain elements of different types.

**Creating a folder:**
- In the left panel (project tree), click the button to the right of "Create element" and select the **«Folder»** type.
- Give the folder a name (for example, «Characters», «Locations», «Dialogs», «Artifacts»).

**Using folders:**
- Drag existing elements into a folder and back.
- You can create **nested folders** inside folders (any nesting depth).
- Folders help organize the project by semantic sections without mixing heterogeneous elements.

<img src="../images/foldert_en.png" alt="folder" width="270" >

## Collections

A **collection** is a special kind of folder that is **bound to a specific element type** (or to a specific sample element). All elements created inside a collection are automatically created as **instances** of this sample [see Any Element as a Template (Universal Mechanism) section](game-objects-and-templates_en.md#any-element-as-a-template-universal-mechanism).

**How to create a collection:**
1. In the project tree, click the button to the right of "Create element".
2. Select the **«Collection»** type.
3. Specify the **source element** (sample) from which the structure and content will be taken. This can be:
   - a game object (for example, «Base Character»);
   - a text document (for example, «Quest Template»);
   - a checklist, diagram, script, structure, enumeration — any element.
4. Give the collection a name (for example, «Team of Heroes»).

**Features of working with collections:**

- **Bulk editing** — you can open a collection as a **table**, where rows are collection elements and columns are their properties. This allows you to quickly change values for many elements at once (for example, increase the health level of all characters in the collection).
- **Editing individual elements** — each collection element can be opened as a regular element and changed individually (including adding unique blocks without affecting others).
- **Automatic typing** — when creating a new element inside a collection, you do not need to select the type each time; it is set by the collection.
- **Bulk addition** — you can create several elements in the collection at once, specifying only names.

**Example:**
1. Create an instance template "Character" with properties `health`, `attack`, `mana`.
2. Create a collection "Game Characters" bound to the "Character" template.
3. Add three characters to the collection: "Warrior", "Mage", "Archer".
4. Open the collection as a table — you will see three rows and columns `health`, `attack`, `mana`.
5. Change the `health` value for all three to 150 — changes will apply instantly.
6. If you open "Abilities" of the "Mage" as a separate element, you can add a unique block "Spells" to him without affecting others.

::: tip
Collections are not simple folders. They require specifying a base type/template. If you need simple grouping without typing, use a regular folder.
:::

Inside a collection, you can create folders; they will also be bound to the collection type.

## Organization Recommendations

To keep the project understandable and easy to maintain, follow these recommendations:

| Problem | Solution |
|---------|----------|
| **Heterogeneous elements** (drafts, archives, reference materials) | Use **folders**. |
| **Homogeneous sets of elements of one type** (list of enemies, inventory, set of quests) | Use **collections** — this simplifies bulk editing and integrity control. |
| **Too deep nesting** | Do not create more than 3–5 levels of folder nesting, otherwise navigation will become inconvenient. |
| **Unclear names** | Give folders and collections meaningful names that reflect their contents. Avoid names like «New Folder». |
| **Need additional grouping within a type** | You can create folders inside collections — this allows grouping elements while maintaining type binding. For example, collection "Enemies" → folder "Bosses" → folder "Mob Bosses". |
| **Project cluttered with unused elements** | Delete or archive old elements so that the project does not grow and slow down work. |

**Example of a combined structure:**

```
Project «Dark Fantasy»
├─ Collection «Characters» (type: Base Character)
│ ├─ Heroes
│ │ ├─ Warrior
│ │ └─ Mage
│ └─ Enemies
│   ├─ Goblin
│   └─ Orc
├─ Collection «Quests» (type: Quest Template)
│ ├─ Main Quest
│ └─ Side Quests
└─ Folder «Archive» (for old versions)
  └─ Outdated Characters
```

Such organization allows you to quickly find the necessary elements, efficiently edit groups of objects, and maintain order in a project of any scale.