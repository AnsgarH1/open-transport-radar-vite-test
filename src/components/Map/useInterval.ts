import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | undefined) => {
  const savedCallback = useRef(callback);
  const [id, setID] = useState<NodeJS.Timer>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startInterval = () => {
    savedCallback.current();
    if (delay !== null) {
        let id = setInterval(startInterval, delay);
        // return () => clearInterval(id);
      }
  }

  const clear = () => {
    return () => clearInterval(id);
  }

  // Set up the interval.
//   useEffect(() => {
//     tick();
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);

  return {
    startInterval,
    clearInterval
}

}

export default useInterval
