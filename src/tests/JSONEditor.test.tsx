import { render, screen, fireEvent } from '@testing-library/react';
import JSONEditor from '../components/JSONEditor';
import { formSchemaValidator } from '../types/schema';

describe('JSONEditor Component', () => {
  it('renders the JSON editor and allows input', () => {
    const mockOnSchemaChange = jest.fn();
    render(<JSONEditor onSchemaChange={mockOnSchemaChange} />);

    const textArea = screen.getByPlaceholderText('Enter JSON schema here');
    fireEvent.change(textArea, { target: { value: '{"formTitle":"Test Form","fields":[]}' } });

    expect(textArea).toHaveValue('{"formTitle":"Test Form","fields":[]}');
  });

  it('shows an error message when invalid JSON is input', () => {
    const mockOnSchemaChange = jest.fn();
    render(<JSONEditor onSchemaChange={mockOnSchemaChange} />);

    const textArea = screen.getByPlaceholderText('Enter JSON schema here');
    fireEvent.change(textArea, { target: { value: '{"formTitle": "Test Form", "fields" ' } });

    expect(screen.getByText('Invalid JSON format')).toBeInTheDocument();
  });

  it('calls the onSchemaChange function when valid JSON is entered', () => {
    const mockOnSchemaChange = jest.fn();
    render(<JSONEditor onSchemaChange={mockOnSchemaChange} />);

    const textArea = screen.getByPlaceholderText('Enter JSON schema here');
    fireEvent.change(textArea, { target: { value: '{"formTitle":"Test Form","fields":[]}' } });

    expect(mockOnSchemaChange).toHaveBeenCalledWith({
      formTitle: 'Test Form',
      fields: [],
    });
  });
});
