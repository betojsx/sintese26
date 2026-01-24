import React from 'react'
import { Page } from '@/payload-types'

type ProcessBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'process' }>

export const ProcessBlock: React.FC<ProcessBlockProps> = ({ title, steps }) => {
  return (
    <section id="process" className="px-6 md:px-12 py-24 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">
            {title || 'Nosso Processo'}
          </h2>
          <div className="space-y-12">
            {steps?.map((item, idx) => (
              <div key={item.id || idx} className="flex gap-6 group">
                <span className="text-muted-foreground font-bold border-r border-border pr-6 group-hover:text-foreground transition-colors">
                  {item.stepNumber || `0${idx + 1}`}
                </span>
                <div>
                  <h4 className="text-lg font-bold uppercase mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm max-w-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-muted-foreground text-[10px]">STATUS: PRODUÇÃO</div>
          <pre className="text-green-500 text-xs font-mono leading-relaxed text-left">
            {`> Publicando nova versão...
> Otimizando imagens... OK
> Verificando segurança... OK
> Deploy concluído com sucesso.
> Servidores ativos e monitorados.
> TUDO PRONTO PARA CRESCER.`}
          </pre>
          <div className="mt-8">
            <div className="text-foreground font-bold text-xl uppercase mb-2">
              Hospedagem Inclusa
            </div>
            <p className="text-muted-foreground text-xs">
              Nós cuidamos da tecnologia, você cuida das vendas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
