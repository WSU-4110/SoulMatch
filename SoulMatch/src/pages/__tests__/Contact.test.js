import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ContactPage from '../ContactPage'

const dummyStore = createStore(() => ({
    user: {
      loggedIn: false
    }
  }));

  test('renders ContactPage component', () => {
    const {} = render(
      <Provider store={dummyStore}>
        <ContactPage />
      </Provider>
    );
  
  });

  test('renders SouMatch name', () => {
    const { getByTestId } = render(
      <Provider store={dummyStore}>
        <ContactPage />
      </Provider>
    );
    const title = getByTestId('contact-page-title');
    expect(title).toHaveTextContent('Contact Us');
  });

  test('renders ContactPage text', () => {
    const { getByTestId } = render(
        <Provider store={dummyStore}>
          <ContactPage />
        </Provider>
      );
    expect(getByTestId('text')).toHaveTextContent('Have some feedback for us? Need help with anything? You\'ve come to the right place.');
  });
  
  test('testing the navigation links', () => {
    const {getByText} = render(
      <Provider store={dummyStore}>
        <ContactPage />
      </Provider>
    );
  
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
  });
  
  test('renders ContactPage logo', () => {
    const {getByAltText} = render(
        <Provider store={dummyStore}>
          <ContactPage />
        </Provider>
            );
  
    expect(getByAltText('SoulMatch Logo')).toBeInTheDocument();
  });

  test('feedback box form link works', () => {
    const {getByAltText} = render(
        <Provider store={dummyStore}>
          <ContactPage />
        </Provider>
      );
    const formLink = getByAltText('feedbackIcon');
    expect(formLink).toBeInTheDocument();
  });
  
  
  