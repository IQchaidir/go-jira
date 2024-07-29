import { Building, Ellipsis } from "lucide-react"
import CreateListDialog from "./CreateListDialog"
import CreateCardDialog from "./CreateCardDialog"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { board } from "@/types/board.type"
import { card } from "@/types/card.type"

const Board = () => {
    const { boardId } = useParams()
    const [boards, setBoards] = useState<board[]>([
        {
            id: 1,
            workspaceId: 1,
            title: "Task App",
        },
        {
            id: 2,
            workspaceId: 1,
            title: "Web App",
        },
    ])
    const [cards, setCards] = useState<card[]>([
        {
            id: 1,
            boardId: 1,
            title: "homepage",
        },
        {
            id: 2,
            boardId: 1,
            title: "interactive",
        },
    ])
    const [board, setBoard] = useState<board>()

    useEffect(() => {
        if (boardId) {
            const currentBoard = boards?.find((board) => {
                return board.id === Number(boardId)
            })
            setBoard(currentBoard)
        }
    }, [boardId])

    return (
        <div className="flex flex-col mt-10 px-10 w-full">
            <div className="flex items-center text-2xl font-semibold gap-2 ">
                <div className="p-1 bg-purple-500 rounded-md text-white">
                    <Building className="w-8 h-8" />
                </div>
                <span>Lorem inc.</span> - <span>{board?.title}</span>
            </div>
            <hr className="mt-3 mb-5 border" />
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col rounded-md py-1 px-2 bg-gray-100 gap-2 font-semibold">
                    <div className="flex justify-between">
                        <span>To Do</span> <Ellipsis />
                    </div>
                    {cards.map((card) => (
                        <>
                            <div key={card.id} className="p-1 bg-white rounded-md cursor-pointer">
                                {card.title}
                            </div>
                        </>
                    ))}

                    <CreateCardDialog />
                </div>
                <CreateListDialog />
            </div>
        </div>
    )
}

export default Board
