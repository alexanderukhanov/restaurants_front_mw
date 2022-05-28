import puppeteer, { Browser, Page } from "puppeteer";
import axios from "axios";
import {
    HEIGHT,
    WIDTH,
    OWN_ADDRESS,
    TEST_ADMIN,
    TEST_ADMIN_PASS,
} from "../../constants";

const TEST_RESTAURANT_TYPE = 'type';
const TEST_RESTAURANT_NAME = 'name';
const TEST_RESTAURANT_ADDRESS = 'address';
const TEST_DISH0_NAME = 'name0';
const TEST_DISH0_DESCRIPTION = 'description0';
const TEST_DISH0_COST = '5.35';
const TEST_DISH1_NAME = 'name1';
const TEST_DISH1_DESCRIPTION = 'description1';
const TEST_DISH1_COST = '0.25';

describe('dashboard', () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();

        await page.goto(OWN_ADDRESS + '/login');
        await page.type('#email', TEST_ADMIN);
        await page.type('#password', TEST_ADMIN_PASS);
        await page.click('#login-register-button');
        await page.waitForSelector('#button-logout');

        await page.goto(OWN_ADDRESS + '/dashboard');
    });

    it('validation works', async () => {
        await page.click('#button-upload');

        const validityRestaurantName = await page
            .$eval('#restaurant-name', e => (e as HTMLFormElement).checkValidity());
        const validityRestaurantType = await page
            .$eval('#restaurant-type', e => (e as HTMLFormElement).checkValidity());
        const validityRestaurantAddress = await page
            .$eval('#restaurant-address', e => (e as HTMLFormElement).checkValidity());

        await page.waitForSelector('#file-alert');
        expect(validityRestaurantName).toBeFalsy();
        expect(validityRestaurantType).toBeFalsy();
        expect(validityRestaurantAddress).toBeFalsy();

        const validityDishName = await page
            .$eval('#dish-name0', e => (e as HTMLFormElement).checkValidity());
        const validityDishDescription = await page
            .$eval('#dish-description0', e => (e as HTMLFormElement).checkValidity());
        const validityDishCost = await page
            .$eval('#dish-cost0', e => (e as HTMLFormElement).checkValidity());

        await page.waitForSelector('#file-alert0');
        expect(validityDishName).toBeFalsy();
        expect(validityDishDescription).toBeFalsy();
        expect(validityDishCost).toBeFalsy();
    });

    it('delete dish works', async () => {
        await page.click('#button-delete0');
        await page.waitForSelector('#button-delete-accept');
        await page.click('#button-delete-accept');

        let dishName0 = await page.$('#dish-name0');

        expect(dishName0).toBe(null);

        await page.waitForTimeout(200);
        await page.click('#button-add-dish');
        await page.click('#button-add-dish');
        await page.click('#button-add-dish');

        await page.click('#button-delete1');
        await page.waitForSelector('#button-delete-accept');
        await page.click('#button-delete-accept');

        dishName0 = await page.$('#dish-name0');
        const dishName1 = await page.$('#dish-name1');
        const dishName2 = await page.$('#dish-name2');

        expect(dishName0).not.toBe(null);
        expect(dishName1).not.toBe(null);
        expect(dishName2).toBe(null);
    });

    it('add restaurant works', async () => {
        await page.type('#restaurant-type', TEST_RESTAURANT_TYPE);
        await page.type('#restaurant-name', TEST_RESTAURANT_NAME);
        await page.type('#restaurant-address', TEST_RESTAURANT_ADDRESS);
        const inputFileRestaurant = await page.$('#contained-button-file');
        inputFileRestaurant && await inputFileRestaurant
            .uploadFile(`${process.cwd()}/src/assets/for_test/adrien-olichon-ZgREXhl8ER0-unsplash.jpg`);

        await page.type('#dish-name0', TEST_DISH0_NAME);
        await page.type('#dish-description0', TEST_DISH0_DESCRIPTION);
        await page.type('#dish-cost0', TEST_DISH0_COST);
        const inputFileDish0 = await page.$('#contained-button-file0');
        inputFileDish0 && await inputFileDish0
            .uploadFile(`${process.cwd()}/src/assets/for_test/campbell-3ZUsNJhi_Ik-unsplash.jpg`);

        await page.click('#button-add-dish');

        await page.type('#dish-name1', TEST_DISH1_NAME);
        await page.type('#dish-description1', TEST_DISH1_DESCRIPTION);
        await page.type('#dish-cost1', TEST_DISH1_COST);
        const inputFileDish1 = await page.$('#contained-button-file1');
        inputFileDish1 && await inputFileDish1
            .uploadFile(`${process.cwd()}/src/assets/for_test/linus-nylund-JP23z_-dA74-unsplash.jpg`);

        await page.click('#button-upload');

        await page.waitForSelector('#alert-dialog-description');
        const modalText = await page
            .$eval('#alert-dialog-description', e => e.textContent);

        expect(modalText).toBe('Successfully uploaded!');

        await page.click('#button-ok');

        const restaurantName = await page
            .$eval('#restaurant-name', e => (e as HTMLInputElement).value);
        const restaurantType = await page
            .$eval('#restaurant-type', e => (e as HTMLInputElement).value);
        const restaurantAddress = await page
            .$eval('#restaurant-address', e => (e as HTMLInputElement).value);
        const inputFileRestaurantAfterSend = await page
            .$eval('#contained-button-file', e => (e as HTMLInputElement).value);

        expect(restaurantName).toBe('');
        expect(restaurantType).toBe('');
        expect(restaurantAddress).toBe('');
        expect(inputFileRestaurantAfterSend).toBe('');

        const dishName = await page
            .$eval('#dish-name0', e => (e as HTMLInputElement).value);
        const dishDescription = await page
            .$eval('#dish-description0', e => (e as HTMLInputElement).value);
        const dishCost = await page
            .$eval('#dish-cost0', e => (e as HTMLInputElement).value);
        const inputFileDish0AfterSend = await page
            .$eval('#contained-button-file0', e => (e as HTMLInputElement).value);

        expect(dishName).toBe('');
        expect(dishDescription).toBe('');
        expect(dishCost).toBe('');
        expect(inputFileDish0AfterSend).toBe('');
    });

    afterEach(() => browser.close());
});

describe('mainContent', () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
        await page.goto(OWN_ADDRESS);
    });

    it('restaurant card is present and like works', async () => {
        await page.goto(OWN_ADDRESS);

        await page.waitForSelector('#restaurant-name');
        const restaurantName = await page
            .$eval('#restaurant-name', e => e.textContent);
        const restaurantType = await page
            .$eval('#restaurant-type', e => e.textContent);
        const restaurantAddress = await page
            .$eval('#restaurant-address', e => e.textContent);

        const restaurantImage = await page
            .$eval('#image-restaurant', e => e.getAttribute('src'));
        const responseImage = await axios.get(restaurantImage || '');

        expect(responseImage.data).not.toMatch('ENOENT');
        expect(restaurantName).toMatch(TEST_RESTAURANT_NAME);
        expect(restaurantType).toMatch(TEST_RESTAURANT_TYPE);
        expect(restaurantAddress).toMatch(TEST_RESTAURANT_ADDRESS);

        await page.goto(OWN_ADDRESS + '/login');
        await page.type('#email', TEST_ADMIN);
        await page.type('#password', TEST_ADMIN_PASS);
        await page.click('#login-register-button');
        await page.waitForSelector('#button-logout');

        await page.click('#like-restaurant');

        await page.waitForTimeout(200);
        const likeCountFirstClick = await page
            .$eval('#like-restaurant', e => e.textContent);

        expect(likeCountFirstClick).toBe(' 1');

        await page.click('#like-restaurant');

        await page.waitForTimeout(200);
        const likeCountSecondClick = await page
            .$eval('#like-restaurant', e => e.textContent);

        expect(likeCountSecondClick).toBe(' 0');
    });

    it('dishes are present', async () => {
        await page.goto(OWN_ADDRESS);

        await page.waitForSelector('#button-choose-dishes');
        await page.click('#button-choose-dishes');

        await page.waitForSelector('#dish-name0');
        const dishName0 = await page.$eval('#dish-name0', e => e.textContent);
        const dishDescription0 = await page.$eval('#dish-description0', e => e.textContent);
        const dishCost0 = await page.$eval('#dish-cost0', e => e.textContent);
        const dishImage0 = await page
            .$eval('#image-dish0', e => e.getAttribute('src'));
        const responseImage0 = await axios.get(dishImage0 || '');

        expect(responseImage0.data).not.toMatch('ENOENT');
        expect(dishName0).toBe(TEST_DISH0_NAME);
        expect(dishDescription0).toBe(TEST_DISH0_DESCRIPTION);
        expect(
            dishCost0 && Number(dishCost0.replace(/\D/g, '')) / 100
        ).toBe(Number(TEST_DISH0_COST));

        await page.waitForSelector('#dish-name1');
        const dishName1 = await page.$eval('#dish-name1', e => e.textContent);
        const dishDescription1 = await page.$eval('#dish-description1', e => e.textContent);
        const dishCost1 = await page.$eval('#dish-cost1', e => e.textContent);
        const dishImage1 = await page
            .$eval('#image-dish1', e => e.getAttribute('src'));
        const responseImage1 = await axios.get(dishImage1 || '');

        expect(responseImage1.data).not.toMatch('ENOENT');
        expect(dishName1).toBe(TEST_DISH1_NAME);
        expect(dishDescription1).toBe(TEST_DISH1_DESCRIPTION);
        expect(
            dishCost1 && Number(dishCost1.replace(/\D/g, '')) / 100
        ).toBe(Number(TEST_DISH1_COST));
    });

    it('cart works', async () => {
        await page.goto(OWN_ADDRESS);
        await page.waitForSelector('#button-choose-dishes');
        await page.click('#button-choose-dishes');

        await page.waitForSelector('#dish-cost0');
        await page.click('#dish-cost0');

        await page.waitForSelector('#cart-content-amount');
        const cartAmountFirstAdd = await page
            .$eval('#cart-content-amount', e => e.textContent);

        expect(cartAmountFirstAdd).toBe('1');

        await page.click('#dish-cost1');

        await page.waitForSelector('#cart-content-amount');
        const cartAmountSecondAdd = await page
            .$eval('#cart-content-amount', e => e.textContent);

        expect(cartAmountSecondAdd).toBe('2');

        await page.click('#button-open-cart');
        
        await page.waitForSelector('#cart-restaurant-name');
        const cartRestaurantName = await page
            .$eval('#cart-restaurant-name', e => e.textContent);
        const cartDishName0 = await page
            .$eval('#cart-dish-name0', e => e.textContent);
        const cartDishCost0 = await page
            .$eval('#cart-dish-cost0', e => e.textContent);
        const cartDishImage0 = await page
            .$eval('#cart-dish-image0', e => e.getAttribute('src'));
        const responseImage0 = await axios.get(cartDishImage0 || '');

        expect(responseImage0.data).not.toMatch('ENOENT');
        expect(cartRestaurantName).toBe(TEST_RESTAURANT_NAME);
        expect(cartDishName0).toBe(TEST_DISH0_NAME);
        expect(
            cartDishCost0 && Number(cartDishCost0.replace(/\D/g, '')) / 100
        ).toBe(Number(TEST_DISH0_COST));

        const cartDishName1 = await page
            .$eval('#cart-dish-name1', e => e.textContent);
        const cartDishCost1 = await page
            .$eval('#cart-dish-cost1', e => e.textContent);
        const cartDishImage1 = await page
            .$eval('#cart-dish-image1', e => e.getAttribute('src'));
        const responseImage1 = await axios.get(cartDishImage1 || '');

        expect(responseImage1.data).not.toMatch('ENOENT');
        expect(cartDishName1).toBe(TEST_DISH1_NAME);
        expect(
            cartDishCost1 && Number(cartDishCost1.replace(/\D/g, '')) / 100
        ).toBe(Number(TEST_DISH1_COST));

        const cartButtonPlus0 = await page.$('#cart-button-plus0');
        await cartButtonPlus0?.evaluate(e => (e as HTMLInputElement).click());

        await page.waitForSelector('#cart-dish-amount0');
        const amountDishAfterPlus0 = await page
            .$eval('#cart-dish-amount0', e => e.textContent);

        expect(amountDishAfterPlus0).toBe('2');

        // click 2 times because this shit do nothing 1st time
        const cartButtonMinus0 = await page.$('#cart-button-minus0');
        await cartButtonMinus0?.evaluate(e => (e as HTMLInputElement).click());
        await cartButtonMinus0?.evaluate(e => (e as HTMLInputElement).click());

        await page.waitForSelector('#cart-dish-amount0');
        const amountDishAfterMinus0 = await page
            .$eval('#cart-dish-amount0', e => e.textContent);
        const dishNameAfterMinus0 = await page
            .$eval('#cart-dish-name0', e => e.textContent);

        expect(amountDishAfterMinus0).toBe('1');
        expect(dishNameAfterMinus0).not.toBe(TEST_DISH0_NAME);

        const cartTotalCost = await page.$eval('#cart-total-cost', e => e.textContent);

        expect(
            cartTotalCost && Number(cartTotalCost.replace(/\D/g, '')) / 100
        ).toBe(Number('0.25'));
        
        await page.mouse.click(1, 1);
        await page.waitForSelector('#dish-cost0');

        const buttonAddDish0 = await page.$('#dish-cost0');
        await buttonAddDish0?.evaluate(e => (e as HTMLInputElement).click());

        await page.waitForSelector('#cart-content-amount');
        const cartAmountThirdAdd = await page
            .$eval('#cart-content-amount', e => e.textContent);

        expect(cartAmountThirdAdd).toBe('2');

        await page.click('#button-open-cart');

        await page.waitForSelector('#cart-button-plus1');

        const cartButtonPlus1 = await page.$('#cart-button-plus1');
        await cartButtonPlus1?.evaluate(e => (e as HTMLInputElement).click());
        await cartButtonPlus1?.evaluate(e => (e as HTMLInputElement).click());

        await page.waitForSelector('#cart-dish-amount1');
        const amountDishAfterPlus1 = await page
            .$eval('#cart-dish-amount1', e => e.textContent);

        expect(amountDishAfterPlus1).toBe('3');

        const cartTotalCostSecondCheck = await page
            .$eval('#cart-total-cost', e => e.textContent);

        expect(
            cartTotalCostSecondCheck && Number(cartTotalCostSecondCheck
                .replace(/\D/g, '')) / 100
        ).toBe(Number('16.3'));

        await page.click('#cart-button-buy');

        expect(page.url()).toEqual(OWN_ADDRESS + '/login');

        await page.type('#email', TEST_ADMIN);
        await page.type('#password', TEST_ADMIN_PASS);
        await page.click('#login-register-button');
        await page.waitForSelector('#button-logout');

        await page.waitForSelector('#button-open-cart');
        await page.click('#button-open-cart');

        const cartTotalCostThirdCheck = await page
            .$eval('#cart-total-cost', e => e.textContent);

        expect(
            cartTotalCostThirdCheck && Number(cartTotalCostThirdCheck
                .replace(/\D/g, '')) / 100
        ).toBe(Number('16.3'));

        await page.waitForSelector('#cart-button-buy');
        const cartButtonBuy = await page.$('#cart-button-buy');
        await cartButtonBuy?.evaluate(e => (e as HTMLInputElement).click());

        await page.waitForSelector('#alert-dialog-description');
        const modalText = await page
            .$eval('#alert-dialog-description', e => e.textContent);

        expect(modalText).toBe('Order successfully created!');
    });

    afterEach(() => browser.close());
});
