import React from 'react'
import { Media } from '@/payload-types'

type Props = {
  video: Media | string
  settings?: {
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    controls?: boolean
  }
}

export const VideoBlock = ({ video, settings }: Props) => {
  // If video is just an ID (string), we can't render the URL directly unless we fetch it.
  // Assuming Payload populates it. If not, we might need to handle it or ensure depth.
  const videoUrl = typeof video === 'object' ? video?.url : null

  if (!videoUrl) {
    return null
  }

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-zinc-800 bg-black shadow-xl">
      <video
        className="w-full h-auto"
        src={videoUrl}
        autoPlay={settings?.autoplay ?? true}
        muted={settings?.muted ?? true}
        loop={settings?.loop ?? true}
        controls={settings?.controls ?? false}
        playsInline
      />
    </div>
  )
}
