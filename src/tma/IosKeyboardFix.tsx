import {
    mockTelegramEnv,
    viewportHeight,
    ViewportState
} from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'

export function IosKeyboardFix({ children }: PropsWithChildren) {
    const initialHeight = useRef(viewportHeight())

    const [currentHeight, setCurrentHeight] = useState(initialHeight.current)
    const [keyboardOffset, setKeyboardOffset] = useState(0)

    mockTelegramEnv({
        onEvent([event, data], next) {
            console.log('onEvent', event, data);

            if (event === 'viewport_changed') {
                console.log('currentHeight', currentHeight - (data as ViewportState).height);
                setKeyboardOffset(currentHeight - (data as ViewportState).height)
            }

            if (event === 'safe_area_changed') {
                console.log('viewportHeight', viewportHeight());
                setCurrentHeight(viewportHeight())
            }

            return next()
        }
    })

    useEffect(() => {
        console.log(keyboardOffset);
    }, [keyboardOffset])

    console.log(
        'render',
        keyboardOffset,
    )

    return (
        <div style={{ paddingBottom: keyboardOffset > 0 ? keyboardOffset : 0 }}>
            {children}
        </div>
    )
}
