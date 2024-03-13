import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../api/TodoApi";

export default class NewTodoPage {

    async load(page: Page) {
        await page.goto('/todo/new')
    }

    private get getNewTodoInput(){
        return `[data-testid=new-todo]`
    }

    private get getNewTodoSubmit(){
        return `[data-testid=submit-newTask]`
    }

    async addTodo(page: Page, task: string){
        await page.fill(this.getNewTodoInput, task);
        await page.click(this.getNewTodoSubmit);
    }

    async addTodoUsingApi(request: APIRequestContext, user: User){
        await new TodoApi().addTodo(request, user);
    }

}