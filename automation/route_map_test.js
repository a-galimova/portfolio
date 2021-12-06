const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testTaxiResult() {
    console.log('Launch the browser');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Create the new browser tab');
    const page = await browser.newPage();

    console.log('Follow the link');
    await page.goto(URL_TEST);

    console.log('Step 1: input hours and minutes');
    const hoursInput = await page.$('#form-input-hour');
    await hoursInput.type('08');

    const minutesInput = await page.$('#form-input-minute');
    await minutesInput.type('00');

    console.log('Step 2: fill the field "From"');
    const fromInput = await page.$('#form-input-from');
    await fromInput.type('Usacheva, 3');

    console.log('Step 3: fill the field "To"');
    const toInput = await page.$('#form-input-to');
    await toInput.type('Komsomolsky prospect, 18');

    console.log('Step 4: select mode "Custom"');
    const routeMode = await page.$('#form-mode-custom');
    await routeMode.click();

    console.log('Step 5: select the type of transport');
    const typeOfTransport = await page.$('#from-type-taxi');
    await typeOfTransport.click();

    console.log('Wait for the element with the result');
    await page.waitForSelector('#result-time-price');

    console.log('Get the string with the result');
    const text = await page.$eval('#result-time-price', element => element.textContent);

    console.log('Check the condition of the test case');
        if (text.startsWith('Taxi')) {
        console.log('Success. The text contains: ' + text);
    } else {
          console.log('Error. Text does not start with the word "Taxi"')
    }

    console.log('Close the browser');
    await browser.close();
}

testTaxiResult();