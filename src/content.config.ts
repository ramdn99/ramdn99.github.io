import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    readTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const achievements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    images: z.array(z.string()).max(4).default([]),
    order: z.number().default(0),
  }),
});

const gsoc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gsoc' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    readTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const cheatSheets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cheatSheets' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    readTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups, gsoc, cheatSheets, achievements };

