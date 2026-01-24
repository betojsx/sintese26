'use client'

import React, { useEffect, useRef } from 'react'

export const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/hero-video-desktop.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
