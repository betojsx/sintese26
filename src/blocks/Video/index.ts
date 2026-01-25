import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
       name: 'settings',
       type: 'group',
       fields: [
          {
             name: 'autoplay',
             type: 'checkbox',
             defaultValue: true,
             label: 'Autoplay',
          },
          {
             name: 'muted',
             type: 'checkbox',
             defaultValue: true,
             label: 'Muted',
          },
          {
             name: 'loop',
             type: 'checkbox',
             defaultValue: true,
             label: 'Loop',
          },
          {
            name: 'controls',
            type: 'checkbox',
            defaultValue: false,
            label: 'Show Controls',
          }
       ]
    }
  ],
}
