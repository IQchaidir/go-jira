import { board } from "@/models/board.type"
import { card } from "@/models/card.type"
import { workspace } from "@/models/workspace.type"

type Item = workspace | card | board

export function total(array: Item[]) {
    return array.reduce((total) => total + 1, 0)
}
