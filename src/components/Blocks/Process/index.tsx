import React from 'react'
import { Page } from '@/payload-types'
import { DotGridBackground } from '@/components/DotGridBackground'

type ProcessBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'process' }>

export const ProcessBlock: React.FC<ProcessBlockProps> = ({ title, steps }) => {
  return (
    <section id="process" className="relative py-24 px-8 md:px-16 border-t border-white/5 bg-[#050505]">
      <DotGridBackground />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="mb-16">
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2 block">
                Process
              </span>
              <h2 className="text-4xl font-bold text-white">
                {title || 'Nosso Processo'}
              </h2>
            </div>
            
            <div className="space-y-12">
              {steps?.map((item, idx) => (
                <div key={item.id || idx} className="flex gap-6 group">
                  <span className="text-white/40 font-bold border-r border-white/10 pr-6 group-hover:text-white transition-colors">
                    {item.stepNumber || `0${idx + 1}`}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-2 text-white">{item.title}</h4>
                    <p className="text-white/50 text-sm max-w-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-center items-center text-center overflow-hidden rounded-2xl group hover:border-white/30 transition-colors duration-300">
            {/* Grid Background inside the card */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
            
            {/* Corner Brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />

            <div className="relative z-10 w-full">
              <div className="absolute top-0 left-0 text-white/40 text-[10px] tracking-widest font-mono">STATUS: PRODUÇÃO</div>
              <pre className="text-green-500 text-xs font-mono leading-relaxed text-left mt-8">
                {`> Publicando nova versão...
> Otimizando imagens... OK
> Verificando segurança... OK
> Deploy concluído com sucesso.
> Servidores ativos e monitorados.
> TUDO PRONTO PARA CRESCER.`}
              </pre>
              <div className="mt-8">
                <div className="text-white font-bold text-xl uppercase mb-2">
                  Hospedagem Inclusa
                </div>
                <p className="text-white/50 text-xs">
                  Nós cuidamos da tecnologia, você cuida das vendas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
