import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Om Patil | Software Engineer & Workflow Automation',
  description: 'Portfolio of Om Patil — specializing in modern web development, API automation via n8n, scalable backends, and cloud computing architectures.',
  keywords: ['Software Engineer', 'Web Developer', 'n8n Automation', 'React', 'AWS', 'Python', 'Cloud Computing', 'Om Patil'],
  authors: [{ name: 'Om Patil' }],
  creator: 'Om Patil',
  openGraph: {
    title: 'Om Patil — Software Engineer & Workflow Automation',
    description: 'Portfolio of Om — specializing in modern web development, API automation via n8n, and scalable cloud architectures.',
    url: 'https://ompatil.com',
    siteName: 'Om Patil Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Patil — Software Engineer & Automation',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
