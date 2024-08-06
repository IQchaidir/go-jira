import { card } from "@/types/card.type"

export function searchCard(cards: card[], query: string) {
    const searchCard = cards.filter((card) => card.title.toLocaleLowerCase().includes(query))
    return searchCard
}
