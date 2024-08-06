import { activity } from "@/types/activity.type"
import { loadActivities, saveActivity } from "./storage"

export function createActivity(
    workspaceId: number | null,
    action: string,
    itemType: string,
    itemTitle: string
) {
    const activities = loadActivities()
    const id = activities.length ? activities[activities.length - 1].id + 1 : 1
    const newActivity: activity = {
        id,
        workspaceId: workspaceId,
        title: `${action} ${itemType} "${itemTitle}"`,
        createdAt: new Date(),
    }
    const updateActivities = [...activities, newActivity]
    saveActivity(updateActivities)
    console.log(loadActivities())
}

export function deleteActivity(workspaceId: number) {
    const activities = loadActivities()
    const updateActivities = activities.filter((activity: activity) => activity.workspaceId !== workspaceId)
    saveActivity(updateActivities)
}
