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

const CreateListDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex rounded-md p-2 h-10  items-center bg-gray-100 cursor-pointer gap-2">
                    <Plus className="w-5 h-5" />
                    <span>Add a list</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create List</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        placeholder="List title...."
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

export default CreateListDialog
