import { Block } from 'payload'

export const ProjectsBlock: Block = {
  slug: 'projects-block',
  labels: {
    singular: 'Projects Section',
    plural: 'Projects Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'NOSSOS PROJETOS',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'SOLUÇÕES REAIS PARA PROBLEMAS COMPLEXOS',
    },
    // This block mainly serves as a placeholder to render the dynamic projects list
  ],
}
