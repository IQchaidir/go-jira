import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import Card from "./Card"
import { createPortal } from "react-dom"
import { saveCard } from "@/utils/storage"
import { EditlistDialog } from "./EditListDialog"
import { DeleteListDialog } from "./DeleteListDialog"
import { CreateCardDialog } from "./CreateCardDialog"

const List = ({
    list,
    cards,
    setCards,
    renderPage,
}: {
    list: list
    cards: card[]
    setCards: React.Dispatch<React.SetStateAction<card[]>>
    renderPage: () => void
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
            className="relative flex flex-col rounded-md py-1 px-2 h-[400px] bg-gray-100 gap-2 font-semibold overflow-auto"
        >
            <div className="flex justify-between cursor-pointer items-center">
                <span {...attributes} {...listeners} className="flex-1">
                    {list.title}
                </span>
                {!isDragging && (
                    <div className="flex gap-2">
                        <EditlistDialog
                            id={list.id}
                            boardId={list.boardId}
                            currentTitle={list.title}
                            onEdit={renderPage}
                        />
                        <DeleteListDialog id={list.id} renderPage={renderPage} />
                    </div>
                )}
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
            <CreateCardDialog listId={list.id} onCreate={renderPage} />

            {isDragging && <div className="absolute inset-0 bg-white"></div>}
        </div>
    )
}

export default List
