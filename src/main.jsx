import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "@/views/sample/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "@/views/sample/contact";
import EditContact, { action as editAction } from "@/views/sample/edit";
import { action as destroyAction } from "@/views/sample/destroy";
import Index from "@/views/sample/index";
import ErrorPage from "@/views/sample/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/views/sample" replace />,
  },
  {
    path: "/views/sample",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/views/sample/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "/views/sample/contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "/views/sample/contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
