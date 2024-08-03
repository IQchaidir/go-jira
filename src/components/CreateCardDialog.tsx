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

const CreateCardDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-2 items-center text-gray-500 cursor-pointer mt-5">
                    <Plus className="w-5 h-5" />
                    Add a card
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Card</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        placeholder="Card title...."
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

export default CreateCardDialog
