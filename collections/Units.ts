import { CollectionConfig } from 'payload'

export const Units: CollectionConfig = {
  slug: 'units',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'building', 'unit', 'area', 'price', 'status'],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'building',
      type: 'text',
      required: true,
    },
    {
      name: 'unit',
      type: 'text',
      required: true,
    },
    {
      name: 'floor',
      type: 'number',
    },
    {
      name: 'area',
      type: 'number',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'pricePerM2',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Wolne',
          value: 'wolny',
        },
        {
          label: 'Zarezerwowane',
          value: 'zarezerwowany',
        },
        {
          label: 'Sprzedane',
          value: 'sprzedany',
        },
      ],
      defaultValue: 'wolny',
      required: true,
    },
    {
      name: 'extras',
      type: 'array',
      fields: [
        {
          name: 'extra',
          type: 'text',
        },
      ],
    },
    {
      name: 'planUrl',
      type: 'text',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
