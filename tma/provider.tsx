'use client'

import { isMiniAppDark, retrieveLaunchParams, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { type JSX, type PropsWithChildren, memo, useMemo } from 'react'
import { IosKeyboardFix } from './IosKeyboardFix'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorPage } from './components/ErrorPage'
import { init } from './init'
import { mockEnv } from './mocks/mockEnv'
import { useClientOnce } from './useClientOnce'
import { useDidMount } from './useDidMount'

const RootInner = memo(function RootInner({
    children
}: PropsWithChildren): JSX.Element {
    const isDev = process.env.NODE_ENV === 'development'

    // Mock Telegram environment in development mode if needed.
    useClientOnce(() => {
        mockEnv(isDev)
    })

    const lp = useMemo(()=> retrieveLaunchParams(), [])
    const { tgWebAppPlatform: platform } = lp
    const isApple = ['ios', 'macos'].includes(platform)
    const debug = true

    // Initialize the library.
    useClientOnce(() => {
        init({
            debug,
            eruda: debug,
            mockForMacOS: platform === 'macos'
        })
    })

    const isDark = useSignal(isMiniAppDark)

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={isApple ? 'ios' : 'base'}
        >
            {children}
        </AppRoot>
    )
})

export const TelegramProvider = memo(function TelegramProvider(
    props: PropsWithChildren
) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of
    // the Server Side Rendering. That's why we are showing loader on the server
    // side.
    const didMount = useDidMount()

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <IosKeyboardFix>
                <RootInner {...props} />
            </IosKeyboardFix>
        </ErrorBoundary>
    ) : (
        <>Loading data...</>
    )
})
