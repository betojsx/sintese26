'use client'
import React from 'react'

export const CodeBlock = ({ node }: { node: any }) => {
  const { code, language } = node.fields

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-zinc-800 bg-[#0a0a0a] shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-zinc-800">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language}</span>
        <button 
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider"
          onClick={() => {
            if (code) {
              navigator.clipboard.writeText(code)
            }
          }}
        >
          Copy
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-300 leading-relaxed tab-4">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
