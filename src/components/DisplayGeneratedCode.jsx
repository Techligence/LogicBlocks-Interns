import React from 'react';
import { useSelector } from 'react-redux';

const DisplayGeneratedCode = () => {
  const generatedCode = useSelector((state) => state.generatedCode);

  return (
    <div>
{generatedCode}
    </div>
  );
};

export default DisplayGeneratedCode;
