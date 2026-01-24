import { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: "LET'S CONNECT.",
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Ready to unify your digital presence? Send us a transmission.',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'hello@exponext.studio',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Number (for link)',
    },
  ],
}
