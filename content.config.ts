import { defineCollection, z } from '@nuxt/content'

export const collections = {
  rockerRoom: defineCollection({
    type: 'page',
    source: 'the-rocker-room/**/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.string(),
      copyText: z.string(),
      cover: z.string()
    })
  })
}