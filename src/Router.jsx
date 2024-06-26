import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import App from "./App";
import LoginPage from "./components/LoginPage";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";

const Router = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/blog/new",
      element: <CreateBlog />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog/:blogId",
      element: <Blog />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Router;
