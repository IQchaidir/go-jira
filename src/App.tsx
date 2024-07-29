import { Route, Routes } from "react-router-dom"
import BaseLayout from "./components/BaseLayout"
import Dashboard from "./components/Dashboard"
import WorkSpace from "./components/WorkSpace"
import Board from "./components/Board"

function App() {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="workspace/:workspaceId" element={<WorkSpace />} />
                <Route path="board/:boardId" element={<Board />} />
                <Route path="*" element={<div>not found</div>} />
            </Route>
        </Routes>
    )
}

export default App
