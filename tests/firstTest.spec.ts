import { expect, test } from "@playwright/test";

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

test('locating parent elements', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
}) 

test('Reusing the locators ', async({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const emailField = basicForm.getByRole('textbox', {name: "Email"})

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
  // single test value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all text value
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  // input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
  // 2 types of assertions -> 
  // General asertions : not wait & perform the assertion when its time to execute
  // Locator assertions : can interact with web elements & methods of the locator assertions will wait up to five seconds for the element to be available
  // Soft assertions : .soft -> not failed and will continue to execute
  
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
  
  // General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  // Locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  // Soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()
})

