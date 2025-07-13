// 微信公众号登录
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { autoCommons } from '../autoCommons.mjs'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __packagesDirName = join( __dirname, "../", "../", "../" )


let { getNewBrowserTab,wait, basicLauchOptions } = autoCommons;


async function main({title="111", content="222"}) {
  let browser = global.browser || await puppeteer.launch({
    ...basicLauchOptions,
    userDataDir: __packagesDirName + '/browserDataDirChromeBetaWeixin2',
  });
  global.browser = browser;
  /**
   * @type {import('puppeteer-core').Page}
   */
  let page = await browser.newPage();

  try {

    // 打开PDF链接
    await page.goto('https://mp.weixin.qq.com/',{waitUntil:'domcontentloaded'});

    //  需要扫码登录 没有账号就先注册一个个人订阅号
    //  以下代码，仅在个人订阅号上测试通过。其它账号类型不保证有效。

    // 等待 内容管理 四个字 菜单出现
    await page.waitForSelector('#js_index_menu > ul > li.weui-desktop-menu__item.weui-desktop-menu_create > span',{timeout:0});

    // 点击 内容管理 四个字 菜单
    await page.click('#js_index_menu > ul > li.weui-desktop-menu__item.weui-desktop-menu_create > span');
    
    // 等待 草稿箱 链接出现
    await page.waitForSelector('#js_level2_title > li > ul > li:nth-child(1) > a');
    // 点击 草稿箱 链接
    await page.click('#js_level2_title > li > ul > li:nth-child(1) > a');
    // 等待 新的创作 出现
    await page.waitForSelector('#js_main div.weui-desktop-card.weui-desktop-card_new > div.weui-desktop-card__inner')

    let center1 = await page.evaluate(() => {
      let ele = document.querySelector('#js_main div.weui-desktop-card.weui-desktop-card_new > div.weui-desktop-card__inner')
      let rect = ele.getBoundingClientRect();
      let center = {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2
      }

      return center;
    })
    await wait()
    await page.mouse.move(center1.x, center1.y);
    await wait()
    await page.click('div.weui-desktop-card.weui-desktop-card_new > div.preview_media_add_panel > ul > li:nth-child(1) > a');
    page = await getNewBrowserTab(browser)
    page.bringToFront()
    console.log("after getNewBrowserTab")

    await page.waitForSelector('#js_appmsg_editor');
    console.log("after waitForSelector #js_appmsg_editor")
    await wait(3000)
    await page.mouse.move(800, 500)
    await wait(3000)
    await page.mouse.wheel({deltaY: 100})
    await wait(3000)
    await page.locator('#title').fill(title) // 公众号 图文 的 标题
    await wait(3000)
    await page.locator('#ueditor_0 div.ProseMirror').click();
    await wait(3000)
    await page.keyboard.sendCharacter(content); // 公众号 图文 的 内容


    console.log("执行完毕 你需要自己点击 保存为草稿 按钮。")




  } catch (error) {
    console.error(error)
  } finally {
    // await browser.close();
    // process.exit(0);
  }
}

// main({
//   title: "说说程序员这个行业 这里是标题 测试测试",
//   content: "你好，我是程序员 这里是内容 测试测试",
// })


let weixin_dingyue_personal2 = {
  main,
  path: "weixin_dingyue_personal2",
  desc: "微信订阅号-个人-图文-账号2",
  params: "title,content"
}

export { weixin_dingyue_personal2 }

