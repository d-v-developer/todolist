import {Todolist} from "../App.tsx";

type DeleteTodoListActionType = {
    type: "DELETE_TODOLIST"
    payload: {
        id: string
    }
}

const todolistsReducer = (todolists: Todolist[], action: DeleteTodoListActionType): Todolist[] => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return todolists.filter(todolist => todolist.id !== action.payload.id)
        default:
            return todolists;
    }
}