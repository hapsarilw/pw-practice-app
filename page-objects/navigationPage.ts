import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByAltText('Form Layouts').click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms")
    await this.page.getByAltText('Datepicker').click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByAltText('Smart Table').click();
  }

  async toastPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByAltText('Toast').click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByAltText('Tooltip').click();
  }

  private async selectGroupMenuItem(groupItemTitle: string){
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    if(expandedState == "false"){
        await groupMenuItem.click()
    } 
  }
}
