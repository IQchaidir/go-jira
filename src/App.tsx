import { Route, Routes } from "react-router-dom"
import BaseLayout from "./components/BaseLayout"
import Dashboard from "./components/Dashboard"
import WorkSpace from "./pages/workspace/WorkSpacePage"
import BoardPage from "./pages/board/BoardPage"
import ActivityPage from "./pages/activity/ActivityPage"

function App() {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="workspace/:workspaceId" element={<WorkSpace />} />
                <Route path="activities/:workspaceId" element={<ActivityPage />} />
                <Route path="board/:boardId" element={<BoardPage />} />
                <Route path="*" element={<div>not found</div>} />
            </Route>
        </Routes>
    )
}

export default App
