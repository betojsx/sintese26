import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'cta1',
      type: 'group',
      label: 'Primary CTA (White Button)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'QUERO MEU APP',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '#contact',
        },
      ],
    },
    {
      name: 'cta2',
      type: 'group',
      label: 'Secondary CTA (Outline Button)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'NOSSA METODOLOGIA',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '#process',
        },
      ],
    },
  ],
}
