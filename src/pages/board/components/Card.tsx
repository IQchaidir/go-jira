import { card } from "@/types/card.type"
import { editCard } from "@/utils/cards"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { DeleteCardDialog } from "./DeleteCardDIalog"
import { toast } from "@/components/ui/use-toast"

const Card = ({ card, fetchDataFromLocal }: { card: card; fetchDataFromLocal: () => void }) => {
    const [title, setTitle] = useState(card.title)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `card-${card.id}`,
        data: {
            type: "card",
            card,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    function handleConfirm(e: React.FormEvent) {
        e.preventDefault()
        if (title.trim() === "" || title.trim() === card.title) {
            return setTitle(card.title)
        }
        editCard(card.id, title, card.listId)
        setIsEdit(false)
        fetchDataFromLocal()
        toast({
            title: "Success edit card!",
        })
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative flex w-full bg-white rounded-md items-center "
        >
            <div onClick={() => setIsEdit(true)} className=" p-1 font-semibold">
                {isEdit ? (
                    <form onSubmit={handleConfirm}>
                        <input
                            className="focus:outline-none"
                            style={{ width: `${title.length + 1}ch` }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleConfirm}
                            autoFocus
                        />
                    </form>
                ) : (
                    <>{card.title}</>
                )}
            </div>
            <div {...attributes} {...listeners} className="h-full flex-1"></div>
            <DeleteCardDialog id={card.id} fetchDataFromLocal={fetchDataFromLocal} />
            {isDragging && <div className="absolute inset-0 bg-white rounded-md"></div>}
        </div>
    )
}

export default Card
