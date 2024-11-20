import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formSchemaValidator } from '../types/schema'; // Importing the updated schema validator

interface JSONEditorProps {
  onSchemaChange: (schema: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onSchemaChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to update the dark mode state
    const updateTheme = () => {
      setIsDarkMode(document.body.classList.contains('dark'));
    };

    // Update the theme initially
    updateTheme();

    // Listen for class changes to the body
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    try {
      const parsed = JSON.parse(value);
      formSchemaValidator.parse(parsed); // Validate schema with updated schema validator
      setError(null);
      onSchemaChange(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON format');
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
      {/* JSON Input Area */}
      <textarea
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter JSON schema here"
        className={`w-full h-40 p-2 border rounded mb-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
      />

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* JSON Preview */}
      <h4 className="font-bold mt-4">JSON Preview</h4>
      <SyntaxHighlighter
        language="json"
        style={isDarkMode ? materialDark : materialLight}
        customStyle={{
          backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
          padding: '1rem',
          borderRadius: '4px',
        }}
      >
        {inputValue || '{}'}
      </SyntaxHighlighter>
    </div>
  );
};

export default JSONEditor;
