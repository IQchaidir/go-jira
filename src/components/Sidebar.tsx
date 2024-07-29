import { Building } from "lucide-react"
import { Link } from "react-router-dom"
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog"
import { useEffect, useState } from "react"
import { workspace } from "@/types/workspace.type"
import { defaultWorkspaces, loadWorkspaces, saveWorkspace } from "@/utils/storage"

const Sidebar = () => {
    const [workspaces, setWorkspaces] = useState<workspace[]>([])

    useEffect(() => {
        let workspacesToSave = defaultWorkspaces

        const localWorkspaces = localStorage.getItem("workspaces")
        if (localWorkspaces) {
            workspacesToSave = JSON.parse(localWorkspaces)
        }

        saveWorkspace(workspacesToSave)
        setWorkspaces(loadWorkspaces())
    }, [])

    return (
        <div className="hidden md:flex flex-col gap-2 w-1/5 shadow-md px-3 text-lg font-semibold">
            <div className="flex justify-between mt-10">
                <span>Workspace</span> <CreateWorkspaceDialog />
            </div>
            {workspaces.map((workspace) => (
                <Link key={workspace.id} to={`workspace/${workspace.id}`}>
                    <div className="flex gap-2 items-center cursor-pointer">
                        <div className="p-1 bg-purple-500 rounded-md text-white">
                            <Building />
                        </div>
                        <span>{workspace.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Sidebar
