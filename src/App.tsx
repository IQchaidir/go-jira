import { Route, Routes } from "react-router-dom"
import BaseLayout from "./components/BaseLayout"
import Dashboard from "./components/Dashboard"
import WorkSpace from "./components/WorkSpace"
import Board from "./components/Board"
import ActivityPage from "./components/ActivityPage"

function App() {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="workspace/:workspaceId" element={<WorkSpace />} />
                <Route path="activities/:workspaceId" element={<ActivityPage />} />
                <Route path="board/:boardId" element={<Board />} />
                <Route path="*" element={<div>not found</div>} />
            </Route>
        </Routes>
    )
}

export default App
