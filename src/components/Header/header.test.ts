import puppeteer, { Browser, Page } from "puppeteer";
import { HEIGHT, OWN_ADDRESS, TEST_ADMIN, TEST_ADMIN_PASS, WIDTH } from "../../constants";

describe('header', () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {
                width: WIDTH,
                height: HEIGHT,
            }
        });
        page = await browser.newPage();
        await page.goto(OWN_ADDRESS);
    });

    it('header is rendered', async () => {
        const text = await page
            .$eval('#header-title', e => e.textContent);

        expect(text).toBe('Restaurants');
    });

    it('login button do redirect', async () => {
        const text = await page
            .$eval('#button-login', e => e.textContent);

        expect(text).toBe('Login');

        await page.click('#button-login');
        await page.waitForSelector('#login-register-button');
        const loginRegisterText = await page
            .$eval('#login-register-button', e => e.textContent);

        expect(loginRegisterText).toBe('LOG IN / REGISTER');
    });

    it('hamburger button opens about', async () => {
        await page.waitForSelector('#hamburger-menu');
        await page.click('#hamburger-menu');
        await page.waitForSelector('#menu-item-about');

        const button = await page.$('#menu-item-about');
        const text = await button?.evaluate( e => e.textContent);

        expect(text).toBe('About Site');

        await button?.evaluate(e => (e as HTMLInputElement).click());
        await page.waitForSelector('#title-about');
        const textAbout = await page
            .$eval('#title-about', e => e.textContent);

        expect(textAbout).toBe('About');
    });

    it('hamburger button opens dashboard', async () => {
        await page.goto(OWN_ADDRESS + '/login');
        await page.type('#email', TEST_ADMIN);
        await page.type('#password', TEST_ADMIN_PASS);
        await page.click('#login-register-button');

        await page.waitForSelector('#button-logout');
        await page.waitForSelector('#hamburger-menu');
        await page.click('#hamburger-menu');
        await page.waitForSelector('#menu-item-dashboard');

        const button = await page.$('#menu-item-dashboard');
        const text = await button?.evaluate( e => e.textContent);

        expect(text).toBe('Admin Dashboard');
        
        await button?.evaluate(e => (e as HTMLInputElement).click());
        await page.waitForSelector('#title-restaurant');
        const textRestaurant = await page
            .$eval('#title-restaurant', e => e.textContent);
        
        expect(textRestaurant).toBe('Restaurant');
    });

    afterEach(() => browser.close());
});
