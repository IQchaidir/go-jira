import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { workspace } from "@/models/workspace.type"
import { loadWorkspaces } from "@/utils/storage"
import { LayoutDashboard, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog"
import { Link, useLocation } from "react-router-dom"
import { WorkspaceAccordion } from "./WorkSpaceAccordion"

const SheetMenu = () => {
    const [workspaces, setWorkspaces] = useState<workspace[]>([])
    const location = useLocation()

    function fetchWorkspaceFromLocal() {
        setWorkspaces(loadWorkspaces)
    }

    useEffect(() => {
        setWorkspaces(loadWorkspaces())
    }, [location])
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="flex md:hidden" />
            </SheetTrigger>
            <SheetTitle></SheetTitle>
            <SheetContent className="w-2/4" side={"left"}>
                <div className="flex flex-col text-lg font-semibold justify-between mt-20 gap-2">
                    <div className="flex justify-between">
                        <span>Workspaces</span>{" "}
                        <CreateWorkspaceDialog fetchWorkspaceFromLocal={fetchWorkspaceFromLocal} />
                    </div>
                    <SheetClose asChild>
                        <Link to={`/`}>
                            <div className="flex gap-2 items-center cursor-pointer mt-2 mb-2">
                                <div className="p-1 bg-blue-500 rounded-md text-white">
                                    <LayoutDashboard />
                                </div>
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    </SheetClose>
                    {workspaces.map((workspace) => (
                        <SheetClose asChild key={workspace.id}>
                            <WorkspaceAccordion workspace={workspace} />
                        </SheetClose>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SheetMenu
