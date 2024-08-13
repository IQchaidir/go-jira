import { Building, Clipboard } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { workspace } from "@/types/workspace.type"
import { board } from "@/types/board.type"
import { loadWorkspaceById } from "@/utils/storage"
import { filterBoardByWorkspace } from "@/utils/filter"
import { CreateBoardDialog } from "./components/CreateBoardDialog"
import { editWorkspace } from "@/utils/workspace"
import { toast } from "@/components/ui/use-toast"
import { DeleteWorkspaceDialog } from "@/components/DeleteWorkspaceDialog"

const WorkSpacePage = () => {
    const { workspaceId } = useParams()
    const [boards, setBoards] = useState<board[]>([])
    const [workspace, setWorkspace] = useState<workspace>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    function fetchBoardFromLocal() {
        setBoards(filterBoardByWorkspace(Number(workspaceId)))
    }

    useEffect(() => {
        if (workspaceId) {
            const currentWorkspace = loadWorkspaceById(Number(workspaceId))
            setWorkspace(currentWorkspace)
            if (currentWorkspace) setTitle(currentWorkspace.title)
        }
        fetchBoardFromLocal()
    }, [workspaceId])

    function handleConfirm(e: React.FormEvent) {
        e.preventDefault()
        if (workspace) {
            if (title.trim() === "" || title.trim() === workspace.title) {
                return setTitle(workspace.title)
            }
            editWorkspace(workspace.id, title.trim())
            setWorkspace(loadWorkspaceById(workspace.id))
            setIsEdit(false)
            toast({
                title: "Success edit workspace!",
            })
            navigate(`/workspace/${workspace.id}`)
        }
    }

    return (
        <section className="flex flex-col mt-10 px-7 w-full">
            <div className="flex justify-between items-center text-2xl font-semibold gap-2 ">
                <div className="flex gap-2 items-center">
                    <div className="p-1 bg-purple-500 rounded-md text-white">
                        <Building className="w-8 h-8" />
                    </div>
                    {isEdit ? (
                        <form onSubmit={handleConfirm}>
                            <input
                                className="focus:outline-none"
                                style={{ width: `${title.length + 1}ch` }}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={handleConfirm}
                                autoFocus
                            />
                        </form>
                    ) : (
                        <span onClick={() => setIsEdit(true)}>{title}</span>
                    )}
                </div>
                {workspace && <DeleteWorkspaceDialog id={workspace.id} />}
            </div>
            <hr className="mt-2 mb-5 border" />
            <div className="flex gap-2 text-lg font-semibold px-5">
                <Clipboard />
                <span>Your Board</span>
            </div>
            <div className="grid grid-cols-4 gap-5 px-5 mt-5">
                {boards.map((board) => (
                    <Link key={board.id} to={`/board/${board.id}`}>
                        <div className="flex rounded-md h-32 bg-blue-500 font-semibold cursor-pointer text-white p-2 transition-transform duration-300 transform hover:scale-105">
                            {board.title}
                        </div>
                    </Link>
                ))}
                {workspace && (
                    <CreateBoardDialog
                        fetchBoardFromLocal={fetchBoardFromLocal}
                        workspaceId={workspace?.id}
                    />
                )}
            </div>
        </section>
    )
}

export default WorkSpacePage
