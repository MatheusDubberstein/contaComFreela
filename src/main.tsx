import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "@fontsource-variable/open-sans/wdth-italic.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Profile from "./routes/Profile";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Welcome from "./routes/Welcome";
import { getAuth } from "firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import CreateJob from "./routes/CreateJob";

import { initializeApp } from "firebase/app";
import FindJob from "./routes/FindJob";
import { ProtectedRoute } from "./routes/protectedRoute";

const firebaseConfig = {
  apiKey: "AIzaSyAPjGHD-Zd6ZiEQkgO3wVQ9dsuLTIGaIvM",
  authDomain: "contabilidade-3ee61.firebaseapp.com",
  projectId: "contabilidade-3ee61",
  storageBucket: "contabilidade-3ee61.appspot.com",
  messagingSenderId: "180115271899",
  appId: "1:180115271899:web:80e779c1f9c2172d0b9cfe",
  measurementId: "G-CJQTQ5RR82",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "encontrar-freela",
        element: <FindJob />,
      },
      {
        path: "logar",
        element: <SignIn />,
      },
      {
        path: "criar-conta",
        element: <SignUp />,
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "criar-freela",
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
