import CreateCardDialog from "@/components/CreateCardDialog"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import Card from "./Card"
import { createPortal } from "react-dom"
import { saveCard } from "@/utils/storage"

const List = ({
    list,
    cards,
    setCards,
}: {
    list: list
    cards: card[]
    setCards: React.Dispatch<React.SetStateAction<card[]>>
}) => {
    const [activeCard, setActiveCard] = useState<card | null>(null)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: list.id,
        data: {
            type: "list",
            list,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "card") {
            setActiveCard(event.active.data.current.card)
        }
        return
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) {
            return
        }
        const activeId = active.id
        const overId = over.id

        setCards((cards) => {
            const activeCardIndex = cards.findIndex((card) => card.id === activeId)
            const overCardIndex = cards.findIndex((card) => card.id === overId)
            const newCard = arrayMove(cards, activeCardIndex, overCardIndex)
            saveCard(newCard)
            return newCard
        })
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative flex flex-col rounded-md py-1 px-2 h-[400px] bg-gray-100 gap-2 font-semibold "
        >
            <div {...attributes} {...listeners} className="flex justify-between cursor-pointer">
                <span>{list.title}</span> <Ellipsis />
            </div>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={cards.map((card) => card.id)}>
                    {!isDragging && cards.map((card) => <Card key={card.id} card={card} />)}
                </SortableContext>
                {createPortal(
                    <DragOverlay>{activeCard && <Card card={activeCard} />}</DragOverlay>,
                    document.body
                )}
            </DndContext>
            <CreateCardDialog />

            {isDragging && <div className="absolute inset-0 bg-white"></div>}
        </div>
    )
}

export default List
