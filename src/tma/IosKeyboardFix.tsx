import {
    on,
    viewportHeight,
    viewportSafeAreaInsetTop
} from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useRef, useState } from 'react'

interface ViewportSafeArea {
    top: number
}

export function IosKeyboardFix({ children }: PropsWithChildren) {
    const initialHeight = useRef(viewportHeight())
    const initialTop = useRef(viewportSafeAreaInsetTop())

    const [currentHeight, setCurrentHeight] = useState(initialHeight.current)
    const [currentTop, setCurrentTop] = useState(initialTop.current)
    const [keyboardOffset, setKeyboardOffset] = useState(0)

    /* useEffect(() => {
        console.log(keyboardOffset);
    }, [keyboardOffset]) */

    on('viewport_changed', data => {
        console.log('currentHeight', currentHeight, currentHeight - data.height);
        setKeyboardOffset(currentHeight - data.height)
    })

    on('safe_area_changed', data => {
        if (currentTop !== (data as ViewportSafeArea).top) {
            console.log('viewportHeight', viewportHeight());
            setCurrentHeight(viewportHeight())
            setCurrentTop((data as ViewportSafeArea).top)
        }
    })

    console.log(
        'render',
        keyboardOffset,
    )

    return (
        <div style={{ marginBottom: keyboardOffset > 0 ? keyboardOffset : 0 }}>
            {children}
        </div>
    )
}
