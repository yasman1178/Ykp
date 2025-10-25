const fs = require('fs');
const path = require('path');

// Read the blog articles file
const blogArticlesPath = path.join(__dirname, 'data', 'blog-articles.ts');
const blogContent = fs.readFileSync(blogArticlesPath, 'utf8');

// Extract slugs using regex
const slugMatches = blogContent.match(/slug:\s*['"]([^'"]+)['"]/g);
const slugs = slugMatches ? slugMatches.map(match => match.split("'")[1] || match.split('"')[1]) : [];

console.log('Blog article slugs:');
slugs.forEach((slug, index) => {
  console.log(`${index + 1}. ${slug}`);
});

console.log('\nTotal articles:', slugs.length);