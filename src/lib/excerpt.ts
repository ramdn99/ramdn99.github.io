import fs from 'node:fs';

export function extractFirstImage(entryOrMarkdown: any): string | undefined {
  let content = typeof entryOrMarkdown === 'string' ? entryOrMarkdown : entryOrMarkdown?.body;
  if (!content && entryOrMarkdown?.filePath) {
    try {
      content = fs.readFileSync(entryOrMarkdown.filePath, 'utf-8');
    } catch (e) {
      // ignore
    }
  }
  if (!content) return undefined;
  
  let imgUrl: string | undefined;
  const mdMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) {
    imgUrl = mdMatch[1].trim();
  } else {
    const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlMatch && htmlMatch[1]) {
      imgUrl = htmlMatch[1].trim();
    }
  }

  if (!imgUrl) return undefined;

  // Clean title quotes or parameters if any e.g. "path/to/img.png 'Title'"
  imgUrl = imgUrl.split(/\s+/)[0].replace(/^['"]|['"]$/g, '');

  // Normalize path with leading slash if relative
  if (!imgUrl.startsWith('http://') && !imgUrl.startsWith('https://') && !imgUrl.startsWith('/')) {
    imgUrl = '/' + imgUrl;
  }

  return imgUrl;
}

export function plainExcerpt(entryOrMarkdown: any, maxChars = 480): string {
  let markdown = typeof entryOrMarkdown === 'string' ? entryOrMarkdown : entryOrMarkdown?.body;
  if (!markdown && entryOrMarkdown?.filePath) {
    try {
      markdown = fs.readFileSync(entryOrMarkdown.filePath, 'utf-8');
    } catch (e) {
      // ignore
    }
  }
  if (!markdown) markdown = '';

  let text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';
}

