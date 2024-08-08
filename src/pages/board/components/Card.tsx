import { card } from "@/types/card.type"
import { editCard } from "@/utils/cards"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { DeleteCardDialog } from "./DeleteCardDIalog"
import { toast } from "@/components/ui/use-toast"

const Card = ({ card, renderPage }: { card: card; renderPage: () => void }) => {
    const [title, setTitle] = useState(card.title)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: card.id,
        data: {
            type: "card",
            card,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    function handleClick() {
        setIsEdit(true)
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleConfirm()
        }
    }

    function handleConfirm() {
        if (title.trim() === "" || title.trim() === card.title) {
            return setTitle(card.title)
        }
        editCard(card.id, title, card.listId)
        setIsEdit(false)
        renderPage()
        toast({
            title: "Success edit card!",
        })
    }

    if (isDragging)
        return (
            <div ref={setNodeRef} style={style} className=" flex w-full bg-white rounded-md">
                <div className=" p-1 font-semibold text-white">{card.title}</div>
                <div {...attributes} {...listeners} className="h-full flex-1"></div>
            </div>
        )

    return (
        <div ref={setNodeRef} style={style} className=" flex w-full bg-white rounded-md items-center">
            <div onClick={handleClick} className=" p-1 font-semibold">
                {isEdit ? (
                    <input
                        className="  focus:outline-none"
                        style={{ width: `${title.length + 1}ch` }}
                        type="text"
                        value={title}
                        onChange={handleOnChange}
                        onBlur={handleConfirm}
                        onKeyDown={handleOnKeyDown}
                        autoFocus
                    />
                ) : (
                    <>{card.title}</>
                )}
            </div>
            <div {...attributes} {...listeners} className="h-full flex-1"></div>
            <DeleteCardDialog id={card.id} renderPage={renderPage} />
        </div>
    )
}

export default Card
