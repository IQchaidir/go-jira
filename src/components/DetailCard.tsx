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
            <div className="text-base flex-1">{card.title}</div>
            <div className="flex flex-col text-xs gap-2  flex-1">
                <span className="">Created at</span>
                <span className="">18/07/2024</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1 ">
                <span className="">Workspace</span>
                <span className="">{workspaceTitle}</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1 ">
                <span className="">Board</span>
                <span className="">{boardTitle}</span>
            </div>
            <div className="flex flex-col text-xs gap-2 flex-1">
                <span className="">List</span>
                <span className="">{listTitle}</span>
            </div>
        </div>
    )
}

export default DetailCard
