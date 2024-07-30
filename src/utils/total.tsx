import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { workspace } from "@/types/workspace.type"

type Item = workspace | card | board

export function total(array: Item[]) {
    return array.reduce((total) => total + 1, 0)
}
