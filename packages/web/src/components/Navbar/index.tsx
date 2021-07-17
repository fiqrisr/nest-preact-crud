import styles from './styles.module.scss';

const Navbar = () => {
	return (
		<div class={`pure-menu pure-menu-horizontal ${styles.navbar}`}>
			<div class={styles.brand}>
				<a href="/" class="pure-menu-heading pure-menu-link">
					NestJs Preact Crud
				</a>
			</div>
			<ul class="pure-menu-list">
				<li class="pure-menu-item">
					<a href="/auth/login" class="pure-menu-link">
						Login
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
