import { activity } from "@/types/activity.type"
import { Activity as IconActivity } from "lucide-react"

const Activity = ({ activity, workspaceTitle }: { activity: activity; workspaceTitle: string }) => {
    return (
        <div className="flex gap-1 items-center mb-3">
            <div className="p-1 rounded-md text-gray-500">
                <IconActivity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm">
                    {activity.title} {workspaceTitle && <> - {workspaceTitle}</>}
                </span>
                <span className="text-xs">Nov 6,2023 at 12:12 AM</span>
            </div>
        </div>
    )
}

export default Activity
