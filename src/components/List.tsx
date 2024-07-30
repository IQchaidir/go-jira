import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { filterCardByList } from "@/utils/filter"
import { Ellipsis } from "lucide-react"
import { useEffect, useState } from "react"
import CreateCardDialog from "./CreateCardDialog"

const List = ({ list }: { list: list }) => {
    const [cards, setCards] = useState<card[]>([])

    useEffect(() => {
        if (list) {
            setCards(filterCardByList(list.id))
        }
    }, [])

    return (
        <div className="flex flex-col rounded-md py-1 px-2 bg-gray-100 gap-2 font-semibold">
            <div className="flex justify-between">
                <span>{list.title}</span> <Ellipsis />
            </div>
            {cards.map((card) => (
                <div key={card.id} className="p-1 bg-white rounded-md cursor-pointer">
                    {card.title}
                </div>
            ))}

            <CreateCardDialog />
        </div>
    )
}

export default List
