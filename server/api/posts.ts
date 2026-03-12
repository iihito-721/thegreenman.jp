import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  try {
    const contentDir = join(process.cwd(), 'content', 'the-rocker-room')
    const files = readdirSync(contentDir).filter(file => file.endsWith('.md'))
    
    const posts = files.map(file => {
      const filePath = join(contentDir, file)
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      return {
        _path: `/the-rocker-room/${file.replace('.md', '')}`,
        title: data.title,
        description: data.description,
        slug: data.slug,
        tags: data.tags || [],
        date: data.date,
        cover: data.cover,
        hover: data.hover,
        displacement: data.displacement,
        bgtitle: data.bgtitle,
        bgtext: data.bgtext,
        copyText: data.copyText,
        content: content
      }
    })
    
    // post.date順でソート（新しい順）
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading markdown files:', error)
    return []
  }
}) 