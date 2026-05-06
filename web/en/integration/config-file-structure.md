# Configuration file structure

```json
{
  "id": "5db2ddf6-580b-4eb8-bd5b-9f6989d7b3ee", // Element ID
  "projectId": "FPX6pFkX", // Project ID
  "title": "Warrior", // Title
  "ownTitle": "Warrior", // Also title... but use the one above 🤪
  "name": "", // Service name
  "creatorUserId": 28, // Who created
  "isAbstract": false, // Is abstract or not

  "parentIds": [...], // First level of parents (base element/template ID)
  "typeIds": [...], // IDs of the entire parent chain
  "createdAt": "2024-02-15T03:42:27.297Z", // When created
  "updatedAt": "2024-05-24T16:43:35.181Z", // When updated
  "workspaceId": "aa0f0949-53b2-47ef-b7ca-2fb4cc1d36f5", // Folder ID
  "ownIcon": null, // Icon override
  "icon": "walk-fill", // Icon
  "index": 4, // Display order (real number)
  "values": { // Values ​​of blocks with service name
    "characteristics": { // Total values ​​of block with service name 'characteristics'
      "health": 100
      "attack": 10
    },
    ...
  },
  "blocks": [ // Array of blocks that make up the element
  {
    "id": "d452c1c0-0a38-483d-91c3-41b376e14c74", // Block ID
    "name": "", // Block service name
    "title": "Description", // Block title
    "own": false, // Whether the block is owned or inherited
    "type": "text", // Block type
    "props": { ... } // Block's own values
    "inherited": { ... }, // Block's own values
    "computed": { ... }, // Block's total values
    "index": 3.42, // Display order (real number)
    "createdAt": "2024-02-17T10:05:04.952Z", // When created
    "updatedAt": "2024-05-24T16:43:35.181Z", // When updated
    },
  ],
  "references": [ // References attached to the element
    {
    "sourceBlockId":"d452c1c0-0a38-483d-91c3-41b376e14c74", // ID of the block the element is attached to
    "targetAssetId":"7eecaf25-26c0-478b-a1cf-7445b776be72", // ID of the attached element
    "targetBlockId":null, // ID of the block that was attached
    "createdAt":"2024-09-27T06:52:04.733Z" // When the reference was created
    },
    ...
  ],
}
```