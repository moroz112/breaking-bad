import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import store from './store/configureStore';

test('renders App Router', () => {
  const {container} = render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
  );
  const linkElement = screen.getByText(/Episodes/i);
  expect(linkElement).toBeInTheDocument();
  expect(container.firstChild).toBeVisible();
});
