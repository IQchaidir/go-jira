import { Building } from "lucide-react"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import type { board } from "@/types/board.type"
import { loadBoardById, loadCards, loadWorkspaceById, saveCard, saveLists } from "@/utils/storage"
import { filterlistByBoard, getCardsByListId } from "@/utils/filter"
import { workspace } from "@/types/workspace.type"
import { list } from "@/types/list.type"
import List from "./components/List"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { card } from "@/types/card.type"
import { DeleteBoardDialog } from "./components/DeleteBoardDialog"
import { CreateListDialog } from "./components/CreateListDialog"
import { editBoard } from "@/utils/boards"
import { toast } from "@/components/ui/use-toast"
import Card from "./components/Card"
import { createPortal } from "react-dom"

const BoardPage = () => {
    const { boardId } = useParams()
    const [workspace, setWorkspace] = useState<workspace>()
    const [board, setBoard] = useState<board>()
    const [lists, setLists] = useState<list[]>([])
    const [cards, setCards] = useState<card[]>([])
    const [activeList, setActiveList] = useState<list | null>(null)
    const [activeCard, setActiveCard] = useState<card | null>(null)
    const [title, setTitle] = useState("")
    const [isEdit, setIsEdit] = useState<boolean>(false)

    function fetchDataFromLocal() {
        setBoard(loadBoardById(Number(boardId)))
        setLists(filterlistByBoard(Number(boardId)))
        setCards(loadCards())
    }

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "list") {
            setActiveList(event.active.data.current.list)
            setActiveCard(null)
        }
        if (event.active.data.current?.type === "card") {
            setActiveCard(event.active.data.current.card)
            setActiveList(null)
        }
        return
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (activeId.startsWith("list-") && overId.startsWith("list-")) {
            setLists((lists) => {
                const activeListIndex = lists.findIndex((list) => `list-${list.id}` === activeId)
                const overListIndex = lists.findIndex((list) => `list-${list.id}` === overId)
                const newList = arrayMove(lists, activeListIndex, overListIndex)
                if (JSON.stringify(lists) !== JSON.stringify(newList)) {
                    saveLists(newList)
                    toast({
                        title: "Rearrange lists!",
                    })
                    return newList
                }
                return lists
            })
        }

        if (activeId.startsWith("card-") && overId.startsWith("card-")) {
            const activeCardListId = cards.find((card) => `card-${card.id}` === activeId)?.listId
            const overCardListId = cards.find((card) => `card-${card.id}` === overId)?.listId

            if (activeCardListId && overCardListId && activeCardListId === overCardListId) {
                setCards((cards) => {
                    const activeCardIndex = cards.findIndex((card) => `card-${card.id}` === activeId)
                    const overCardIndex = cards.findIndex((card) => `card-${card.id}` === overId)
                    const newCards = arrayMove(cards, activeCardIndex, overCardIndex)
                    if (JSON.stringify(cards) !== JSON.stringify(newCards)) {
                        saveCard(newCards)
                        toast({
                            title: "Rearrange cards!",
                        })
                        return newCards
                    }
                    return cards
                })
            }
        }
        if (activeId.startsWith("card-") && overId.startsWith("list-")) {
            const activeCardId = Number(activeId.replace("card-", ""))
            const overListId = Number(overId.replace("list-", ""))

            setCards((cards) => {
                const updatedCards = cards.map((card) =>
                    card.id === activeCardId ? { ...card, listId: overListId } : card
                )

                if (JSON.stringify(cards) !== JSON.stringify(updatedCards)) {
                    saveCard(updatedCards)
                    toast({
                        title: "Moved card to another list!",
                    })
                    return updatedCards
                }
                return cards
            })
        }
    }

    useEffect(() => {
        fetchDataFromLocal()
        const currentBoard = loadBoardById(Number(boardId))
        setTitle(currentBoard.title)
        const currentWorkspace = loadWorkspaceById(Number(currentBoard.workspaceId))
        setWorkspace(currentWorkspace)
    }, [])

    function handleConfirm(e: React.FormEvent) {
        e.preventDefault()

        if (board && workspace) {
            if (title.trim() === "" || title.trim() === board.title) {
                return setTitle(board.title)
            }
            editBoard(board.id, title, workspace.id)
            setIsEdit(false)
            toast({
                title: "Success edit board!",
            })
        }
    }

    return (
        <section className="flex flex-col mt-10 px-7 w-full">
            <div className="flex items-center text-2xl font-semibold justify-between">
                <div className="flex gap-2">
                    <div className="p-1 bg-purple-500 rounded-md text-white">
                        <Building className="w-8 h-8" />
                    </div>
                    <span>{workspace?.title}</span> -
                    {isEdit ? (
                        <form onSubmit={handleConfirm}>
                            <input
                                className="flex focus:outline-none"
                                style={{ width: `${title.length + 1}ch` }}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={handleConfirm}
                                autoFocus
                            />
                        </form>
                    ) : (
                        <span onClick={() => setIsEdit(true)}>{title}</span>
                    )}
                </div>
                {board && workspace && <DeleteBoardDialog id={board.id} workspaceId={workspace.id} />}
            </div>
            <hr className="mt-3 mb-5 border" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid  md:grid-cols-4 gap-4 ">
                    <SortableContext items={lists.map((list) => `list-${list.id}`)}>
                        {board &&
                            lists.map((list) => (
                                <List
                                    key={`list-${list.id}`}
                                    list={list}
                                    cards={getCardsByListId(list.id, cards)}
                                    fetchDataFromLocal={fetchDataFromLocal}
                                />
                            ))}
                    </SortableContext>
                    {board && <CreateListDialog boardId={board.id} onCreate={fetchDataFromLocal} />}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeList && !activeCard && (
                            <List
                                cards={getCardsByListId(activeList.id, cards)}
                                list={activeList}
                                fetchDataFromLocal={fetchDataFromLocal}
                            />
                        )}
                        {!activeList && activeCard && (
                            <Card card={activeCard} fetchDataFromLocal={fetchDataFromLocal} />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </section>
    )
}

export default BoardPage
