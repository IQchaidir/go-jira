import Activity from "@/pages/activity/components/Activity"
import { activity } from "@/models/activity.type"
import { workspace } from "@/models/workspace.type"
import { filterActivityByWorkspace } from "@/utils/filter"
import { loadActivities, loadWorkspaceById } from "@/utils/storage"
import { Building } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ActivityPage = () => {
    const { workspaceId } = useParams()
    const [activities, setActivities] = useState<activity[]>([])
    const [workspace, setWorkspace] = useState<workspace>()

    useEffect(() => {
        setActivities(loadActivities())
        if (workspaceId) {
            const currentWorkspace = loadWorkspaceById(Number(workspaceId))
            setWorkspace(currentWorkspace)
            setActivities(filterActivityByWorkspace(Number(workspaceId)))
        }
    }, [workspaceId])

    return (
        <section className="flex flex-col mt-10 px-7 w-full">
            <div className="flex items-center text-2xl font-semibold gap-2 ">
                <div className="p-1 bg-purple-500 rounded-md text-white">
                    <Building className="w-8 h-8" />
                </div>
                <span>{workspace?.title}</span> - Activity
            </div>
            <hr className="mt-2 mb-5 border" />
            {activities
                .sort((a, b) => b.id - a.id)
                .map((activity) => (
                    <Activity key={activity.id} activity={activity} />
                ))}
        </section>
    )
}

export default ActivityPage
