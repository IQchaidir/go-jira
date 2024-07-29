import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export function CreateWorkspaceDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Plus className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        placeholder="Workspace title...."
                        className="w-full border border-black rounded-md p-1 "
                    />
                </div>
                <DialogFooter>
                    <Button type="submit">Create!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
