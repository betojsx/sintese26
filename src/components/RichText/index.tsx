'use client'
import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { CodeBlock } from '@/components/CodeBlock'
import { VideoBlock } from '@/components/VideoBlock'

type Props = {
  data: SerializedEditorState
}

export const RichText: React.FC<Props> = ({ data }) => {
  return (
    <PayloadRichText
      data={data}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        blocks: {
          ...defaultConverters.blocks,
          code: ({ node }) => <CodeBlock node={node} />,
          Code: ({ node }) => <CodeBlock node={node} />,
          video: ({ node }) => <VideoBlock video={node.fields.video} settings={node.fields.settings} />,
        },
      })}
    />
  )
}
