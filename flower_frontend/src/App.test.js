import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

test('renders home page when user is not logged in', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const homeElement = screen.getByText(/welcome to our store/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders login and signup routes when user is not logged in', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const loginElement = screen.getByText(/login/i);
  const signupElement = screen.getByText(/signup/i);
  expect(loginElement).toBeInTheDocument();
  expect(signupElement).toBeInTheDocument();
});

// Add more tests for other routes and scenarios as needed
