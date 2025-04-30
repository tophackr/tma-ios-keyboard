import {
    isFullscreen,
    on,
    viewportHeight,
    viewportSafeAreaInsetTop
} from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useRef, useState } from 'react'

export function IosKeyboardFix({ children }: PropsWithChildren) {
    const initialHeight = useRef(0)
    const initialTop = useRef(viewportSafeAreaInsetTop())

    const [currentHeight, setCurrentHeight] = useState(initialHeight.current)
    const [currentTop, setCurrentTop] = useState(initialTop.current)
    const [keyboardOffset, setKeyboardOffset] = useState(0)

    on('viewport_changed', data => {
        if (initialHeight.current === 0) {
            initialHeight.current = data.height
            setCurrentHeight(data.height)
        }

        setKeyboardOffset(currentHeight - data.height)
    })

    on('safe_area_changed', data => {
        if (currentTop !== data.top) {
            setCurrentHeight(viewportHeight())
            setCurrentTop(data.top)
        }
    })

    const marginBottom = keyboardOffset > 0
        ? keyboardOffset + (keyboardOffset / (isFullscreen() ? 2 : 4))
        : 0

    return (
        <div style={{ marginBottom }}>
            {children}
        </div>
    )
}
