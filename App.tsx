import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import AppRoutes from './Routes';


function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
