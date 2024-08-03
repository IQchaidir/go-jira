import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Card = ({ card, list }: { card: card; list: list }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: card.id,
        data: {
            type: "card",
            card,
            list,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <>
            {!isDragging && (
                <div
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className="bg-white p-1 rounded-md font-semibold"
                >
                    {card.title}
                </div>
            )}
        </>
    )
}

export default Card
