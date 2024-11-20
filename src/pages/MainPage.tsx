import React, { useState, useEffect } from 'react';
import JSONEditor from '../components/JSONEditor';
import FormGenerator from '../components/FormGenerator';

const MainPage: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and apply it to the body
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');  // Add 'dark' class to body
    } else {
      document.body.classList.remove('dark');  // Remove 'dark' class from body
    }
  }, [darkMode]);

  return (
    <div className="relative flex flex-col md:flex-row gap-4 p-4 overflow-auto min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      {/* JSON Editor Section */}
      <div className="flex-1 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-black dark:text-white">JSON Editor</h3>
        <JSONEditor onSchemaChange={setSchema} />
      </div>

      {/* Form Preview Section */}
      <div className="flex-1 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-black dark:text-white">Form Preview</h3>
        {schema && <FormGenerator schema={schema} />}
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <span className="text-sm font-semibold text-black dark:text-white">Dark Mode</span>
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="toggle"
              type="checkbox"
              className="sr-only"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                darkMode ? 'translate-x-6' : ''
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default MainPage;
