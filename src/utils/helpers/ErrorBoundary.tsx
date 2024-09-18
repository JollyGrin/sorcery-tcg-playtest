import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  //@ts-expect-error: any
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.error("getDerivedStateFromError", error);

    return { hasError: true };
  }
  //@ts-expect-error: any
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    //@ts-expect-error: readonly
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    //@ts-expect-error: readonly
    return this.props.children;
  }
}

export default ErrorBoundary;
