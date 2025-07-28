// 头条 mp 个人号 微头条
import puppeteer from 'puppeteer-core';
import { autoCommons } from '../autoCommons.mjs'

let { wait } = autoCommons;



async function main({content="222",headless=false,autoCommit=false,progress}) {
  progress("headless",headless)
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

    progress("打开链接")
    await page.goto('https://mp.toutiao.com/',{waitUntil:'domcontentloaded'});


    progress("等待 创作-微头条 链接 出现")
    await page.waitForSelector('#masterRoot div.pgc-content div.byte-menu-inline.base_creation_tab div.byte-menu-item:nth-child(3) a',{timeout:0});
    await wait()
    progress("点击 创作-微头条 链接")
    await page.click('#masterRoot div.pgc-content div.byte-menu-inline.base_creation_tab div.byte-menu-item:nth-child(3) a');

    progress("等待与点击 文本输入框")
    await page.waitForSelector('#root  div.publish-box > div.syl-editor > div.ProseMirror > p:nth-child(1) > span:nth-child(1)')
    await wait()
    await page.click('#root  div.publish-box > div.syl-editor > div.ProseMirror > p:nth-child(1) > span:nth-child(1)')
    await wait()
    await page.keyboard.sendCharacter(content)
    await wait()

    if(autoCommit) {
      await page.click('#root  div.footer-wrap > div.footer.garr-footer-publish-content > button.byte-btn.publish-content > span')
      await wait();
    }


    progress("头条-个人-微头条 执行完毕")




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

let toutiao_personal_micro = {
  main,
  desc: "头条-个人-微头条",
  params: ["content","headless","autoCommit"]
}


export { toutiao_personal_micro }

