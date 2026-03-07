'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import CloudArchitecture from '@/components/sections/CloudArchitecture'
import Terminal from '@/components/sections/Terminal'
import Contact from '@/components/sections/Contact'
import Testimonials from '@/components/sections/Testimonials'
import OpenSource from '@/components/sections/OpenSource'
import Businesses from '@/components/sections/Businesses'

// Lazy load client-only / heavy components
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const CursorTrail = dynamic(() => import('@/components/ui/CursorTrail'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false })
const AIChat = dynamic(() => import('@/components/ui/AIChat'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/layout/SmoothScroll'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
    document.body.classList.remove('loading')
  }, [])

  return (
    <>
      {/* Global UI layer */}
      <SmoothScroll />
      <CustomCursor />
      <CursorTrail />
      <ScrollProgress />
      <LoadingScreen onComplete={handleLoadComplete} />
      <AIChat />

      {/* Main layout */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <Navbar />

        <main>
          {/* Core sections */}
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CloudArchitecture />

          {/* New sections */}
          <OpenSource />
          <Businesses />
          <Testimonials />

          {/* Interactive & closing */}
          <Terminal />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
