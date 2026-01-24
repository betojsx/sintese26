import React from 'react'
import { Page, Project } from '@/payload-types'
import { HeroBlock } from './Hero'
import { Features } from './Features'
import { StackBlock } from './Stack'
import { ProjectsBlock } from './Projects'
import { ProcessBlock } from './Process'
import { ContactBlock } from './Contact'

type Props = {
  layout: Page['layout']
  projects: Project[]
}

export const RenderBlocks: React.FC<Props> = ({ layout, projects }) => {
  if (!layout) return null

  return (
    <>
      {layout.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]
          if (Block) {
            // @ts-expect-error we are passing projects to all blocks, but only projects block uses it
            return <Block key={index} {...block} projects={projects} />
          }
        }
        return null
      })}
    </>
  )
}

const blockComponents = {
  hero: HeroBlock,
  features: Features,
  stack: StackBlock,
  'projects-block': ProjectsBlock,
  process: ProcessBlock,
  contact: ContactBlock,
}
