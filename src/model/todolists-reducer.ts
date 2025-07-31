import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAction = {
    type: 'delete_todolist',
    payload: {
        id: string
    }
}

export type CreateTodoListAction = {
    type: 'create_todolist',
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistTitleAction = {
    type: 'change_todolist_title',
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterAction = {
    type: 'change_todolist_filter'
    payload: {
        id: string
        filter: FilterValues
    }
}

type Actions = DeleteTodolistAction | CreateTodoListAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const {id, title} = action.payload
            const newTodolist: Todolist = {id, title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload
            return state.map(todolist => todolist.id === id ? {...todolist, title} : todolist)
        }
        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            return state.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)
        }
        default:
            return state
    }
}

export const deleteTodoListAC = (id: string): DeleteTodolistAction => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string): CreateTodoListAction => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }): ChangeTodolistTitleAction => {
    const {id, title} = payload;
    return {type: 'change_todolist_title', payload: {id, title}} as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }): ChangeTodolistFilterAction => {
    const {id, filter} = payload;
    return {type: 'change_todolist_filter', payload: {id, filter}} as const
}


// export type DeleteTodoListAction = ReturnType<typeof deleteTodoListAC>
// export type CreateTodoListAction = ReturnType<typeof createTodolistAC>