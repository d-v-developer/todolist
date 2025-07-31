import type {TasksState} from '../App'
import {CreateTodoListAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

type DeleteTask = {
    type: 'delete_task',
    payload: {
        todolistId: string
        taskId: string
    }
}

type CreateTask = {
    type: 'create_task',
    payload: {
        todolistId: string
        title: string
    }
}

type ChangeTaskStatus = {
    type: 'change_task_status'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

type ChangeTaskTitle = {
    type: 'change_task_title'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

type Actions = CreateTodoListAction | DeleteTodolistAction | DeleteTask | CreateTask | ChangeTaskStatus | ChangeTaskTitle

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }
        case "create_task": {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }
        case "change_task_status": {
            const {todolistId, taskId, isDone} = action.payload
            return {...state, [todolistId]: state[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)}
        }
        case 'change_task_title': {
            const {todolistId, taskId, title} = action.payload
            return {...state, [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title} : task)}
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}): DeleteTask => {
    const {todolistId, taskId} = payload
    return {type: 'delete_task', payload: {todolistId, taskId}} as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}): CreateTask => {
    const {todolistId, title} = payload
    return {type: 'create_task', payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}): ChangeTaskStatus => {
    const {todolistId, taskId, isDone} = payload
    return {type: 'change_task_status', payload: {todolistId, taskId, isDone}} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}):ChangeTaskTitle  => {
    const {todolistId, taskId, title} = payload
    return  {type: 'change_task_title', payload: {todolistId, taskId, title}} as const
}

