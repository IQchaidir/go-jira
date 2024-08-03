import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const CreateBoardDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex rounded-md h-32 bg-gray-100 items-center justify-center font-semibold transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                    Create New Board
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Board</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        placeholder="Board title...."
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

export default CreateBoardDialog
