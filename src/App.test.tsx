import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    expect(render(<App />)).toBeTruthy();
  });
});
