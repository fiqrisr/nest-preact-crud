import { useState } from 'preact/hooks';
import axios from '@/api/axios';
import styles from './styles.module.scss';
import { route } from 'preact-router';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e: any) => setUsername(e.target.value);

	const handlePasswordChange = (e: any) => setPassword(e.target.value);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const res = await axios.post('/auth/login', {
			username,
			password
		});

		if (res.data.data) route('/');
	};

	return (
		<div class={styles.loginPage}>
			<form action="" onSubmit={onSubmit} class="pure-form pure-form-stacked">
				<div class="pure-control-group">
					<label type="text" for="email" class={styles.label}>
						Username
					</label>
					<input
						name="username"
						id="username"
						placeholder="Username"
						onChange={handleUsernameChange}
						value={username}
					/>
				</div>

				<div class="pure-control-group">
					<label for="password" class={styles.label}>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						onChange={handlePasswordChange}
						value={password}
					/>
				</div>

				<button type="submit" class="pure-button pure-button-primary">
					Log In
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
