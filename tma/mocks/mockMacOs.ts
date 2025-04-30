import {
    type ThemeParams,
    emitEvent,
    mockTelegramEnv,
    retrieveLaunchParams,
    themeParamsState
} from '@telegram-apps/sdk-react'

export function mockMacOs() {
    let firstThemeSent = false

    mockTelegramEnv({
        onEvent([event], next) {
            if (event === 'web_app_request_theme') {
                let tp: ThemeParams = {}

                if (firstThemeSent) {
                    tp = themeParamsState()
                } else {
                    firstThemeSent = true
                    tp ||= retrieveLaunchParams().tgWebAppThemeParams
                }

                return emitEvent('theme_changed', { theme_params: tp })
            }

            if (event === 'web_app_request_safe_area') {
                return emitEvent('safe_area_changed', {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                })
            }

            next()
        }
    })
}
