import React, { Component } from "react";
import { Page500 } from "../routes/page500/Page500";

class GlobalErrorHandler extends Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Page500 />;
    }

    return this.props.children;
  }
}

export default GlobalErrorHandler;
