import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorMessage } from '../components-transponder';

interface IProps {
	children?: ReactNode;
}

interface IState {
	error: boolean;
	errorText: string;
}

export class ErrorBoundary extends Component<IProps, IState> {
	state: IState = {
		error: false,
		errorText: '',
	};

	componentDidCatch(error: Error, errorMessage: ErrorInfo) {
		console.log('Первый аргумент componentDidCatch: >>', error, errorMessage);

		this.setState({
			error: true,
			errorText: error.message,
		});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage errorText={this.state.errorText} />;
		}

		return this.props.children;
	}
}
