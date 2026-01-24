import { Block } from 'payload'

export const Stack: Block = {
  slug: 'stack',
  labels: {
    singular: 'Tech Stack Section',
    plural: 'Tech Stack Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'TECNOLOGIA DE GIGANTE PARA O SEU NEGÓCIO',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'NÃO FAZEMOS APENAS "SITES". CONSTRUÍMOS FERRAMENTAS DE VENDA E ENGAJAMENTO.',
    },
    {
      name: 'showMarquee',
      type: 'checkbox',
      label: 'Show Tech Stack Marquee',
      defaultValue: true,
    },
  ],
}
