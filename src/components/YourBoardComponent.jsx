import React from 'react';
import { useParams } from 'react-router-dom';

const YourBoardComponent = () => {
  const { board } = useParams();
  console.log('Rendering yourboardcomponent for board:', board);
  // Use the selected board to render your board-specific content
  return (
    <div>
      <h2>Displaying content for {board}</h2>
      {/* Add your board-specific content here */}
    </div>
  );
};