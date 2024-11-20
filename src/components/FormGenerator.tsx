import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: { pattern: string; message: string };
  options?: { value: string; label: string }[];
}

interface FormGeneratorProps {
  schema: { formTitle: string; fields: Field[] | undefined };
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to update the dark mode state
    const updateTheme = () => {
      setIsDarkMode(document.body.classList.contains('dark'));
    };

    // Initial theme detection
    updateTheme();

    // Observe changes to the `class` attribute of the `body` element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  const onSubmit = (data: any) => {
    setLoading(true);
    setSuccess(false);
    console.log('Form Submitted:', data);

    setFormData(data);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      reset();
    }, 2000);
  };

  const copyFormJSON = () => {
    const schemaJSON = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(schemaJSON)
      .then(() => alert('Form JSON copied to clipboard!'))
      .catch((err) => console.error('Failed to copy:', err));
  };

  const downloadJSON = () => {
    if (formData) {
      const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(jsonBlob);
      link.download = 'form_submission.json';
      link.click();
    } else {
      alert('No form submission to download.');
    }
  };

  const fields = schema.fields || [];

  return (
    <div className={`p-4 ${isDarkMode ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
      <h2 className="text-2xl font-bold">{schema.formTitle || 'Dynamic Form'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              className={`block font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              {field.label}
            </label>
            {field.type === 'select' && (
              <Controller
                name={field.id}
                control={control}
                rules={{
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                }}
                render={({ field: { onChange, value } }) => (
                  <select
                    onChange={onChange}
                    value={value || ''}
                    className={`border rounded p-2 w-full ${
                      isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-white'
                    }`}
                  >
                    <option value="" disabled>Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
            {field.type === 'radio' && (
              <div className="flex space-x-4">
                {field.options?.map((option) => (
                  <label
                    key={option.value}
                    className={`inline-flex items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  >
                    <Controller
                      name={field.id}
                      control={control}
                      rules={{ required: field.required }}
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="radio"
                          value={option.value}
                          checked={value === option.value}
                          onChange={onChange}
                          className={`form-radio ${isDarkMode ? 'text-gray-300' : 'text-black'}`}
                        />
                      )}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
            {['text', 'email', 'textarea'].includes(field.type) && (
              <input
                {...control.register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                })}
                placeholder={field.placeholder}
                className={`border rounded p-2 w-full ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-white'
                }`}
              />
            )}

            {/* Show error messages */}
            {errors[field.id] && (
  <span className="text-red-500">
    {errors[field.id]?.message ? String(errors[field.id]?.message) : 'This field is required'}
  </span>
)}
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${
            isDarkMode ? 'bg-blue-600 text-gray-200' : 'bg-blue-500 text-white'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {success && (
        <div className={`mt-4 p-2 border rounded ${isDarkMode ? 'bg-green-700 text-gray-200' : 'bg-green-100 text-green-700'}`}>
          Form submitted successfully!
        </div>
      )}

      <div className="mt-4 space-x-4">
        <button
          onClick={copyFormJSON}
          className={`py-2 px-4 rounded ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-600 text-white'}`}
        >
          Copy Form JSON
        </button>
        <button
          onClick={downloadJSON}
          className={`py-2 px-4 rounded ${isDarkMode ? 'bg-green-700 text-gray-200' : 'bg-green-600 text-white'}`}
        >
          Download Submission as JSON
        </button>
      </div>
    </div>
  );
};

export default FormGenerator;
