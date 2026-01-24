import React from 'react'
import { MessageCircle } from 'lucide-react'

type FooterProps = {
  whatsappNumber?: string | null
  cnpj?: string | null
}

export const Footer = ({ whatsappNumber, cnpj }: FooterProps) => (
  <footer className="px-6 md:px-12 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-[10px] uppercase tracking-widest">
    <div className="flex flex-col md:flex-row items-center gap-4">
      <span>© 2026 ExpoNext Studio {cnpj && `— CNPJ: ${cnpj}`}</span>
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground"
        >
          <MessageCircle size={12} /> WhatsApp
        </a>
      )}
    </div>
    <div className="flex gap-8">
      <span className="cursor-pointer hover:text-foreground underline underline-offset-4">
        Jurídico
      </span>
      <span className="cursor-pointer hover:text-foreground underline underline-offset-4">
        Privacidade
      </span>
      <span className="cursor-pointer hover:text-foreground underline underline-offset-4">
        Status do Sistema
      </span>
    </div>
  </footer>
)
