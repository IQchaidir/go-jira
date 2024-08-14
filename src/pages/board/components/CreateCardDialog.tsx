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
import { FormValues, schema } from "@/lib/validation"
import { createCard } from "@/utils/cards"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export function CreateCardDialog({
    fetchDataFromLocal,
    listId,
}: {
    fetchDataFromLocal: () => void
    listId: number
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })
    const [open, setOpen] = useState<boolean>(false)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        createCard(data.title.trim(), listId)
        fetchDataFromLocal()
        setOpen(false)
        toast({
            title: "Success create card!",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex gap-2 items-center text-gray-500 bg-gray-100 cursor-pointer text-lg">
                    <Plus className="w-7 h-7" />
                    Add a card
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Card</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Card title...."
                        className="w-full border border-black rounded-md p-1 "
                        {...register("title")}
                    />
                    <div className="h-6">
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant={"destructive"} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                            Create!
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
