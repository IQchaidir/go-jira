import { LayoutDashboard } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog"
import { useEffect, useState } from "react"
import { workspace } from "@/models/workspace.type"
import { loadWorkspaces } from "@/utils/storage"
import { WorkspaceAccordion } from "./WorkSpaceAccordion"

const Sidebar = () => {
    const [workspaces, setWorkspaces] = useState<workspace[]>([])
    const location = useLocation()

    function fetchWorkspaceFromLocal() {
        setWorkspaces(loadWorkspaces)
    }

    useEffect(() => {
        fetchWorkspaceFromLocal()
    }, [location])

    return (
        <aside className="hidden md:flex flex-col w-1/4 shadow-md pl-7 pr-3 text-lg font-semibold">
            <div className="flex justify-between mt-11">
                <span>Workspaces</span>{" "}
                <CreateWorkspaceDialog fetchWorkspaceFromLocal={fetchWorkspaceFromLocal} />
            </div>
            <Link to={`/`}>
                <div className="flex gap-2 items-center cursor-pointer mt-2 mb-2">
                    <div className="p-1 bg-blue-500 rounded-md text-white">
                        <LayoutDashboard />
                    </div>
                    <span>Dashboard</span>
                </div>
            </Link>
            {workspaces.map((workspace) => (
                <WorkspaceAccordion key={workspace.id} workspace={workspace} />
            ))}
        </aside>
    )
}

export default Sidebar
