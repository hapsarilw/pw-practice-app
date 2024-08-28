import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastPage()
    await pm.navigateTo().tooltipPage()
})

test('paramatized methods', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFornLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.onFornLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('John Smitth', 'John@test.com', false)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommandDatePicketDateFromToday(1)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 7)
})

