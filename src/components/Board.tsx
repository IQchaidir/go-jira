import { Building, Ellipsis, Plus } from "lucide-react"
import CreateListDialog from "./CreateListDialog"
import CreateCardDialog from "./CreateCardDialog"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { defaultCards, loadBoardById, loadWorkspaceById, saveCard } from "@/utils/storage"
import { filterCardByList, filterlistByBoard } from "@/utils/filter"
import { workspace } from "@/types/workspace.type"
import { list } from "@/types/list.type"
import List from "./List"

const Board = () => {
    const { boardId } = useParams()
    const [workspace, setWorkspace] = useState<workspace>()
    const [cards, setCards] = useState<card[]>([])
    const [board, setBoard] = useState<board>()
    const [lists, setLists] = useState<list[]>([])

    useEffect(() => {
        if (boardId) {
            const currentBoard = loadBoardById(Number(boardId))
            setBoard(currentBoard)

            const currentWorkspace = loadWorkspaceById(Number(currentBoard.workspaceId))
            setWorkspace(currentWorkspace)
            setLists(filterlistByBoard(Number(boardId)))
        }
    }, [boardId])

    return (
        <section className="flex flex-col mt-10 px-10 w-full">
            <div className="flex items-center text-2xl font-semibold gap-2 ">
                <div className="p-1 bg-purple-500 rounded-md text-white">
                    <Building className="w-8 h-8" />
                </div>
                <span>{workspace?.title}</span> - <span>{board?.title}</span>
            </div>
            <hr className="mt-3 mb-5 border" />
            <div className="grid grid-cols-4 gap-4 items-start">
                {lists.map((list) => (
                    <List key={list.id} list={list} />
                ))}
                <CreateListDialog />
            </div>
        </section>
    )
}

export default Board
