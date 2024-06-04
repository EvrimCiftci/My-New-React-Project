// StepTracker.jsx
import React from 'react';

const StepTracker = ({ currentStep }) => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']; // Update this based on the actual steps

  return (
    <div className="mb-4">
      <ul className="flex justify-around">
        {steps.map((step, index) => (
          <li key={index} className={currentStep === index ? 'font-bold text-purple-400' : ''}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepTracker;
