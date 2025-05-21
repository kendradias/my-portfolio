"use client";

import React from 'react';

export default function Portfolio() {
  const [loaded, setLoaded] = React.useState(false);
  
  // Super simple: just change state on mount
  React.useEffect(() => {
    console.log("Component mounted!");
    setLoaded(true);
  }, []);
  
  // Super simple UI
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <p>JavaScript status: {loaded ? 'WORKING!' : 'Not working yet...'}</p>
      {loaded && (
        <div style={{ padding: '20px', background: 'green', color: 'white' }}>
          JavaScript is working correctly! You can now deploy your full site.
        </div>
      )}
    </div>
  );
}