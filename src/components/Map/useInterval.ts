import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | undefined) => {
  const savedCallback = useRef(callback);
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startInterval = () => {
    savedCallback.current();
    if (delay !== null) {
        // return () => clearInterval(id);
      }
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
