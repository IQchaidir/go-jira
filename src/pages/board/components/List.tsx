import { card } from "@/models/card.type"
import { list } from "@/models/list.type"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import Card from "./Card"
import { DeleteListDialog } from "./DeleteListDialog"
import { CreateCardDialog } from "./CreateCardDialog"
import { editList } from "@/utils/lists"
import { toast } from "@/components/ui/use-toast"

const List = ({
    list,
    cards,
    fetchDataFromLocal,
}: {
    list: list
    cards: card[]
    fetchDataFromLocal: () => void
}) => {
    const [title, setTitle] = useState(list.title)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `list-${list.id}`,
        data: {
            type: "list",
            list,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    function handleConfirm(e: React.FormEvent) {
        e.preventDefault()
        if (title.trim() === "" || title.trim() === list.title) {
            return setTitle(list.title)
        }
        editList(list.id, title.trim(), list.boardId)
        setIsEdit(false)
        fetchDataFromLocal()
        toast({
            title: "Success edit list!",
        })
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative flex flex-col rounded-md py-1 px-2 h-[400px] bg-gray-100 gap-2 font-semibold"
        >
            <div className="flex justify-between items-center">
                {isEdit ? (
                    <form onSubmit={handleConfirm}>
                        <input
                            className="text-lg bg-gray-100 focus:outline-none"
                            style={{ width: `${title.length + 1}ch` }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleConfirm}
                            autoFocus
                        />
                    </form>
                ) : (
                    <span onClick={() => setIsEdit(true)} className="text-lg">
                        {title}
                    </span>
                )}
                <div {...attributes} {...listeners} className="flex-1 h-full cursor-pointer "></div>
                <div className="flex gap-2">
                    <DeleteListDialog id={list.id} fetchDataFromLocal={fetchDataFromLocal} />
                </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 overflow-auto">
                <SortableContext items={cards.map((card) => `card-${card.id}`)}>
                    {cards.map((card) => (
                        <Card key={`card-${card.id}`} card={card} fetchDataFromLocal={fetchDataFromLocal} />
                    ))}
                </SortableContext>
            </div>
            <CreateCardDialog listId={list.id} fetchDataFromLocal={fetchDataFromLocal} />
            {isDragging && <div className="absolute inset-0 bg-white"></div>}
        </div>
    )
}

export default List
