import { GlobalConfig } from 'payload'
import bcrypt from 'bcryptjs'

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
    {
      name: 'projectProtection',
      type: 'group',
      label: 'Project Password Protection',
      fields: [
        {
          name: 'password',
          type: 'text',
          label: 'Protection Password',
          admin: {
            description: 'Set a password to protect projects. Leave empty to disable protection.',
          },
          hooks: {
            beforeChange: [
              async ({ value, originalDoc, operation }) => {
                // If no value provided, return null to clear password
                if (!value || value === '') {
                  return null
                }

                // If value is unchanged (already hashed), don't rehash
                if (operation === 'update' && originalDoc?.projectProtection?.password === value) {
                  return value
                }

                // Hash the new password
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(value, salt)
                return hashedPassword
              },
            ],
          },
        },
      ],
    },
  ],
}
