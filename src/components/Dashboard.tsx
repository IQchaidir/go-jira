import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { workspace } from "@/types/workspace.type"
import { cardDetails } from "@/utils/getDetail"
import { loadBoards, loadCards, loadLists, loadWorkspaces } from "@/utils/storage"
import { total } from "@/utils/total"
import { Building, Clipboard, ListCheck } from "lucide-react"
import { useEffect, useState } from "react"
import DetailCard from "./DetailCard"
import { Link, useLocation, useNavigation } from "react-router-dom"
import { searchCard } from "@/utils/search"
import SearchResult from "./SearchResult"

const Dashboard = () => {
    const [workspaces, setWorkspaces] = useState<workspace[]>([])
    const [boards, setBoards] = useState<board[]>([])
    const [cards, setCards] = useState<card[]>([])
    const [lists, setLists] = useState<list[]>([])
    const [filterCards, setFilterCards] = useState<card[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const location = useLocation()
    const navigation = useNavigation()

    useEffect(() => {
        setWorkspaces(loadWorkspaces())
        setBoards(loadBoards())
        setCards(loadCards())
        setLists(loadLists())

        const params = new URLSearchParams(location.search)
        const query = params.get("search") || ""
        setSearchQuery(query)
        setFilterCards(searchCard(cards, query))
    }, [location.search, navigation.state])

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

    if (searchQuery)
        return (
            <SearchResult boards={boards} filterCards={filterCards} lists={lists} workspaces={workspaces} />
        )

    return (
        <section className="flex flex-col  mt-10 px-3 md:px-7 w-full">
            <h1 className="text-2xl font-semibold gap-2 ">Welcome Back!</h1>
            <hr className="mt-2 mb-5 border" />
            <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col w-full md:w-2/3">
                    <section className="grid grid-cols-3 gap-3">
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
                    </section>
                    <section className="flex flex-col mt-3">
                        <div className="text-base font-semibold mb-2">Recent Cards</div>
                        <div className="flex flex-col gap-3 mb-5">
                            {cards.length === 0 ? (
                                <p>No card have been created yet.</p>
                            ) : (
                                cards
                                    .sort((a, b) => b.id - a.id)
                                    .slice(0, 10)
                                    .map((card) => {
                                        const { workspace, board, listTitle } = cardDetails(
                                            workspaces,
                                            boards,
                                            lists,
                                            card
                                        )
                                        return (
                                            <Link key={card.id} to={`board/${board?.id}`}>
                                                <DetailCard
                                                    card={card}
                                                    workspaceTitle={workspace?.title || ""}
                                                    boardTitle={board?.title || ""}
                                                    listTitle={listTitle || ""}
                                                />
                                            </Link>
                                        )
                                    })
                            )}
                        </div>
                    </section>
                </div>
                <div className="flex flex-col w-full md:w-1/3 bg-gray-100 rounded-md p-2">
                    <div className="text-base font-semibold mb-2 ">Recent Boards</div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
