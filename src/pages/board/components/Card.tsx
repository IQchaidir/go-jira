import { card } from "@/types/card.type"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Card = ({ card }: { card: card }) => {
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

    return (
        <div className="relative flex flex-col gap-2">
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-white p-1 rounded-md font-semibold"
            >
                {card.title}
            </div>
            {isDragging && <div className="absolute inset-0 rounded-md bg-white"></div>}
        </div>
    )
}

export default Card
