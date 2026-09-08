import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const route of ['/newsdesk/', '/stories/story_56666e9c6c86e976-ebola-virus-disease.html']) {
  for (const width of [390,768,1440]) {
    test(`imported publication ${width}px ${route}`,async({page})=>{
      await page.setViewportSize({width,height:1000});
      await page.goto(route);
      const navigation=page.locator('.eoe-shell-nav');
      await expect(navigation.locator('nav a')).toHaveText(['Essays','Exhibits','Newsdesk','About','Work with me','Search']);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const header=await navigation.boundingBox(),title=await page.locator('h1').first().boundingBox();
      expect(header.y+header.height).toBeLessThanOrEqual(title.y);
      await page.keyboard.press('Tab');
      await expect(page.locator('.eoe-import-skip')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('#eoe-import-main')).toBeFocused();
      if(width===390){
        const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
      }
      await page.screenshot({path:`output/playwright/after/${width}-${route.replaceAll('/','-')}.png`,fullPage:true});
    });
  }
}
