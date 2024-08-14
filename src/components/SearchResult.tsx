import { card } from "@/models/card.type"
import DetailCard from "./DetailCard"
import { Link } from "react-router-dom"
import { workspace } from "@/models/workspace.type"
import { board } from "@/models/board.type"
import { list } from "@/models/list.type"
import { cardDetails } from "@/utils/cards"

const SearchResult = ({
    workspaces,
    boards,
    lists,
    filterCards,
}: {
    workspaces: workspace[]
    boards: board[]
    lists: list[]
    filterCards: card[]
}) => {
    return (
        <div className="flex flex-col gap-3 mb-5">
            {filterCards.length === 0 ? (
                <p>No Result</p>
            ) : (
                filterCards.map((card) => {
                    const { workspace, board, listTitle } = cardDetails(workspaces, boards, lists, card)
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
    )
}

export default SearchResult
