import React from "react"
import { Link } from "react-router-dom"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, componentStack: "" }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("UI crashed:", error, info)
    this.setState({ componentStack: info?.componentStack || "" })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const message =
      typeof this.state.error?.message === "string"
        ? this.state.error.message
        : "Unknown error"

    const stack =
      typeof this.state.error?.stack === "string" ? this.state.error.stack : ""

    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 px-4 text-richblack-5">
        <div className="w-full max-w-2xl rounded-lg border border-richblack-700 bg-richblack-800 p-6">
          <div className="text-2xl font-semibold">Something went wrong</div>
          <div className="mt-2 text-sm text-richblack-200">
            A component crashed while rendering this page.
          </div>
          <div className="mt-4 rounded-md bg-richblack-900 p-4 font-mono text-xs text-yellow-50">
            {message}
          </div>
          {(stack || this.state.componentStack) && (
            <details className="mt-4 rounded-md border border-richblack-700 bg-richblack-900 p-4">
              <summary className="cursor-pointer select-none text-sm font-semibold text-richblack-25">
                Show details
              </summary>
              {stack && (
                <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-[11px] text-richblack-50">
                  {stack}
                </pre>
              )}
              {this.state.componentStack && (
                <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-[11px] text-richblack-200">
                  {this.state.componentStack}
                </pre>
              )}
            </details>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
            <Link
              className="rounded-md border border-richblack-600 bg-richblack-900 px-4 py-2 font-semibold text-yellow-50"
              to="/dashboard/enrolled-courses"
            >
              Back to Enrolled Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

