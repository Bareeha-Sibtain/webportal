// Spinner.js
import React from 'react';
import loader from '../assets/image/loader.svg'

const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <img width={100} height={100} alt="Loading..." src={loader} />
      </div>
    );
};

export default Spinner;
