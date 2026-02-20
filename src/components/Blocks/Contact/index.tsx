'use client'

import React, { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { Page } from '@/payload-types'
import { InteractiveKeyboard } from '@/components/InteractiveKeyboard'

type ContactBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'contact' }>

export const ContactBlock: React.FC<ContactBlockProps> = ({
  title,
  description,
  email,
  whatsappNumber,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Proposta via site')
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmpresa: ${formData.company}\nEmail: ${formData.email}\n\n${formData.message}`,
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="bg-[#050505] border-t border-white/10 pt-24 pb-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-4 block">
                Contato
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {title || 'Vamos construir algo incrível.'}
              </h2>
              <p className="text-white/60 text-lg max-w-md">
                {description ||
                  'Estamos prontos para transformar sua visão em realidade digital. Digite sua mensagem ou use os canais diretos.'}
              </p>
            </div>

            <div className="hidden lg:block">
              <InteractiveKeyboard />
              <p className="text-center text-white/20 text-xs font-mono mt-4">
                Pressione qualquer tecla para testar a resposta do sistema.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-mono">{email}</span>
                </a>
              )}

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-lg font-mono">WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/60 uppercase tracking-wider">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/60 uppercase tracking-wider">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>ENVIAR PROPOSTA</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
