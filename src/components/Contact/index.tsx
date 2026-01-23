'use client'

import React from 'react'
import { Github, Twitter } from 'lucide-react'

export const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 bg-[#fdfcf0] text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">
          Let's <span className="italic underline decoration-4">Connect.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xl font-bold mb-8">
              Ready to unify your digital presence? Send us a transmission.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:hello@exponext.studio"
                className="block text-2xl font-bold hover:underline"
              >
                hello@exponext.studio
              </a>
              <div className="flex gap-6 pt-4">
                <Twitter className="hover:scale-110 transition-transform cursor-pointer" />
                <Github className="hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="YOUR NAME"
              className="w-full bg-transparent border-b-2 border-black p-3 outline-none focus:placeholder-zinc-400 placeholder-zinc-800 font-bold text-sm uppercase"
            />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b-2 border-black p-3 outline-none focus:placeholder-zinc-400 placeholder-zinc-800 font-bold text-sm uppercase"
            />
            <textarea
              placeholder="PROJECT INTEL"
              rows={4}
              className="w-full bg-transparent border-b-2 border-black p-3 outline-none focus:placeholder-zinc-400 placeholder-zinc-800 font-bold text-sm uppercase"
            />
            <button className="w-full bg-black text-[#fdfcf0] p-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">
              Initialize Contact
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
