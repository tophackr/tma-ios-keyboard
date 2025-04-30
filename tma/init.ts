import {
    bindThemeParamsCssVars,
    bindViewportCssVars,
    init as initSDK,
    isThemeParamsCssVarsBound,
    isViewportCssVarsBound,
    isViewportMounting,
    miniAppReady,
    mountMiniAppSync,
    mountViewport,
    restoreInitData,
    setDebug,
    targetOrigin
} from '@telegram-apps/sdk-react'

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(): Promise<void> {
    // Set @telegram-apps/sdk-react debug mode.
    setDebug(true)
    targetOrigin.set('https://tgl.mini-apps.store')

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK()
    miniAppReady()

    // Add Eruda if needed.
    void import('eruda').then(({ default: lib }) => {
        lib.init()
        lib.position({ x: window.innerWidth - 50, y: 0 })
    })

    restoreInitData()

    if (mountMiniAppSync.isAvailable()) {
        mountMiniAppSync()
        if (!isThemeParamsCssVarsBound()) bindThemeParamsCssVars()
    }

    if (mountViewport.isAvailable() && !isViewportMounting()) {
        mountViewport().then(() => {
            if (!isViewportCssVarsBound()) bindViewportCssVars()
        })
    }
}
