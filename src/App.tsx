import './App.css'
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routes.tsx";
import {createTheme, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {CartProvider} from "./cart-context.tsx";


const theme = createTheme({});

export const App = () => {

  return (
      <MantineProvider theme={theme}>
          <CartProvider>
              <RouterProvider router={router} />
          </CartProvider>
      </MantineProvider>
  )
}
