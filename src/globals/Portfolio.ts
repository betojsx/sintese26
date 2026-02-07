import { GlobalConfig } from 'payload'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  label: {
    en: 'Portfolio',
    pt: 'Portfólio',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navigation',
      type: 'group',
      label: {
        en: 'Navigation',
        pt: 'Navegação',
      },
      fields: [
        {
          name: 'projectsLabel',
          type: 'text',
          label: {
            en: 'Projects Label',
            pt: 'Rótulo de Projetos',
          },
          defaultValue: 'Projects',
          localized: true,
        },
        {
          name: 'experienceLabel',
          type: 'text',
          label: {
            en: 'Experience Label',
            pt: 'Rótulo de Experiência',
          },
          defaultValue: 'Experience',
          localized: true,
        },
        {
          name: 'contactLabel',
          type: 'text',
          label: {
            en: 'Contact Label',
            pt: 'Rótulo de Contato',
          },
          defaultValue: 'Contact',
          localized: true,
        },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          label: {
            en: 'Badge Text',
            pt: 'Texto do Badge',
          },
          defaultValue: 'Senior Frontend Developer',
          localized: true,
        },
        {
          name: 'firstName',
          type: 'text',
          label: {
            en: 'First Name',
            pt: 'Primeiro Nome',
          },
          defaultValue: 'Roberto',
          localized: true,
        },
        {
          name: 'lastName',
          type: 'text',
          label: {
            en: 'Last Name',
            pt: 'Sobrenome',
          },
          defaultValue: 'Silva',
          localized: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: {
            en: 'Bio',
            pt: 'Biografia',
          },
          defaultValue:
            'Building digital bridges since 2018. With over 8 years of experience, I specialize in creating fluid, high-performance applications across the entire frontend spectrum. From hybrid solutions with Ionic to native experiences using React Native, I craft pixel-perfect interfaces that scale. My mission is to translate complex requirements into seamless reliable user experiences.',
          localized: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: {
            en: 'CTA Label',
            pt: 'Rótulo do CTA',
          },
          defaultValue: 'Contact Me',
          localized: true,
        },
        {
          name: 'profileImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Profile Image',
            pt: 'Imagem de Perfil',
          },
        },
        {
          name: 'socialLinks',
          type: 'group',
          label: {
            en: 'Social Links',
            pt: 'Links Sociais',
          },
          fields: [
            {
              name: 'github',
              type: 'text',
              label: 'GitHub URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'email',
              type: 'text',
              label: {
                en: 'Email',
                pt: 'E-mail',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'group',
      label: {
        en: 'Projects Section',
        pt: 'Seção de Projetos',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Title',
            pt: 'Título',
          },
          defaultValue: 'Selected Works',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: {
            en: 'Subtitle',
            pt: 'Subtítulo',
          },
          defaultValue: 'A Showcase of Technical Excellence • 2024-2026',
          localized: true,
        },
        {
          name: 'viewAllLabel',
          type: 'text',
          label: {
            en: 'View All Button Label',
            pt: 'Rótulo do Botão Ver Todos',
          },
          defaultValue: 'View all projects',
          localized: true,
        },
        {
          name: 'sectionNumber',
          type: 'text',
          label: {
            en: 'Section Number',
            pt: 'Número da Seção',
          },
          defaultValue: '02',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: {
        en: 'Footer Section',
        pt: 'Seção do Rodapé',
      },
      fields: [
        {
          name: 'titleLine1',
          type: 'text',
          label: {
            en: 'Title Line 1',
            pt: 'Título Linha 1',
          },
          defaultValue: "Let's Work",
          localized: true,
        },
        {
          name: 'titleLine2',
          type: 'text',
          label: {
            en: 'Title Line 2',
            pt: 'Título Linha 2',
          },
          defaultValue: 'Together',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: {
            en: 'Description',
            pt: 'Descrição',
          },
          defaultValue:
            "Have a project in mind? Let's turn your vision into reality. Open for new opportunities and collaborations.",
          localized: true,
        },
        {
          name: 'contactEmail',
          type: 'text',
          label: {
            en: 'Contact Email',
            pt: 'E-mail de Contato',
          },
          defaultValue: 'contact@robertosilva.dev',
        },
        {
          name: 'socialLinks',
          type: 'group',
          label: {
            en: 'Social Links',
            pt: 'Links Sociais',
          },
          fields: [
            {
              name: 'github',
              type: 'text',
              label: 'GitHub URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'Twitter URL',
            },
            {
              name: 'email',
              type: 'text',
              label: {
                en: 'Email',
                pt: 'E-mail',
              },
            },
          ],
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: {
            en: 'Copyright Text',
            pt: 'Texto de Copyright',
          },
          defaultValue: '© 2026 Roberto Silva. All rights reserved.',
          localized: true,
        },
      ],
    },
  ],
}
