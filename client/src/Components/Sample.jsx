import React, { useEffect } from 'react'

export default function Sample() {

    useEffect(() => {
        console.log("mounted");

        // Cleanup function
        return () => {
            console.log("cleanup");
        };
    }, []);
  return (
    <div>
      
    </div>
  )
}
