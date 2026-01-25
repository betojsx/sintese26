import React from 'react'
import { ArrowRight, Smartphone, Globe, Layers } from 'lucide-react'
import Link from 'next/link'
import { ContactSection } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Project } from '@/payload-types'
import { Nav } from '@/components/Nav'

const HeroAscii = () => (
  <pre className="text-[0.6rem] leading-[0.8] font-mono text-zinc-600 opacity-50 select-none hidden lg:block">
    {`
        ________________________________________________
       /                                                \\
      |    _________________________________________     |
      |   |                                         |    |
      |   |   ARQUITETURA HÍBRIDA NEXT.JS + EXPO    |    |
      |   |_________________________________________|    |
      |                                                  |
      |         _______           _______                |
      |        |       |         |       |               |
      |        |  WEB  | <-----> | MOBILE|               |
      |        |_______|         |_______|               |
      |            ^                 ^                   |
      |            |                 |                   |
      |      ______|_________________|______             |
      |     |                               |            |
      |     |       CAMADA DE API UNIFICADA |            |
      |     |_______________________________|            |
      |__________________________________________________|
               | |                          | |
               |_|                          |_|
`}
  </pre>
)

const MobileAscii = () => (
  <pre className="text-[0.5rem] leading-none font-mono text-zinc-500">
    {`
      .----------------. 
     | .--------------. |
     | |    EXPO      | |
     | |    APP       | |
     | |              | |
     | |   [ESCANEIE] | |
     | |              | |
     | |      :::     | |
     | |     :::::    | |
     | |      :::     | |
     | '--------------' |
     |      '----------------' 
`}
  </pre>
)

const WebAscii = () => (
  <pre className="text-[0.5rem] leading-none font-mono text-zinc-500">
    {`
 _________________________
| [X][-]                  |
|-------------------------|
|  NEXT.JS CORE           |
|                         |
|  > npm run dev          |
|  ready - started server |
|  on 0.0.0.0:3000        |
|_________________________|
`}
  </pre>
)

type FeatureCardProps = {
  icon: React.ElementType
  title: string
  description: string
  ascii?: React.ElementType
}

const FeatureCard = ({ icon: Icon, title, description, ascii: Ascii }: FeatureCardProps) => (
  <div className="border border-zinc-800 p-8 hover:border-zinc-500 transition-all group flex flex-col gap-6">
    <div className="flex justify-between items-start">
      <Icon className="text-[#fdfcf0]" size={32} />
      {Ascii && <Ascii />}
    </div>
    <div>
      <h3 className="text-[#fdfcf0] text-xl font-bold mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
)

const ProjectCard = ({
  title,
  image,
  slug,
  className = '',
}: {
  title: string
  image: any
  slug?: string | null
  className?: string
}) => {
  const imageUrl = typeof image === 'object' ? image?.url : typeof image === 'string' ? image : ''

  return (
    <Link
      href={slug ? `/projects/${slug}` : '#'}
      className={`group relative overflow-hidden border border-zinc-800 transition-all hover:border-zinc-500 ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0"
        />
      ) : (
        <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
          <span className="text-zinc-700 font-mono text-xs">[NO IMAGE]</span>
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500 group-hover:translate-x-2">
        <h3 className="text-xl font-bold uppercase tracking-tight text-[#fdfcf0]">{title}</h3>
        <div className="mt-2 h-0.5 w-0 bg-[#fdfcf0] transition-all duration-500 group-hover:w-16" />
      </div>
    </Link>
  )
}

export const DefaultHome = ({ projects }: { projects: Project[] }) => {
  const hasProjects = projects.length > 0

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fdfcf0]   selection:bg-[#fdfcf0] selection:text-black">
      <Nav />

      {/* Hero Section */}
      <header className="px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-zinc-800">
        <div>
          <div className="inline-block px-3 py-1 border border-zinc-700 text-zinc-500 text-[10px] uppercase tracking-widest mb-6">
            Seu Parceiro de Tecnologia
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            Seu App.
            <br />
            Seu Site. <span className="text-zinc-600">No Ar.</span>
          </h1>
          <p className="text-zinc-400 max-w-md text-lg mb-10 leading-relaxed italic">
            "Somos o braço de tecnologia do seu negócio." Desenvolvemos aplicativos e sites modernos
            usando as mesmas tecnologias de gigantes como iFood, PicPay e 99.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#fdfcf0] text-black px-8 py-4 font-bold uppercase text-sm flex items-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform border-r-4 border-b-4 border-zinc-400">
              Quero meu app <ArrowRight size={18} />
            </button>
            <button className="border border-zinc-700 px-8 py-4 font-bold uppercase text-sm hover:bg-zinc-900 transition-colors">
              Nossa Metodologia
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroAscii />
        </div>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-800">
        {[
          ['Plataformas', 'iOS, Android e Web'],
          ['Tecnologia', 'Padrão iFood/99'],
          ['Performance', 'Velocidade Máxima'],
          ['Entrega', '4-6 Semanas'],
        ].map(([label, value], i) => (
          <div key={i} className="p-8 border-r border-zinc-800 last:border-r-0 flex flex-col gap-1">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{label}</span>
            <span className="text-xl font-bold">{value}</span>
          </div>
        ))}
      </div>

      {/* Services/Philosophy */}
      <section id="stack" className="px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Tecnologia de Gigante para o Seu Negócio
            </h2>
            <p className="text-zinc-500 uppercase text-xs tracking-[0.2em]">
              Não fazemos apenas "sites". Construímos ferramentas de venda e engajamento.
            </p>
          </div>
          <div className="text-right">
            <span className="text-zinc-700 text-6xl font-black opacity-20">01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800">
          <FeatureCard
            icon={Smartphone}
            title="Apps Nativos"
            ascii={MobileAscii}
            description="Criamos aplicativos para iOS e Android que são rápidos e intuitivos. Usamos React Native, a mesma tecnologia que o Instagram e a 99 usam."
          />
          <FeatureCard
            icon={Globe}
            title="Sites de Alta Conversão"
            ascii={WebAscii}
            description="Sua empresa merece um site que carrega instantaneamente. Focamos em SEO para que seus clientes te encontrem no Google primeiro."
          />
          <FeatureCard
            icon={Layers}
            title="Deploy Sem Estresse"
            description="Esqueça a dor de cabeça com servidores. Nós cuidamos de toda a infraestrutura, hospedagem e publicação nas lojas para você."
          />
        </div>
      </section>

      {/* Social Proof Section (Brutalist style) */}
      <section className="bg-zinc-900/30 border-y border-zinc-800 py-20 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 text-2xl font-black uppercase tracking-widest text-zinc-700 select-none">
          <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
          <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
          <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
        </div>
      </section>

      {/* Projects Overview Section */}
      <section id="work" className="px-6 md:px-12 py-24 border-b border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
              Nossos Projetos
            </h2>
            <p className="text-zinc-500 uppercase text-xs tracking-[0.2em]">
              Soluções reais para problemas complexos • 2024-2025
            </p>
          </div>
          <div className="text-right">
            <span className="text-zinc-700 text-6xl font-black opacity-20">02</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {hasProjects ? (
            projects.map((project, i) => {
              // Default grid class for all items since 'size' field was removed
              // You can implement a pattern here if needed, e.g. first item larger:
              // const gridClass = i === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
              const gridClass = 'md:col-span-1 md:row-span-1'

              return (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  image={project.image}
                  slug={project.slug}
                  className={gridClass}
                />
              )
            })
          ) : (
            <div className="md:col-span-4 py-20 text-center border border-dashed border-zinc-800">
              <p className="text-zinc-600 uppercase tracking-[0.2em]">
                Carregando projetos do portfólio...
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="border border-zinc-700 px-12 py-4 font-bold uppercase text-sm hover:bg-zinc-900 transition-colors flex items-center gap-3 group"
          >
            Ver todos os projetos{' '}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-6 md:px-12 py-24 border-b border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">
              Nosso Processo
            </h2>
            <div className="space-y-12">
              {[
                {
                  step: '01',
                  title: 'Imersão',
                  body: 'Entendemos os desafios do seu negócio e desenhamos a melhor solução técnica.',
                },
                {
                  step: '02',
                  title: 'Construção',
                  body: 'Desenvolvemos seu produto com atualizações constantes e foco em qualidade.',
                },
                {
                  step: '03',
                  title: 'Infraestrutura',
                  body: 'Configuramos toda a hospedagem e segurança. Você não precisa entender de servidores.',
                },
                {
                  step: '04',
                  title: 'Lançamento',
                  body: 'Colocamos seu app nas lojas e seu site no ar. Pronto para receber clientes.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <span className="text-zinc-600 font-bold border-r border-zinc-800 pr-6 group-hover:text-[#fdfcf0] transition-colors">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold uppercase mb-2">{item.title}</h4>
                    <p className="text-zinc-500 text-sm max-w-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-zinc-700 text-[10px]">STATUS: PRODUÇÃO</div>
            <pre className="text-green-500 text-xs font-mono leading-relaxed text-left">
              {`> Publicando nova versão...
> Otimizando imagens... OK
> Verificando segurança... OK
> Deploy concluído com sucesso.
> Servidores ativos e monitorados.
> TUDO PRONTO PARA CRESCER.`}
            </pre>
            <div className="mt-8">
              <div className="text-[#fdfcf0] font-bold text-xl uppercase mb-2">
                Hospedagem Inclusa
              </div>
              <p className="text-zinc-500 text-xs">
                Nós cuidamos da tecnologia, você cuida das vendas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  )
}
