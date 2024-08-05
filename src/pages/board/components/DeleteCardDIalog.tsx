import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteCard } from "@/utils/cards"
import { TrashIcon } from "lucide-react"
import { useState } from "react"

export function DeleteCardDialog({ id, renderPage }: { id: number; renderPage: () => void }) {
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        deleteCard(id)
        renderPage()
        setOpen(false)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <TrashIcon className="text-red-500 cursor-pointer w-5 h-5" />
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
