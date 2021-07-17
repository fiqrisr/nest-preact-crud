import { Component } from 'preact';
import Router, { route } from 'preact-router';
import AsyncRoute from 'preact-async-route';

interface Route {
	path: string;
	component: () => any;
}

const routes: Route[] = [
	{
		path: '/',
		component: () => import('./pages/Home').then((module) => module.default)
	},
	{
		path: '/auth/login',
		component: () => import('./pages/Login').then((module) => module.default)
	}
];

class Redirect extends Component<{ to: string }> {
	componentWillMount() {
		route(this.props.to, true);
	}

	render() {
		return null;
	}
}

const RouterComponent = () => {
	return (
		<Router>
			<Redirect path="/" to="/auth/login" />
			{routes.map((route) => (
				<AsyncRoute path={route.path} getComponent={route.component} />
			))}
		</Router>
	);
};

export default RouterComponent;
