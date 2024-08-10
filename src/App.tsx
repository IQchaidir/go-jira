import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import BaseLayout from "./components/BaseLayout"
import Dashboard from "./components/Dashboard"
import BoardPage from "./pages/board/BoardPage"
import ActivityPage from "./pages/activity/ActivityPage"
import WorkSpacePage from "./pages/workspace/WorkSpacePage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "workspace/:workspaceId",
                element: <WorkSpacePage />,
            },
            {
                path: "activities/:workspaceId",
                element: <ActivityPage />,
            },
            {
                path: "board/:boardId",
                element: <BoardPage />,
            },
            {
                path: "*",
                element: <div>Page Not Found</div>,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
