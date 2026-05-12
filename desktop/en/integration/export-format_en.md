---
outline: deep
---
# Export to Custom Format

The system allows exporting elements in various formats for further use in game engines. Additionally, you can set up **automatic export** – project changes will be automatically exported to a specified folder.

## Setting Up a Custom Export Format

If standard formats are insufficient (for example, you need a CSV file for Excel or a custom JSON with a limited set of fields), you can create a **custom export format**.

### Creating a New Format

1. In the export menu, select **Custom Format**.

2. Click **«Create new format»**.

3. Enter the **format name** (for example, «Character export for CSV»).

4. Specify which **element type** (or specific template) this format applies to. For example, you can select the base type «Game Object» or a specific template «Character». The format will only be available for elements of this type.

### Selecting the Output Format Type (CSV or JSON)

**For CSV:**

* Select the **fields** you want to export (from the structure of the selected element type). For example, for a character: `health`, `attack`, `name`. Fields can be either flat or nested (for example, `stats.health`).

* Specify the **delimiter**: comma (`,`) or semicolon (`;`). A semicolon is recommended if values may contain commas.

* Check **«Add headers»** – the first line of the CSV will contain field names.

* **(Optional) Post-processing** – JS code for transforming data before writing ([see Post-processing Data with JavaScript section](#post-processing-data-with-javascript)).

**For JSON:**

* Select one of the modes:

  * **«Full»** – export the entire internal element structure (including service fields `id`, `createdAt`, etc.).

  * **«Values only»** – export only the contents of `values` ([see `values` Fields and Block Internal Names section](asset-structure_en.md#values-fields-and-block-internal-names)). This is the cleanest option for the engine.

  * **«Selected fields»** – export only specific fields (similar to CSV, but in JSON format).

* **Group into a single file:**

  * If the checkbox is **enabled** – when exporting an entire folder or multiple elements, they will all be saved into a **single** JSON file (array of objects).

  * If the checkbox is **disabled** – each element is saved to a **separate** JSON file (file name = internal name or `id`).

* **(Optional) Post-processing** – JS code for modifying data before saving.

### Saving the Format

After configuration, click **«Save»**. The new format will appear in the export menu for the selected element type.

## Post-processing Data with JavaScript

For flexible customization, you can add a **post-processor** – a small piece of JS code that runs before the file is written. The code must accept the element data object (in the format corresponding to the selected mode) and return the transformed object (or a primitive if it is a CSV string).

**Example for CSV (field transformation):**


```javascript
function process(data) {
  // data – flat element object (fields selected for CSV)
  return {
    name: data.title,
    hp: data.health * 2,      // double the health
    attack: data.attack
  };
}
```

**Example for JSON (removing service fields):**


```javascript
function process(data) {
  // data – full element object (if «Full» mode is selected)
  return {
    id: data.id,
    title: data.title,
    stats: data.values.stats
  };
}
```

**Limitations:**

* The code runs in a safe isolated environment (sandbox).

* Only standard JavaScript features are available (ES2020).

* External API calls, file system operations, and network requests are prohibited.

* The code must be synchronous and return a value.

## Export Using a Custom Format

1. Select one or more elements (or an entire folder) in the project tree.

2. Right-click → **«Export»** → select your saved format.

3. In the dialog, specify the **destination folder**.

4. Click **«Export»**.

The system will create file(s) in the specified format in the selected folder. When exporting a folder with grouping enabled, a single file will be created containing an array of all elements.

## Automatic Export

To avoid exporting manually every time after changes, you can set up **automatic export**:

1. Click the **Configure auto-export** button in the menu.

2. In the opened form, create one or more export configurations.

3. Click the "Export" button and select a folder.

4. Enable the "Export automatically" checkbox.

After this, **any element change** (or changes to elements inside a folder) will be **automatically** written to the same files in the specified folder. Export occurs in the background immediately after saving changes to the project.

**Usage example:**

* You configured a CSV format for exporting all characters.

* Enabled automatic synchronization to the `D:\GameProject\Characters` folder.

* Your game engine monitors changes in this folder (for example, via `FileSystemWatcher` in C# or a reload timer in C\+\+).

* Every time a character's health is changed in the editor, the CSV file is updated – and the game immediately uses the new value without restarting.

::: tip
Automatic synchronization is ideal for iterative development – you edit data in a convenient editor, and the engine instantly receives updates without any additional actions.
:::

## Engine Integration Recommendations

* **For CSV** – convenient for exporting tabular data (item lists, character parameters). The engine can load CSV as simple tables. Use post-processing for type casting.

* **For JSON** – recommended for complex hierarchical data. Use the **«Values only»** or **«Selected fields»** mode to avoid cluttering the engine with service IDs and dates.

* **Automatic export** – set it to a folder monitored by the engine. This allows reloading data on the fly.

* **Post-processing** – helps adapt data to a specific engine API: rename fields, merge values, calculate derived parameters, filter unnecessary elements.

* **Performance** – avoid exporting huge collections into a single file if the engine re-reads it entirely. In such cases, use the «separate files» mode or split data across multiple formats.
