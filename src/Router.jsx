import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Main_Blog_page from "./components/Main_Blog_page";
import SignUp from "./components/SignUp ";
import Blog from "./components/Blog";
import LogInpage from "./components/LogInpage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Blog",
      element: <Main_Blog_page />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LogInpage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
