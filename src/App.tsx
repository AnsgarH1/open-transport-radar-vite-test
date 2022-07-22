import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './Routes';
import { theme } from './styles/theme';


function App() {


 
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
