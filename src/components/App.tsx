import React from 'react';
import GradientProgressBar from './GradientProgressBar';

function App() {
  return (
    <div className="App">
      <h1>hi</h1>
      <GradientProgressBar 
        initialValue={50}
        min={0}
        max={100}
        step={5}
        disabled={false}
        loading={false}
        colors={{
          colors: ['#ff0000', '#00ff00', '#0000ff'],
          angle: 45
        }}
        formatValue={(value) => `${value} points`}
        onChange={(value) => console.log(`New value: ${value}`)}
      />
    </div>
  );
}

export default App;
