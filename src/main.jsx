import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import client from "./apollo/apollo";

import RepositoryList from "./components/Repository/RepositoryList.jsx";
import Followers from "./components/Followers/Followers";
import Following from "./components/Following/Following";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RepositoryList />,
  },
  {
    path: "/following",
    element: <Following />,
  },
  {
    path: "/followers",
    element: <Followers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
