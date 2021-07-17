import { render } from 'preact';
import App from './app';
import 'purecss';
import './styles/main.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, document.getElementById('app')!);
