import CreateCardDialog from "@/components/CreateCardDialog"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { filterCardByList } from "@/utils/filter"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { Ellipsis } from "lucide-react"
import { useEffect, useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import Card from "./Card"
import { createPortal } from "react-dom"

const List = ({ list }: { list: list }) => {
    const [cards, setCards] = useState<card[]>([])
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

    useEffect(() => {
        if (list) {
            setCards(filterCardByList(list.id))
        }
    }, [])

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
        const activeListId = active.data.current?.list.id
        const overListId = over.data.current?.list.id

        if (activeListId !== overListId) {
            console.log(`Card moved from list ${activeListId} to list ${overListId}`)
        }

        setCards((cards) => {
            const activeCardIndex = cards.findIndex((card) => card.id === activeId)
            const overCardIndex = cards.findIndex((card) => card.id === overId)

            return arrayMove(cards, activeCardIndex, overCardIndex)
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
                    {cards.map((card) => (
                        <Card key={card.id} card={card} list={list} />
                    ))}
                </SortableContext>
                {createPortal(
                    <DragOverlay>{activeCard && <Card card={activeCard} list={list} />}</DragOverlay>,
                    document.body
                )}
            </DndContext>
            <CreateCardDialog />

            {isDragging && <div className="absolute inset-0 bg-white"></div>}
        </div>
    )
}

export default List
