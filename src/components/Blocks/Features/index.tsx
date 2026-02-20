'use client'

import React from 'react'
import { ServiceCard } from '@/components/ServiceCard'
import { DotGridBackground } from '@/components/DotGridBackground'
import {
  WebsiteIcon,
  MobileIcon,
  DashboardIcon,
  CorporateIcon,
  ChatbotIcon,
  InfrastructureIcon,
} from '@/components/AnimatedIcons'

const services = [
  {
    category: 'DIGITAL',
    title: 'Websites',
    description: 'Desenvolvimento de sites modernos e responsivos para sua marca.',
    icon: <WebsiteIcon />,
  },
  {
    category: 'MOBILE',
    title: 'Aplicativos',
    description: 'Apps nativos e multiplataforma com a melhor experiência de usuário.',
    icon: <MobileIcon />,
  },
  {
    category: 'GESTÃO',
    title: 'Painel administrativo',
    description: 'Gerenciamento completo do seu negócio com dashboards intuitivos.',
    icon: <DashboardIcon />,
  },
  {
    category: 'CORPORATIVO',
    title: 'Sites institucionais',
    description: 'Fortaleça sua presença online com um site institucional profissional.',
    icon: <CorporateIcon />,
  },
  {
    category: 'AUTOMAÇÃO',
    title: 'Whatsapp Chatbots',
    description: 'Automatize seu atendimento e venda mais pelo WhatsApp.',
    icon: <ChatbotIcon />,
  },
  {
    category: 'INFRAESTRUTURA',
    title: 'Hospedagem',
    description: 'Servidores rápidos e seguros para manter seus serviços sempre online.',
    icon: <InfrastructureIcon />,
  },
]

export function Features() {
  return (
    <section id="services" className="relative py-24 px-8 md:px-16 border-t border-white/5 bg-[#050505]">
      <DotGridBackground />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2 block">
            Expertise
          </span>
          <h2 className="text-4xl font-bold text-white">Nossas Soluções</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              category={service.category}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
