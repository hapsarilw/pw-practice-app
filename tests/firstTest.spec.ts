import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    // by ID
    page.locator('#inputEmail')

    // by Class
    page.locator('.shape-rectangle')

    // by attriute
    page.locator('[placeholder="Email"]')

    // by Class value (full)
    page.locator(`[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]`)

    //combine different selectors
    page.locator('input[plceholder="Email"][nbinput]')

    // by xPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async({page}) => {
  await page.getByRole('textbox', {name: 'Email'}).first().click()
  await page.getByRole('button', {name: 'Sign in'}).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText(`Using the Grid`).click()

  await page.getByTestId('SignIn').click()

  // await page.getByTitle('IoT Dashboard').click()
})

test('locating child element', async({page}) => {
  // Option 1
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  // Option 2
  await page.locator('nb-card').getByRole('button', {name: 'Sign In'}).first().click()

  // NOT RECOMMENG: USE SEARCHING BY INDEX -> web elements can be changed on the web page.
  await page.locator('nb-card').nth(3).getByRole('button').click()

  // TIPS:
  // - Always try to dind unique elements without using index ir the order of the web elemnents
})