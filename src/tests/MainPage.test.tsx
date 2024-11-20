import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../pages/MainPage';
import { act } from 'react-dom/test-utils';

describe('MainPage Component', () => {
  it('renders the JSON editor and form preview', () => {
    render(<MainPage />);
    expect(screen.getByText('JSON Editor')).toBeInTheDocument();
    expect(screen.getByText('Form Preview')).toBeInTheDocument();
  });

  it('updates form preview when valid JSON is entered in the editor', async () => {
    render(<MainPage />);

    const textArea = screen.getByPlaceholderText('Enter JSON schema here');
    fireEvent.change(textArea, { target: { value: '{"formTitle":"Test Form","fields":[{"id":"name","label":"Name","type":"text"}]}' } });

    await act(async () => {
      fireEvent.change(textArea, { target: { value: '{"formTitle":"Updated Form","fields":[{"id":"name","label":"Name","type":"text"}]}' } });
    });

    expect(screen.getByText('Updated Form')).toBeInTheDocument();
  });
});
