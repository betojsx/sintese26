import { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  labels: {
    singular: 'Process Section',
    plural: 'Process Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'NOSSO PROCESSO',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Step Number (e.g., 01)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
