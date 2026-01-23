import Link from 'next/link'
import React from 'react'

export const Nav = () => (
  <nav className="flex items-center justify-between py-8 px-6 md:px-12 border-b border-zinc-800 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
    <div className="flex items-center gap-2">
      <Link href="/" className="text-[#fdfcf0] font-bold tracking-tighter uppercase text-lg">
        sintese software
      </Link>
    </div>

    <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
      <Link href="/#work" className="hover:text-[#fdfcf0] transition-colors">
        Projetos
      </Link>
      <Link href="/#stack" className="hover:text-[#fdfcf0] transition-colors">
        Tecnologia
      </Link>
      <Link href="/#process" className="hover:text-[#fdfcf0] transition-colors">
        Processo
      </Link>
      <Link href="/#contact" className="hover:text-[#fdfcf0] transition-colors">
        Contato
      </Link>
    </div>

    <button className="bg-[#fdfcf0] text-black px-4 py-2 text-xs font-bold uppercase tracking-tighter hover:bg-zinc-300 transition-colors">
      Iniciar Projeto
    </button>
  </nav>
)
