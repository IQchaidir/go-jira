import { activity } from "@/types/activity.type"
import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { workspace } from "@/types/workspace.type"

export function cardDetails(workspaces: workspace[], boards: board[], lists: list[], card: card) {
    const list = lists.find((list) => {
        return card.listId === list.id
    })
    const board = boards.find((board) => {
        return list?.boardId === board.id
    })
    const workspace = workspaces.find((workspace) => {
        return board?.workspaceId === workspace.id
    })

    return {
        listTitle: list?.title,
        boardTitle: board?.title,
        workspaceTitle: workspace?.title,
    }
}

export function activityDetails(activity: activity, workspaces: workspace[]) {
    const workspace = workspaces.find((workspace) => {
        return workspace.id === activity.workSpaceId
    })

    return {
        workspaceTitle: workspace?.title,
    }
}
