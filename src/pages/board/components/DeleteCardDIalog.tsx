import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { deleteCard } from "@/utils/cards"
import { TrashIcon } from "lucide-react"
import { useState } from "react"

export function DeleteCardDialog({ id, fetchDataFromLocal }: { id: number; fetchDataFromLocal: () => void }) {
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        deleteCard(id)
        fetchDataFromLocal()
        setOpen(false)
        toast({
            title: "Success delete card!",
        })
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <TrashIcon className="text-red-500 cursor-pointer w-5 h-5 pr-1" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure delete this card?</DialogTitle>
                </DialogHeader>
                <div></div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Delete!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
