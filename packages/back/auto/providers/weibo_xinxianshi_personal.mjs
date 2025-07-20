import puppeteer from 'puppeteer-core';
import { autoCommons } from '../autoCommons.mjs'

let { wait } = autoCommons;



async function main({
  title="111",
  content="222", 
  headless=false,
  autoCommit=false,
}) {
  console.log("headless",headless)

  let browser = global.browser || await puppeteer.launch({
    ...autoCommons.basicLauchOptions,
    headless,
  });
  global.browser = browser;
  /**
   * @type {import('puppeteer-core').Page}
   */
  let page = await browser.newPage();

  try {

    // 打开链接
    await page.goto('https://weibo.com/',{waitUntil:'domcontentloaded'});


    // 等待 文本输入框 出现
    await page.waitForSelector('#homeWrap textarea[placeholder="有什么新鲜事想分享给大家？"]',{timeout:0});
    await wait()
    // 点击 文本输入框
    await page.click('#homeWrap textarea[placeholder="有什么新鲜事想分享给大家？"]');
    await wait()
    await page.keyboard.sendCharacter(content)

    if(autoCommit) {
      console.log("autoCommit", autoCommit)
      await wait(15*1000)
      await page.click(`div[class^=Tool_check] button[class*=Tool_btn]`)
    }



    console.log("执行完毕 你需要自己点击 保存为草稿 按钮。")




  } catch (error) {
    console.error(error)
  } finally {
    // await browser.close();
    // process.exit(0);
  }
}

// main({
//   content: "你好，我是程序员 这里是内容 测试测试",
// })

let weibo_xinxianshi_personal = {
  main,
  desc: "微博-个人-新鲜事",
  params: ["content","headless","autoCommit"]
}


export { weibo_xinxianshi_personal }

