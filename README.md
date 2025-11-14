# YKP Supplies - New Cairo

A premium e-commerce website for YKP Supplies - New Cairo, showcasing Egyptian heritage travel pillows with wholesale and manufacturing capabilities.

## Features

- Egyptian-themed design with gold accents and hieroglyphic elements
- Responsive layout for all devices
- Product showcase with detailed specifications
- Wholesale inquiry system
- Contact form with email notifications
- Blog with Egyptian heritage content
- SEO optimized for travel accessories and wholesale markets

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account for email notifications

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ykp-supplies-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:
   ```env
   GMAIL_USER=your-gmail-address@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   CONTACT_EMAIL=ykp.supplies@gmail.com
   ```

   **Important Email Setup Notes:**
   - You MUST use a Gmail App Password, not your regular Gmail password
   - You MUST enable 2-Factor Authentication on your Gmail account
   - See [docs/email-setup.md](docs/email-setup.md) for detailed instructions

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── components/          # Reusable UI components
├── data/               # Static data files
├── lib/                # Utility functions and helpers
├── pages/              # Next.js pages and API routes
├── public/             # Static assets
├── styles/             # CSS stylesheets
├── types/              # TypeScript type definitions
└── docs/               # Documentation files
```

## Key Pages

- **Home** (`/`) - Hero section with product highlights
- **Products** (`/products`) - Product catalog with filtering
- **About** (`/about`) - Company story and values
- **Contact** (`/contact`) - Contact form with factory communication
- **Blog** (`/blog`) - Egyptian heritage and product articles

## Email Notifications

The contact form sends emails using Gmail SMTP:
- Customer inquiries are sent to the factory email
- Customers receive an auto-reply confirmation
- Email templates are themed with Egyptian elements

For email setup instructions, see [docs/email-setup.md](docs/email-setup.md).

### Testing Email Configuration

After setting up your Gmail credentials:

1. Restart your development server
2. Visit http://localhost:3000/api/test-email (or 3001 if 3000 is in use)
3. You should see a success message if your configuration is correct

### Common Email Issues

If you see authentication errors:
1. Make sure you're using an App Password, not your regular Gmail password
2. Verify that 2-Factor Authentication is enabled on your Gmail account
3. Generate a new App Password and update your `.env.local` file

## Deployment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!