import React from 'react'

export const Footer = () => (
  <footer className="px-6 md:px-12 py-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] uppercase tracking-widest">
    <span>© 2026 ExpoNext Studio — CNPJ: 00.000.000/0001-00</span>
    <div className="flex gap-8">
      <span className="cursor-pointer hover:text-zinc-400 underline underline-offset-4">
        Jurídico
      </span>
      <span className="cursor-pointer hover:text-zinc-400 underline underline-offset-4">
        Privacidade
      </span>
      <span className="cursor-pointer hover:text-zinc-400 underline underline-offset-4">
        Status do Sistema
      </span>
    </div>
  </footer>
)
