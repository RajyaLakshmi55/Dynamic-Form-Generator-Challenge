import { useState } from 'react';

const useFormSchema = (initialSchema: any) => {
  const [schema, setSchema] = useState(initialSchema);

  const updateSchema = (newSchema: any) => {
    try {
      setSchema(newSchema);
    } catch (error) {
      console.error('Invalid schema update:', error);
    }
  };

  return { schema, updateSchema };
};

export default useFormSchema;
