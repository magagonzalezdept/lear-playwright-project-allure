import {test, expect} from '@playwright/test'
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';

test('should be able to register to our application using MODELS', async({page}) => {
    const user = new User()
    const signupPage = new SignupPage();
    await signupPage.load(page);
    await signupPage.signup(page,user);
    const todoPage = new TodoPage();
    const welcomeMessage = await todoPage.getWelcomeMessageElement(page);
    expect(welcomeMessage).toBeVisible;
})

/* test('should be able to register to our application', async({page}) => {
    await page.goto('/signup');
    //await page.type('[data-testid=first-name]', 'QAcart'); old way to do it - deprecated
    await page.fill('[data-testid=first-name]', faker.person.firstName());
    await page.fill('[data-testid=last-name]', faker.person.lastName());
    await page.fill('[data-testid=email]', faker.internet.email());
    await page.fill('[data-testid=password]', 'Test.123');
    await page.fill('[data-testid=confirm-password]', 'Test.123');
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=welcome]');
    await expect(welcomeMessage).toBeVisible;
}) */