import { activity } from "@/types/activity.type"
import { Activity as IconActivity } from "lucide-react"

const Activity = ({ activity }: { activity: activity }) => {
    return (
        <div className="flex gap-2 items-center mb-3">
            <div className="p-1 rounded-md text-gray-500">
                <IconActivity className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl">{activity.title}</span>
                <span className="text-lg">{activity.createdAt.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default Activity
