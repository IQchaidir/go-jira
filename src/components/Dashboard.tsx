import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { workspace } from "@/types/workspace.type"
import {
    defaultBoards,
    defaultCards,
    defaultLists,
    loadBoards,
    loadCards,
    loadLists,
    loadWorkspaces,
    saveBoard,
    saveCard,
    saveLists,
} from "@/utils/storage"
import { total } from "@/utils/total"
import { Building, Clipboard, ListCheck } from "lucide-react"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [workspaces, setWorkspaces] = useState<workspace[]>([])
    const [boards, setBoards] = useState<board[]>([])
    const [cards, setCards] = useState<card[]>([])
    const [lists, setLists] = useState<list[]>([])

    useEffect(() => {
        setWorkspaces(loadWorkspaces())

        let boardsToSave = defaultBoards
        const localBoards = localStorage.getItem("boards")
        if (localBoards) {
            boardsToSave = JSON.parse(localBoards)
        }
        saveBoard(boardsToSave)
        setBoards(loadBoards())

        let cardsToSave = defaultCards
        const localCards = localStorage.getItem("cards")
        if (localCards) {
            cardsToSave = JSON.parse(localCards)
        }
        saveCard(cardsToSave)
        setCards(loadCards())

        let listsToSave = defaultLists
        const localLists = localStorage.getItem("lists")
        if (localLists) {
            listsToSave = JSON.parse(localLists)
        }
        saveLists(listsToSave)
        setLists(loadLists())
    }, [])

    const items = [
        {
            name: "Workspaces",
            total: total(workspaces),
            logo: <Building className="w-10 h-10 text-white" />,
        },
        {
            name: "Boards",
            total: total(boards),
            logo: <Clipboard className="w-10 h-10 text-white" />,
        },
        {
            name: "Cards",
            total: total(cards),
            logo: <ListCheck className="w-10 h-10 text-white" />,
        },
    ]

    return (
        <section className="flex flex-col mt-10 px-10 w-full">
            <div className="text-2xl font-semibold gap-2 ">
                <span>Welcome Back!</span>
            </div>
            <hr className="mt-3 mb-5 border" />
            <div className="flex gap-2">
                <div className="flex flex-col w-2/3">
                    <div className="grid grid-cols-3 gap-3">
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center px-3 p-2 bg-blue-500 justify-between rounded-md"
                            >
                                <div className="flex flex-col text-white">
                                    <span className="text-3xl font-semibold">{item.total}</span>
                                    <span className="text-xs">Total {item.name}</span>
                                </div>
                                {item.logo}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col mt-8">
                        <h3 className="text-base font-semibold mb-5">Recent Tasks</h3>
                        <div className="flex justify-between items-center bg-gray-100 rounded-md p-2">
                            <div className="text-base flex-1">Title Task</div>
                            <div className="flex flex-col text-xs gap-2  flex-1">
                                <span className="">Created at</span>
                                <span className="">18/07/2024</span>
                            </div>
                            <div className="flex flex-col text-xs gap-2 flex-1 ">
                                <span className="">Workspace</span>
                                <span className="">Lorem inc.</span>
                            </div>
                            <div className="flex flex-col text-xs gap-2 flex-1 ">
                                <span className="">Board</span>
                                <span className="">Task App</span>
                            </div>
                            <div className="flex flex-col text-xs gap-2 flex-1">
                                <span className="">List</span>
                                <span className="">To Do</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3">list recent board</div>
            </div>
        </section>
    )
}

export default Dashboard
