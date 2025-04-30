import {
    mockTelegramEnv,
    viewportHeight,
    viewportSafeAreaInsetTop
} from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'

export function IosKeyboardFix({ children }: PropsWithChildren) {
    const initialHeight = useRef(viewportHeight())

    const [currentHeight, setCurrentHeight] = useState(initialHeight.current)
    const [currentTop, setCurrentTop] = useState(viewportSafeAreaInsetTop())
    const [keyboardOffset, setKeyboardOffset] = useState(
        currentHeight - viewportHeight()
    )

    useEffect(() => {
        const newTop = viewportSafeAreaInsetTop()
        const newHeight = viewportHeight()

        console.log('newBottom', newTop)

        setCurrentTop(prevTop => {
            if (newTop !== prevTop) {
                setCurrentHeight(newHeight)
                return newTop
            }
            return prevTop
        })

        if (newHeight !== currentHeight) {
            console.log('newHeight', newHeight, currentHeight)
            setKeyboardOffset(newHeight - viewportHeight())
        }
    }, [currentHeight])

    mockTelegramEnv({
        onEvent(e, next) {
            console.log('onEvent', e);

            return next()
        }
    })

    console.log(
        'render',
        currentTop,
        keyboardOffset,
        currentHeight,
        viewportHeight()
    )

    return (
        <div style={{ paddingBottom: keyboardOffset > 0 ? keyboardOffset : 0 }}>
            {children}
        </div>
    )
}
