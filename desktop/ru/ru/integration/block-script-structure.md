---
outline: deep
---

# Хранение сценариев (диалогов)

Сценарии (диалоги, визуальные скрипты) хранятся в виде **графа** внутри блока типа `script`. Этот граф состоит из узлов (`nodes`), соединённых переходами (`next`), и может содержать переменные и настройки речи. Данные сценария полностью представлены в JSON и могут быть интерпретированы игровым движком напрямую.

## Общая структура графа сценария

Граф описывается интерфейсом `ImscScriptGraph`:

```typescript
type ImscScriptGraph = {
  start: string | null;                     // ID стартового узла
  variables?: ImscScriptGraphVariables;     // переменные сценария
  __settings?: ImscScriptGraphSettings;     // настройки речи
  nodes: { [id: string]: ImscScriptGraphNode }; // словарь узлов
}
```

* `start` – идентификатор узла, с которого начинается выполнение.

* `variables` – локальные переменные сценария ([см. раздел Переменные сценария](#переменные-сценария)).

* `__settings` – настройки полей для реплик и опций ([см. раздел Настройки речи специфичные для диалогов](#настройки-речи-специфичные-для-диалогов)).

* `nodes` – коллекция всех узлов, каждый узел имеет уникальный строковый ID (UUID).

## Типы узлов

|                                                      Тип узла                                                     |                    Назначение                   |                                            Поля                                            |
|:-----------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------:|:------------------------------------------------------------------------------------------:|
| start                                                                                                             | Точка входа в сценарий                          | `next: string \| null`                                                                       |
| speech                                                                                                            | Реплика персонажа или текст с вариантами выбора | `next, subject: string, values?: ImscScriptGraphVals, options?: ImscScriptGraphNodeOption[]` |
| trigger                                                                                                           | Вызов внешней функции движка (игровая логика)   | `next, subject: string, params?: { in?, out? }, values?`                                     |
| branch                                                                                                            | Условное ветвление (две ветки)                  | `values: { condition: ImscScriptGraphVal }, options: [option, option]`                       |
| getVar                                                                                                            | Чтение значения переменной                      | `values: { variable: string }`                                                               |
| setVar                                                                                                            | Установка значения переменной                   | `next, values: { variable: string, value: ImscScriptGraphVal }`                              |
| constAsset, constText, constString, constInteger, constFloat, constBoolean                                             | Константа (значение)                            | `values: { value: ... }`                                                                     |
| opAnd, opOr, opMod, opDiv, opMult, opMinus, opPlus, opMoreEqual, opMore, opLessEqual, opLess, opNotEqual, opEqual | Бинарные операции                               | `values: { arg1, arg2 }`                                                                     |
| opNot                                                                                                             | Унарное отрицание                               | `values: { arg1 }`                                                                           |
| end                                                                                                               | Завершение сценария                             | (без полей)                                                                                |

Все узлы наследуют базовые поля: `index` (порядок отрисовки), `pos: { x, y }` (координаты в редакторе), а также могут иметь `next` (ID следующего узла).

## Значения и привязки

Поля `values` узлов могут содержать:

* **Прямые значения** – примитивы, объекты, массивы ([см. раздел Типы значений свойств (листовые типы)](block-structure.md#типы-значений-свойств-листовые-типы)).

* **Привязки** (`ImscScriptGraphValBind`) – ссылки на результат другого узла:
  `{ get: "uuid_узла", param: "имя_выходного_параметра" }`

Пример из реального сценария (узел `condition` ветвления ссылается на результат узла `1c9c41e4...`):

```json
"values": {
  "condition": {
    "get": "1c9c41e4-a219-441e-a716-753bfbd77486",
    "param": "result"
  }
}
```

## Переменные сценария

Переменные описываются в поле `variables.own`:

```typescript
type ImscScriptGraphVarDef = {
  name: string;           // служебное имя переменной
  type: { Type: string }; // тип (integer, boolean, text и т.д.)
  title: string;          // отображаемое имя
  default?: any;          // значение по умолчанию
  description?: string | null;
  index: number;          // порядок
  autoFill?: boolean | null;
}
```

Пример:

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

## Настройки речи (специфичные для диалогов)

Поле `__settings.speech` определяет, какие поля могут быть добавлены к репликам (`main`) и опциям (`option`), а также их типы. Это позволяет расширять диалоги дополнительными параметрами (например, `tools`, `supplies`).

Пример из JSON:

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

Тогда в узле `speech` можно указывать `values.text` (основной текст), `values.additional` (дополнительный текст), а в опциях – `values.tools` (число инструментов, необходимое для выбора).

## Пример фрагмента реального сценария

Ниже показан узел `speech` с вариантами выбора (взят из примера события «Полусгнивший мост»):

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

* Узел не имеет перехода `next` (показывает меню опций).

* Каждая опция содержит текст (`text`) и, возможно, условие видимости (`condition`) или дополнительную стоимость (`tools`).

* При выборе опции выполнение переходит в узел, указанный в `next` этой опции.

## Исполнение сценария на движке

Для интерпретации графа и выполнения диалогов в веб-движках (Phaser, Pixi.js, Cocos и др.) разработана **JavaScript-библиотека** [`imsc-script-js`](https://github.com/ImStocker/imsc-script-js/). Она позволяет:

* Загружать JSON-описание сценария.

* Проходить по узлам, обрабатывать реплики, ветвления, вызовы триггеров.

* Управлять переменными.

* Интегрироваться с рендерингом и UI движка.

В планах – создание аналогичных модулей для других сред (Unity, Unreal, Godot). Однако, поскольку формат является **открытым JSON**, любой движок может реализовать собственный интерпретатор, следуя описанным типам.

## Расположение в файле элемента

Граф сценария хранится в **блоке типа `script`** внутри массива `blocks`. Пример из полного JSON:

```json
{
  "blocks": [
    ... // другие блоки (props, text и т.д.)
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

Если блоку `script` присвоено служебное имя (например, `"name": "dialog"`), его данные также будут доступны в `values.dialog` для быстрого доступа.