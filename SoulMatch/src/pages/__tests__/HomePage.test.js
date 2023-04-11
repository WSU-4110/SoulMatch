import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomePage from '../HomePage';

const dummyStore = createStore(() => ({
  user: {
    loggedIn: false
  }
}));


test('renders HomePage component', () => {
  const {} = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );

});

test('renders the SoulMatch title', () => {
  const { getByTestId } = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );
  const title = getByTestId('home-page-title');
  expect(title).toHaveTextContent('SoulMatch');
});

test('renders the navigation links', () => {
  const {getByText} = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Contact')).toBeInTheDocument();
});

test('renders the SoulMatch logo', () => {
  const {getByAltText} = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );
  const logo = getByAltText('SoulMatch Logo');
  expect(logo).toBeInTheDocument();
});

it('renders the sub text on page', () => {
  const {getByTestId} = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );
  const text = getByTestId('text');
  expect(text).toHaveTextContent("SoulMatch, a better way to find matches. No matter who you are or where you're from, come find your");
});

test('renders the Login link', () => {
  const {getByText} = render(
    <Provider store={dummyStore}>
      <HomePage />
    </Provider>
  );
  const loginLink = getByText("Login");
  expect(loginLink).toBeInTheDocument();
});

