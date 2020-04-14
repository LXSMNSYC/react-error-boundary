import * as React from 'react';

export interface ErrorBoundaryState {
  error: Error;
  info: React.ErrorInfo;
}

export interface ErrorBoundaryProps {
  onError: (info: ErrorBoundaryState) => void;
  fallback?: React.ComponentType<ErrorBoundaryState>;
  children?: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    const state: ErrorBoundaryState = {
      error,
      info,
    };

    this.props.onError(state);

    this.setState(state);
  }

  public render() {
    const { children, fallback: Fallback } = this.props;
    const { error, info } = this.state

    if (error != null) {
      if (Fallback) {
        return (
          <Fallback error={error} info={info} />
        );
      }
      return null;
    }

    return children;
  }
}