import { card } from "@/models/card.type"

export function searchCard(cards: card[], query: string) {
    const searchCard = cards.filter((card) =>
        card.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    return searchCard
}
