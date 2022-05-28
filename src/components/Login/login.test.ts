import puppeteer, { Browser, Page } from "puppeteer";
import { HEIGHT, OWN_ADDRESS, WIDTH } from "../../constants";

describe('login', () => {
    let browser: Browser;
    let page: Page;
    
    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
        await page.goto(OWN_ADDRESS + '/login');
    });
    
    it('validation works', async () => {
        await page.type('#email', 'emailWithoutAt.com');

        const emailHelperErrorBgColor = await page
            .$eval('#email-helper-text',
                e => getComputedStyle(e)
                    .getPropertyValue('background-color'));
        const emailHelperErrorText = await page.$eval('#email-helper-text',
            e => e.textContent);
        const loginButtonWithIncorrectEmail = await page.$eval('#login-register-button',
            e => e.getAttribute('disabled'));

        expect(emailHelperErrorBgColor).toBe('rgb(130, 86, 86)');
        expect(emailHelperErrorText).toBe('Incorrect email');
        expect(loginButtonWithIncorrectEmail !== null).toBeTruthy();

        await page.type('#password', '1234567');

        const passwordHelperErrorBgColor = await page
            .$eval('#password-helper-text',
                (e) => getComputedStyle(e)
                    .getPropertyValue('background-color'));
        const passwordHelperErrorText = await page.$eval('#password-helper-text',
            (e) => e.textContent);
        const loginButtonWithIncorrectPass = await page.$eval('#login-register-button',
            (e) => e.getAttribute('disabled'));

        expect(passwordHelperErrorBgColor).toBe('rgb(130, 86, 86)');
        expect(passwordHelperErrorText).toBe('Minimum 8 characters');
        expect(loginButtonWithIncorrectPass !== null).toBeTruthy();
    });

    it('login and logout work', async () => {
        await page.type('#email', 'emailWithAt@mail.com');
        await page.type('#password', '12345678');
        await page.click('#login-register-button');

        await page.waitForSelector('#button-logout');
        const logoutText = await page
            .$eval('#button-logout', e => e.textContent);

        expect(logoutText).toBe('Logout');

        await page.click('#button-logout');
        await page.waitForSelector('#button-login');
        const loginText = await page
            .$eval('#button-login', e => e.textContent);
        
        expect(loginText).toBe('Login');
    });

    afterEach(() => browser.close());
});
