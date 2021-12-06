const puppeteer = require('puppeteer');

async function testYaRu(){
    console.log('Launch the browser');
    const browser = await puppeteer.launch();

    console.log('Create the new brouser tab');
    const page = await browser.newPage();

    console.log('Go to the page ya.ru');
    await page.goto('https://ya.ru/');

    console.log('Enter the text "Test Automation" in the search line');
    const searchField = await page.$('#text');
    await searchField.type('Test Automation');

    console.log('Click on the button "Find"');
    const searchButton = await page.$('.button[type=submit]');
    await searchButton.click();
    
    console.log('Wait to go to the search results page');
    await page.waitForNavigation();

    console.log('Retrieve search result');
    let result = await page.$('.serp-item');

    console.log('Compare the expected result and actual result');
    if (result == null) {
        console.log('The search results are not found');
    } else {
        console.log('The search results are displayed');
    }  
    console.log('Close the browser');
    await browser.close();
}

testYaRu();