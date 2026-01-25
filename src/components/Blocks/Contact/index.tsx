import React from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Page } from '@/payload-types'
import { Keyboard3D } from '@/components/Keyboard3D'

type ContactBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'contact' }>

export const ContactBlock: React.FC<ContactBlockProps> = ({ title, description, email, whatsappNumber }) => {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
            {title}
          </h2>
          <p className="text-xl md:text-2xl font-mono text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col gap-4">
            <Link
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 text-lg font-bold hover:translate-x-2 transition-transform uppercase tracking-widest border-b-2 border-primary-foreground pb-1 self-start"
            >
              {email} <ArrowRight size={20} />
            </Link>

            {whatsappNumber && (
               <Link
               href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 text-lg font-bold hover:translate-x-2 transition-transform uppercase tracking-widest border-b-2 border-primary-foreground pb-1 self-start mt-4"
             >
               WhatsApp <MessageCircle size={20} />
             </Link>
            )}
          </div>

          <div className="mt-20 pt-12 border-t border-border grid grid-cols-2 gap-8 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
            <div>
              <div className="mb-2 text-primary-foreground">Status</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for new projects
              </div>
            </div>
            <div>
              <div className="mb-2 text-primary-foreground">Timezone</div>
              <div>São Paulo, Brazil (GMT-3)</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end w-full">
          <Keyboard3D />
        </div>
      </div>
    </section>
  )
}
