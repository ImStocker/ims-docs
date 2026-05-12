---
outline: deep
---
# Game Objects and Templates

The system has a special element type — **game objects**. These are ready-made, pre-configured entities that include an illustrative image, description, and a set of properties characteristic of game units (characters, items, enemies, etc.).

However, the "template → instance" mechanic works **for any element**, regardless of its type (text document, table, checklist, diagram, script, etc.). Game objects are just a specific, but illustrative example.

## Base Object Template

The base object (template) defines the **structure** and **standard values** of properties for all objects of a certain type.

**How to create a base game object template:**
1. In the project tree, select the command to create a new element.
2. As the type, specify «Game Object».

<img src="../images/create_game_object_en.png" alt="creating a game object" width="480">

3. Give the template a name, for example «Base Character».
4. Configure the template structure: add the necessary blocks (properties table with health, strength, mana parameters; gallery with portrait; text description, etc.).
5. Fill in the standard property values (for example, `health = 100`, `strength = 10`).

After this, the template can be used to create specific objects (instances).


## Creating an Object Instance

An instance (a specific character or item) is created **based on an existing element**. It automatically inherits the entire structure and standard values from the parent element, which automatically begins to play the role of a template.

**How to create an instance:**
1. Right-click on any element (template) in the project tree.
2. Select the command **«Create instance»**.
3. Specify the instance name (for example, «Orc Warrior»).
4. If necessary, change the **initial property values** so that they differ from the template ones (for example, increase health or replace the image).

All instances are displayed in the project tree and can be edited as regular elements. The original element **does not require any special switch to «template» mode**. It remains a regular element, but now at least one instance has been created from it.

## Any Element as a Template (Universal Mechanism)

The system allows you to create an instance **from any existing element**, regardless of its type. You do not need to preliminarily "assign" an element as a template – just call the «Create instance» command.

**Examples of using the universal mechanism:**

- **Typical document template** – create a document "Specification Structure" with typical blocks. Create an instance from it "Specification for Module A" and change the text. Later update the original template — changes will be pulled into all instances where there were no manual edits.
- **Checklist template** – make a standard list "Before Release". Create instances from it for each version.
- **Dialog script template** – write the logic of a typical dialog, create instances from it with different replicas.
- **Location template** – define the base shape of a level and create level instances based on it.

::: tip 
When creating an instance, the original element remains a regular element, but now it performs the function of a template. You can continue to edit it, and all changes (except overridden fields) will be automatically passed to instances. If you delete the template, instances are not deleted, but lose connection with it (become independent).
:::

Instances can be created not only from direct templates, but also from other instances, forming an inheritance hierarchy. This allows building deep chains of overrides.