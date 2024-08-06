import { Building } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { board } from "@/types/board.type"
import { loadBoardById, loadCards, loadWorkspaceById, saveLists } from "@/utils/storage"
import { filterlistByBoard, getCardsByListId } from "@/utils/filter"
import { workspace } from "@/types/workspace.type"
import { list } from "@/types/list.type"
import List from "./components/List"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import { card } from "@/types/card.type"
import { DeleteBoardDialog } from "./components/DeleteBoardDialog"
import { CreateListDialog } from "./components/CreateListDialog"
import { editBoard } from "@/utils/boards"
import { toast } from "@/components/ui/use-toast"

const BoardPage = () => {
    const { boardId } = useParams()
    const [workspace, setWorkspace] = useState<workspace>()
    const [board, setBoard] = useState<board>()
    const [lists, setLists] = useState<list[]>([])
    const [cards, setCards] = useState<card[]>([])
    const [activeList, setActiveList] = useState<list | null>(null)
    const [title, setTitle] = useState("")
    const [isEdit, setIsEdit] = useState<boolean>(false)

    function renderPage() {
        if (board) setBoard(loadBoardById(board.id))
        if (lists && board) setLists(filterlistByBoard(board.id))
        if (cards) setCards(loadCards)
    }

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "list") {
            setActiveList(event.active.data.current.list)
        }
        return
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) {
            return
        }
        const activeId = active.id
        const overId = over.id

        setLists((lists) => {
            const activeListIndex = lists.findIndex((list) => list.id === activeId)
            const overListIndex = lists.findIndex((list) => list.id === overId)
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

    useEffect(() => {
        if (boardId) {
            const currentBoard = loadBoardById(Number(boardId))
            setBoard(currentBoard)
            setTitle(currentBoard.title)

            const currentWorkspace = loadWorkspaceById(Number(currentBoard.workspaceId))
            setWorkspace(currentWorkspace)
            setLists(filterlistByBoard(Number(boardId)))
            setCards(loadCards())
        }
    }, [boardId])

    function handleClick() {
        setIsEdit(true)
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleConfirm()
        }
    }

    function handleConfirm() {
        if (board && workspace) {
            if (title === "") {
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
                        <input
                            className="flex h-full  focus:outline-none"
                            type="text"
                            value={title}
                            onChange={handleOnChange}
                            onBlur={handleConfirm}
                            onKeyDown={handleOnKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span onClick={handleClick}>{title}</span>
                    )}
                </div>
                {board && workspace && <DeleteBoardDialog id={board.id} workspaceId={workspace.id} />}
            </div>
            <hr className="mt-3 mb-5 border" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid  md:grid-cols-4 gap-4 ">
                    <SortableContext items={lists.map((list) => list.id)}>
                        {board &&
                            lists.map((list) => (
                                <List
                                    key={list.id}
                                    list={list}
                                    cards={getCardsByListId(list.id, cards)}
                                    setCards={setCards}
                                    renderPage={renderPage}
                                />
                            ))}
                    </SortableContext>
                    {board && <CreateListDialog boardId={board.id} onCreate={renderPage} />}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeList && board && (
                            <List
                                list={activeList}
                                cards={getCardsByListId(activeList.id, cards)}
                                setCards={setCards}
                                renderPage={renderPage}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </section>
    )
}

export default BoardPage
