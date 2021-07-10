import { render } from 'preact';
import App from './app';
import 'purecss';
import './styles/main.scss';

render(<App />, document.getElementById('app')!);
