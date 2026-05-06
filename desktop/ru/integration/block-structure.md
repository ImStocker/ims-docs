---
outline: deep
---

# Структура отдельного блока

Каждый элемент массива `blocks` имеет следующую структуру:


```json
{
  "id": "d452c1c0-0a38-483d-91c3-41b376e14c74", // уникальный ID блока
  "name": "",                                    // служебное имя блока (если есть)
  "title": "Description",                        // отображаемый заголовок
  "own": false,                                  // относится ли блок к данному элементу (false – унаследован от шаблона)
  "type": "text",                                // тип блока (text, grid, properties, gallery, script, level и др.)
  
  "props": { ... },      // собственные значения блока (переопределённые в текущем элементе)
  "inherited": { ... },  // унаследованные от шаблона значения
  "computed": { ... },   // результирующие значения (объединение inherited и props, а в будущем – вычисленные формулы)
  
  "index": 3.42,                // порядок отображения
  "createdAt": "2024-02-17T10:05:04.952Z",
  "updatedAt": "2024-05-24T16:43:35.181Z"
}
```

**Для движка рекомендуется использовать поле `computed`**, так как оно уже содержит итоговые значения с учётом наследования и (в перспективе) формул. Если `computed` отсутствует или требуется переопределённое значение, можно обратиться к `props`, а если его нет – к `inherited`.

## Типы значений свойств (листовые типы)

Все значения свойств внутри `props`, `inherited` и `computed` строго типизированы. Поддерживаются следующие типы (перечисление `AssetPropType`):

### Форматированный текст (`AssetPropValueText`)


```typescript
type AssetPropValueText = {
  Str: string;        // неформатированное текстовое представление
  Ops: {              // массив операций форматирования (Delta-формат)
    insert?: any;       // вставляемый текст или объект (изображение и т.п.)
    attributes?: any;   // атрибуты (жирный, курсив, ссылка, цвет и др.)
  }[];
};
```

### Прикреплённый файл (`AssetPropValueFile`)

```typescript
type AssetPropValueFile = {
  FileId: string;   // UUID файла в хранилище
  Title: string;    // имя файла
  Size: number;     // размер в байтах
  Dir: string | null; // относительный путь к папке внутри хранилища
  Store: string;    // хранилище (например, "local" или "cloud")
};
```

### Произвольные данные (`AssetPropValueBlob`)

```typescript
type AssetPropValueBlob = {
  Blob: any;       // содержимое (обычно закодировано в base64)
  Type: string;    // MIME-тип или пользовательский тип
  Key?: string;    // опциональный ключ для сравнения
};
```

### Ссылка на элемент (`AssetPropValueAsset`)

```typescript
type AssetPropValueAsset = {
  AssetId: string;      // UUID целевого элемента
  Title: string;        // отображаемое имя
  Name: string | null;  // служебное имя (если есть)
  Pid?: string;         // ID проекта (для внешнего элемента)
  BlockId?: string | null; // ID конкретного блока внутри элемента
  Anchor?: string | null;   // якорь (например, "#заголовок")
};
```

### Ссылка на участника (`AssetPropValueAccount`)

```typescript
type AssetPropValueAccount = {
  AccountId: string;    // ID пользователя
  Name: string;         // имя пользователя в проекте
};
```

### Значение перечисления (`AssetPropValueEnum`)

```typescript
type AssetPropValueEnum = {
  Enum: string;      // UUID перечисления (списка допустимых значений)
  Name: string;      // служебное имя выбранного значения
  Title: string;     // отображаемое имя выбранного значения
};
```

### Ссылка на проект (`AssetPropValueProject`)

```typescript
type AssetPropValueProject = {
  ProjectId: string;    // ID проекта
  Title: string;        // название проекта
};
```

### Дата/время (`AssetPropValueTimestamp`)

```typescript
type AssetPropValueTimestamp = {
  Str: string;    // текстовое представление в формате ISO 8601 (например, "2024-05-24T16:43:35.181Z")
  Ts: number;     // количество секунд с начала эпохи Unix (unix epoch time)
};
```

### Ссылка на папку (`AssetPropValueWorkspace`)

```typescript
type AssetPropValueWorkspace = {
  WorkspaceId: string;    // UUID папки
  Title: string;          // отображаемое имя
  Name: string | null;    // служебное имя
  Pid?: string;           // ID проекта, если папка находится во внешнем проекте
};
```

### Выборка элементов (`AssetPropValueSelection`)

```typescript
type AssetPropValueSelection = {
  Str: string;                    // строковое представление выборки (например, "type=Enemy, health>50")
  Select: any;                    // поля для выборки
  Group: any;                     // поля группировки
  Where: AssetPropWhere;          // условия фильтрации
  Order?: { Field: string; Asc: boolean }[]; // порядок сортировки
  Offset?: number;                // смещение (пагинация)
  Count?: number;                 // количество запрашиваемых элементов
};
```

### Описание типа (`AssetPropValueType`)

```typescript
type AssetPropValueType = {
  Type: AssetPropType;        // базовый тип (из перечисления выше)
  Kind?: string;              // уточнение (например, UUID перечисления для типа `enum`)
  Of?: AssetPropValueType;    // тип элемента для массивов (аргумент типа)
};
```

### Пример чтения движком

Допустим, в проекте создан игровой объект «Warrior» со следующими данными:

* Заголовок: `Warrior`

* Блок «characteristics» (служебное имя `stats`) содержит свойства: `health = 100`, `attack = 10`.

* Блок «inventory» (служебное имя `inv`) – таблица значений со списком предметов.

JSON-файл элемента будет включать:

```json
{
  "id": "5db2ddf6-580b-4eb8-bd5b-9f6989d7b3ee",
  "title": "Warrior",
  "name": "",
  "values": {
    "stats": {
      "health": 100,
      "attack": 10
    },
    "inv": [ ... ]   // данные таблицы значений
  },
  "blocks": [ ... ]
}
```

Движок может загрузить этот JSON и использовать:

```csharp
// Псевдокод на C#
var warriorJson = LoadJson("Warrior.json");
int health = warriorJson["values"]["stats"]["health"]; // 100
int attack = warriorJson["values"]["stats"]["attack"]; // 10
var inventory = warriorJson["values"]["inv"];          // массив предметов
```

Благодаря тому, что данные представлены в открытом JSON-формате, движки на любом языке программирования (C\+\+, C#, Python, JavaScript, Lua) легко интегрируются с системой.
