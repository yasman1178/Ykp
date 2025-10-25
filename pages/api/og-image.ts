import { NextApiRequest, NextApiResponse } from 'next';
import { generateOGImageHTML, OGImageConfig } from '@/lib/og-image-generator';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    arabicTitle,
    symbol,
    author,
    readingTime,
    category,
    format = 'og'
  } = req.query;

  // Validate required parameters
  if (!title || !arabicTitle || !symbol || !author || !readingTime || !category) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const config: OGImageConfig = {
    title: title as string,
    arabicTitle: arabicTitle as string,
    symbolIcon: symbol as string,
    authorName: author as string,
    readingTime: parseInt(readingTime as string),
    category: category as string
  };

  // Generate HTML for the OG image
  const html = generateOGImageHTML(config);

  // In a production environment, you would:
  // 1. Use a service like Puppeteer to convert HTML to image
  // 2. Use Vercel's @vercel/og package
  // 3. Use a service like Bannerbear or Placid
  // 4. Pre-generate images and serve them statically

  // For now, we'll return the HTML (useful for debugging)
  if (req.query.debug === 'true') {
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }

  // Return a placeholder image URL or redirect to a generated image
  // This is where you'd integrate with your image generation service
  const placeholderImageUrl = `https://via.placeholder.com/1200x630/D4AF37/1E3A8A?text=${encodeURIComponent(title as string)}`;
  
  res.redirect(302, placeholderImageUrl);
}

// Example integration with @vercel/og (commented out for now)
/*
import { ImageResponse } from '@vercel/og';

export default function handler(req: NextApiRequest) {
  const { title, arabicTitle, symbol, author, readingTime, category } = req.query;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #1E3A8A 50%, #CD853F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Cairo, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '30px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ fontSize: '120px', color: '#D4AF37', marginBottom: '20px' }}>
            {symbol}
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#1E3A8A',
              marginBottom: '15px',
              fontFamily: 'Amiri, serif',
            }}
          >
            {arabicTitle}
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#4682B4',
              marginBottom: '30px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              fontSize: '18px',
              color: '#666',
              marginBottom: '20px',
            }}
          >
            <span>{author}</span>
            <span>•</span>
            <span>{readingTime} دقائق قراءة</span>
            <span>•</span>
            <span>{category}</span>
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#D4AF37',
              marginTop: '20px',
            }}
          >
            Pharaonic Pillows Egypt | وسائد فرعونية مصر
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
*/