// 头条 mp 个人号
import puppeteer from 'puppeteer-core';
import { autoCommons } from '../autoCommons.mjs'

let { wait } = autoCommons;



async function main({title="111",content="222"}) {
  let browser = global.browser || await puppeteer.launch({
    ...autoCommons.basicLauchOptions
  });
  global.browser = browser;
  /**
   * @type {import('puppeteer-core').Page}
   */
  let page = await browser.newPage();

  try {

    // 打开链接
    await page.goto('https://mp.toutiao.com/',{waitUntil:'domcontentloaded'});


    // 等待 文本输入框 出现
    await page.waitForSelector('#masterRoot div.pgc-content div.byte-menu-inline.base_creation_tab div.byte-menu-item:nth-child(1) a',{timeout:0});
    await wait()
    // 点击 文本输入框
    await page.click('#masterRoot div.pgc-content div.byte-menu-inline.base_creation_tab div.byte-menu-item:nth-child(1) a');

    await page.waitForSelector('.publish-editor .assistant-title .title-wrapper .publish-editor-title .editor-title')
    await wait()
    await page.click('.publish-editor .assistant-title .title-wrapper .publish-editor-title .editor-title')
    await wait()
    await page.keyboard.sendCharacter(title)
    await wait()
    await page.waitForSelector('.publish-editor .syl-editor .ProseMirror p')
    await page.click('.publish-editor .syl-editor .ProseMirror p')
    await wait()
    await page.keyboard.sendCharacter(content)



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

let toutiao_personal = {
  main,
  desc: "头条-个人-文章",
  params: "title,content"
}


export { toutiao_personal }

