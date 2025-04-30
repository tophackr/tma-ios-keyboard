import { type JSX, memo, useEffect } from 'react'

export const ErrorPage = memo(function ErrorPage({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset?: () => void
}): JSX.Element {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('ErrorPage', error)
    }, [error])

    return (
        <div>
            <h2>An unhandled error occurred!</h2>
            <blockquote>
                <code>{error.message}</code>
            </blockquote>
            {reset && <button onClick={() => reset()}>Try again</button>}
        </div>
    )
})
