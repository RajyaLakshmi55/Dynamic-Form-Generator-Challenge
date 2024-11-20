import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormGenerator from '../components/FormGenerator';
import { useForm, Controller } from 'react-hook-form';

const mockSchema = {
  formTitle: 'Test Form',
  fields: [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'text', required: true },
  ],
};

describe('FormGenerator Component', () => {
  it('renders form title and fields', () => {
    render(<FormGenerator schema={mockSchema} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error message for empty required fields on submit', async () => {
    render(<FormGenerator schema={mockSchema} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(screen.getByText('This field is required')).toBeInTheDocument());
  });

  it('shows success message after form submission', async () => {
    render(<FormGenerator schema={mockSchema} />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument());
  });

  it('disables the submit button while the form is being submitted', async () => {
    render(<FormGenerator schema={mockSchema} />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });
});
