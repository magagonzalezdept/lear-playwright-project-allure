import { test, expect } from '@playwright/test'
import User from '../models/User';
import TodoApi from '../api/TodoApi';
import TodoPage from '../pages/TodoPage';
import SignupPage from '../pages/SignupPage';
import NewTodoPage from '../pages/NewTodoPage';

test('should be able to add a new todo using MODELS and Page Object', async ({ page, request, context }) => {
    //user model
    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.signupUsingApi(request, user, context);
    //await page.pause(); forma de debug.
    const newTodoPage = new NewTodoPage();
    await newTodoPage.load(page);
    await newTodoPage.addTodo(page, 'Learn Playwright');
    const todoPage = new TodoPage();
    const todoItem = await todoPage.getTodoItem(page);
    expect(await todoItem.innerText()).toEqual('Learn Playwright');
});

test('should be able to delete a todo with API class and MODELS', async ({ page, request, context }) => {
    //user model
    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.signupUsingApi(request, user, context);
    //create new task using API
    const newTodoPage = new NewTodoPage();
    await newTodoPage.addTodoUsingApi(request, user);
    const todoPage = new TodoPage();
    await todoPage.load(page);
    await todoPage.deleteTodo(page);
    const noTodosMessage = await todoPage.getNotTodosElement(page);
    await expect(noTodosMessage).toBeVisible();
    //expect(await noTodosMessage.innerText()).toEqual('No Available Todos');
});

/* test('should be able to add a new todo with API', async ({ page, request, context }) => {
    //register using API
    const response = await request.post('/api/v1/users/register', {
        data: {
            email: faker.internet.email(),
            password: "Test.123",
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        }
    })
    //extract user data from reponse body
    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;
    console.log(access_token, firstName, userID);
    //work/set cookies
    await context.addCookies([
        {
            name: 'access_token',
            value: access_token,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'firstName',
            value: firstName,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'userID',
            value: userID,
            url: 'https://todo.qacart.com'
        }
    ]);

    //await page.pause(); forma de debug.
    await page.goto('/todo/new');
    await page.fill('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');
    const toDoItem = page.locator('[data-testid=todo-text]');
    expect(await toDoItem.innerText()).toEqual('Learn Playwright');
});

test('should be able to delete a todo with API', async ({ page, request, context }) => {
    //register using API
    const response = await request.post('/api/v1/users/register', {
        data: {
            email: faker.internet.email(),
            password: "Test.123",
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        }
    })
    //extract user data from reponse body
    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;
    console.log(access_token, firstName, userID);
    //work/set cookies
    await context.addCookies([
        {
            name: 'access_token',
            value: access_token,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'firstName',
            value: firstName,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'userID',
            value: userID,
            url: 'https://todo.qacart.com'
        }
    ]);
    //create new task using API
    const newTask = await request.post('/api/v1/tasks', {
        data: {
            item: "Learn Playwright",
            isCompleted: false
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    //extract new task data from reponse body
    const newTaskBody = await newTask.json();
    const isCompleted = newTaskBody.isCompleted;
    const item = newTaskBody.item;
    console.log(isCompleted, item);
    await page.goto('/todo');
    await page.click('[data-testid=delete]');
    const noTodosMessage = page.locator('[data-testid=no-todos]');
    expect(await noTodosMessage.innerText()).toEqual('No Available Todos');
});

test('should be able to add a new todo with UI steps', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('[data-testid=first-name]', faker.person.firstName());
    await page.fill('[data-testid=last-name]', faker.person.lastName());
    await page.fill('[data-testid=email]', faker.internet.email());
    await page.fill('[data-testid=password]', 'Test.123');
    await page.fill('[data-testid=confirm-password]', 'Test.123');
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=welcome]');
    expect(welcomeMessage).toBeVisible;
    await page.click('[data-testid=add]');
    await page.fill('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');
    const toDoItem = page.locator('[data-testid=todo-text]');
    expect(await toDoItem.innerText()).toEqual('Learn Playwright');
});

test('should be able to delete a todo with UI steps', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('[data-testid=first-name]', faker.person.firstName());
    await page.fill('[data-testid=last-name]', faker.person.lastName());
    await page.fill('[data-testid=email]', faker.internet.email());
    await page.fill('[data-testid=password]', 'Test.123');
    await page.fill('[data-testid=confirm-password]', 'Test.123');
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=welcome]');
    expect(welcomeMessage).toBeVisible;
    await page.click('[data-testid=add]');
    await page.fill('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');
    const toDoItem = page.locator('[data-testid=todo-text]');
    expect(await toDoItem.innerText()).toEqual('Learn Playwright');
    await page.click('[data-testid=delete]');
    const noTodosMessage = page.locator('[data-testid=no-todos]');
    expect(await noTodosMessage.innerText()).toEqual('No Available Todos');
}); */