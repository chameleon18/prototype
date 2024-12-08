import React from 'react';
import { RingLoader } from 'react-spinners';

const RingLoaderComponent = ({ loading, size = 60, color = "#3498db" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RingLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default RingLoaderComponent;
