import { TelegramProvider } from '@/tma/provider'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { Viewport } from 'next'
import { type JSX, type PropsWithChildren, memo } from 'react'
import './globals.css'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}

const AppLayout = memo(async function AppLayout({
    children
}: PropsWithChildren): Promise<JSX.Element> {
    return (
        <html >
            <body>
                <div id={'app'}>
                    <TelegramProvider>{children}</TelegramProvider>
                </div>
            </body>
        </html>
    )
})

export default AppLayout
