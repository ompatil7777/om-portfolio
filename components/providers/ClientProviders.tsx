'use client'
import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const CursorTrail = dynamic(() => import('@/components/ui/CursorTrail'), { ssr: false })

export default function ClientProviders() {
    return (
        <>
            <CustomCursor />
            <CursorTrail />
        </>
    )
}
