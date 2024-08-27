import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastPage()
    await navigateTo.tooltipPage()
})

test('paramatized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await onFormLayoutPage.submitInLineFormWithNameEmailAndCheckbox('John Smitth', 'John@test.com', false)
})

