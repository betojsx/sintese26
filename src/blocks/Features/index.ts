import { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Grid',
    plural: 'Features Grids',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
