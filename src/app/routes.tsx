import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SummaryPage from "../pages/SummaryPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/summary", element: <SummaryPage /> },
]);
