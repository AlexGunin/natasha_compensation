import { RouterProvider } from "@tanstack/react-router";

import { router } from "./routes.tsx";

import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "./App.css";


export const App = () => {
  return <RouterProvider router={router}/>
};
