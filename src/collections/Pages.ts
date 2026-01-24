import { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { Stack } from '../blocks/Stack'
import { Process } from '../blocks/Process'
import { Contact } from '../blocks/Contact'
import { ProjectsBlock } from '../blocks/Projects'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        Features,
        Stack,
        ProjectsBlock,
        Process,
        Contact,
      ],
    },
  ],
  timestamps: true,
}
