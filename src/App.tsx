import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context';
import { router } from './route';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </NextThemesProvider>
      </NextUIProvider>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
