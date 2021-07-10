import Router, { Route } from 'preact-router';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="auth/login" component={LoginPage} />
    </Router>
  );
};

export default App;
