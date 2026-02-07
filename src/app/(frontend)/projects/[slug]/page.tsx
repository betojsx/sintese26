import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ProtectedProjectPage } from '@/components/ProtectedProjectPage'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: Props) {
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
    notFound()
  }

  // Fetch site settings for footer
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <ProtectedProjectPage
      project={project}
      nav={<Nav />}
      footer={<Footer cnpj={siteSettings?.general?.cnpj} />}
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
