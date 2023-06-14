import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Memory game title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Memory Game/i);
  expect(linkElement).toBeInTheDocument();
});
