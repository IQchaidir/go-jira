import { card } from "@/models/card.type"
import DetailCard from "./DetailCard"
import { Link } from "react-router-dom"
import { total } from "@/utils/total"
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
        <section className="flex flex-col  mt-10 px-3 md:px-7 w-full">
            <h1 className="text-2xl font-semibold gap-2 ">Search result ({total(filterCards)})</h1>
            <hr className="mt-3 mb-5 border" />
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
        </section>
    )
}

export default SearchResult
