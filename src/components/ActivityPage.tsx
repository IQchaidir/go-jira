import { activity } from "@/types/activity.type"
import { workspace } from "@/types/workspace.type"
import { filterActivityByWorkspace } from "@/utils/filter"
import { loadWorkspaceById } from "@/utils/storage"
import { Building } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Activity from "./Activity"

const ActivityPage = () => {
    const { workspaceId } = useParams()
    const [activities, setActivities] = useState<activity[]>([])
    const [workspace, setWorkspace] = useState<workspace>()

    useEffect(() => {
        if (workspaceId) {
            const currentWorkspace = loadWorkspaceById(Number(workspaceId))
            setWorkspace(currentWorkspace)
            setActivities(filterActivityByWorkspace(Number(workspaceId)))
        }
    }, [workspaceId])

    return (
        <section className="flex flex-col mt-10 px-10 w-full">
            <div className="flex items-center text-2xl font-semibold gap-2 ">
                <div className="p-1 bg-purple-500 rounded-md text-white">
                    <Building className="w-8 h-8" />
                </div>
                <span>{workspace?.title}</span>
            </div>
            <hr className="mt-3 mb-5 border" />
            {activities.map((activity) => (
                <Activity key={activity.id} activity={activity} workspaceTitle={workspace?.title || ""} />
            ))}
        </section>
    )
}

export default ActivityPage
