import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ProtectedProjectPage } from '@/components/ProtectedProjectPage'
import { PortfolioNav } from '@/components/PortfolioNav'
import { PortfolioFooter } from '@/components/Blocks/PortfolioFooter'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PortfolioProjectPage({ params, searchParams }: Props) {
  const { slug } = await params
  const searchParamsValue = await searchParams
  const locale = (searchParamsValue?.locale as string) || 'en'

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    notFound()
  }

  // Fetch site settings for footer
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch Portfolio content
  const portfolio = await payload.findGlobal({
    slug: 'portfolio',
    locale: locale as 'en' | 'pt-BR',
  })

  return (
    <ProtectedProjectPage
      project={project}
      nav={<PortfolioNav portfolio={portfolio} />}
      footer={<PortfolioFooter cnpj={siteSettings?.general?.cnpj} footer={portfolio?.footer} />}
      backLink="/portfolio#work"
      backLabel="Voltar para Portfolio"
    />
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    }
  }

  // Don't show project title in metadata if protected
  if (project.isPasswordProtected) {
    return {
      title: 'Protected project',
      description: 'This project is password protected',
    }
  }

  return {
    title: `${project.title} | ExpoNext Studio`,
    description: `Detalhes do projeto ${project.title}`,
  }
}
