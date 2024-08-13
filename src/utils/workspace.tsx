import { workspace } from "@/models/workspace.type"
import { loadWorkspaces, saveWorkspace } from "./storage"
import { deleteBoardByWorkspaceId } from "./boards"
import { createActivity, deleteActivity } from "./activity"

export function createWorkspace(title: string) {
    const workspaces = loadWorkspaces()
    const id = workspaces.length ? workspaces[workspaces.length - 1].id + 1 : 1
    const newWorkspace = {
        id,
        title,
        createdAt: new Date(),
    }

    const updateWorkspaces = [...workspaces, newWorkspace]
    saveWorkspace(updateWorkspaces)

    createActivity(newWorkspace.id, "Create", "workspace", title)

    return newWorkspace
}

export function editWorkspace(id: number, title: string) {
    const workspaces = loadWorkspaces()

    const editWorkspace = {
        id,
        title,
    }

    const updateWorkspaces = workspaces.map((workspace: workspace) => {
        if (workspace.id === id) {
            return editWorkspace
        } else return workspace
    })

    saveWorkspace(updateWorkspaces)

    createActivity(id, "Edit Title", "workspace", title)
}

export function deleteWorkspace(id: number) {
    const workspaces = loadWorkspaces()
    const updateWorkspaces = workspaces.filter((workspace: workspace) => workspace.id !== id)
    deleteBoardByWorkspaceId(id)
    deleteActivity(id)
    saveWorkspace(updateWorkspaces)
}
