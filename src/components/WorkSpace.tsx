import { Building, User } from "lucide-react"
import CreateBoardDialog from "./CreateBoardDialog"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { workspace } from "@/types/workspace.type"
import { board } from "@/types/board.type"
import { defaultBoards, loadWorkspaceById, saveBoard } from "@/utils/storage"
import { filterBoardByWokrspace } from "@/utils/filter"

const WorkSpace = () => {
    const { workspaceId } = useParams()
    const [boards, setBoards] = useState<board[]>([])
    const [workspace, setWorkspace] = useState<workspace>()

    useEffect(() => {
        if (workspaceId) {
            const currentWorkspace = loadWorkspaceById(Number(workspaceId))
            setWorkspace(currentWorkspace)
        }

        let boardsToSave = defaultBoards
        const localBoards = localStorage.getItem("boards")
        if (localBoards) {
            boardsToSave = JSON.parse(localBoards)
        }
        saveBoard(boardsToSave)
        setBoards(filterBoardByWokrspace(Number(workspaceId)))
    }, [workspaceId])

    return (
        <section className="flex flex-col mt-10 px-10 w-full">
            <div className="flex items-center text-2xl font-semibold gap-2 ">
                <div className="p-1 bg-purple-500 rounded-md text-white">
                    <Building className="w-8 h-8" />
                </div>
                <span>{workspace?.title}</span>
            </div>
            <hr className="mt-3 mb-5 border" />
            <div className="flex gap-2 text-lg font-semibold px-5">
                <User />
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
                <CreateBoardDialog />
            </div>
        </section>
    )
}

export default WorkSpace
