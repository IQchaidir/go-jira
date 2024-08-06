import { card } from "@/types/card.type"

const DetailCard = ({
    card,
    workspaceTitle,
    boardTitle,
    listTitle,
}: {
    card: card
    workspaceTitle: string | ""
    boardTitle: string | ""
    listTitle: string | ""
}) => {
    return (
        <div className="flex justify-between items-center bg-gray-100 rounded-md p-2">
            <div className="text-base font-semibold flex-1">{card.title}</div>
            <div className="flex flex-col text-xs gap-2  flex-1">
                <span className="font-semibold">Created at</span>
                <span>{new Date(card.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1 ">
                <span className="font-semibold">Workspace</span>
                <span>{workspaceTitle}</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1 ">
                <span className="font-semibold">Board</span>
                <span>{boardTitle}</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1">
                <span className="font-semibold">List</span>
                <span>{listTitle}</span>
            </div>
        </div>
    )
}

export default DetailCard
