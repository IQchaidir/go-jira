import { card } from "@/types/card.type"
import DetailCard from "./DetailCard"
import { Link } from "react-router-dom"
import { cardDetails } from "@/utils/getDetail"
import { total } from "@/utils/total"
import { workspace } from "@/types/workspace.type"
import { board } from "@/types/board.type"
import { list } from "@/types/list.type"

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
