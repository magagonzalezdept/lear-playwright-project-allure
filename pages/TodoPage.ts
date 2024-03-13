import { Page } from "@playwright/test";
import User from "../models/User";

export default class TodoPage {

    private get welcomeMessage() {
        return `[data-testid=welcome]`;
    }

    async load(page: Page) {
        await page.goto('/todo')
    }

    private get deleteIcon() {
        return `[data-testid=delete]`;
    }

    private get notTodosMessage() {
        return `[data-testid=no-todos]`;
    }

    private get todoItem() {
        return `[data-testid=todo-text]`;
    }

    async deleteTodo(page: Page) {
        await page.click(this.deleteIcon);
    }

    async getWelcomeMessageElement(page: Page) {
        return page.locator(this.welcomeMessage);
    }

    async getNotTodosElement(page: Page) {
        return page.locator(this.notTodosMessage);
    }

    async getTodoItem(page: Page){
        return page.locator(this.todoItem);
    }


}