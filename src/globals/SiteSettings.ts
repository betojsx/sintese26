import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'general',
      type: 'group',
      label: 'General',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Site Title',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
        },
        {
          name: 'cnpj',
          type: 'text',
          label: 'CNPJ',
        },
      ],
    },
  ],
}
