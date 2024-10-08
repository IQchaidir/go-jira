import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { workspace } from "@/models/workspace.type"
import { Activity, Building, Clipboard } from "lucide-react"
import { Link } from "react-router-dom"

export function WorkspaceAccordion({ workspace }: { workspace: workspace }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex gap-2 items-center cursor-pointer justify-between">
                        <div className="p-1 bg-purple-500 rounded-md text-white">
                            <Building />
                        </div>
                        <span>{workspace.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <Link to={`workspace/${workspace.id}`}>
                        <div className="flex gap-1 items-center cursor-pointer ml-4 mb-3">
                            <div className="p-1 rounded-md text-gray-500">
                                <Clipboard className="w-5 h-5" />
                            </div>
                            <span className="text-base">Board</span>
                        </div>
                    </Link>
                    <Link to={`activities/${workspace.id}`}>
                        <div className="flex gap-1 items-center cursor-pointer ml-4">
                            <div className="p-1 rounded-md text-gray-500">
                                <Activity className="w-5 h-5" />
                            </div>
                            <span className="text-base">Activity</span>
                        </div>
                    </Link>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
