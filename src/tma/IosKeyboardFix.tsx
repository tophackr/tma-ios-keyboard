import {
    mockTelegramEnv,
    viewportHeight,
    viewportSafeAreaInsetTop,
    ViewportState
} from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'

interface ViewportSafeArea {
    top: number
}

export function IosKeyboardFix({ children }: PropsWithChildren) {
    const initialHeight = useRef(viewportHeight())
    const initialTop = useRef(viewportSafeAreaInsetTop())

    const [currentHeight, setCurrentHeight] = useState(initialHeight.current)
    const [currentTop, setCurrentTop] = useState(initialTop.current)
    const [keyboardOffset, setKeyboardOffset] = useState(0)

    useEffect(() => {
        console.log(keyboardOffset);
        mockTelegramEnv({
            onEvent([event, data], next) {
                console.log('onEvent', event, data);
    
                if (event === 'viewport_changed') {
                    console.log('currentHeight', currentHeight, currentHeight - (data as ViewportState).height);
                    setKeyboardOffset(currentHeight - (data as ViewportState).height)
                }
    
                if (event === 'safe_area_changed') {
                    if (currentTop !== (data as ViewportSafeArea).top) {
                        console.log('viewportHeight', viewportHeight());
                        setCurrentHeight(viewportHeight())
                        setCurrentTop((data as ViewportSafeArea).top)
                    }
                }
    
                return next()
            }
        })
    }, [keyboardOffset, currentHeight, currentTop])

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
