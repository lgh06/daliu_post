// 微信公众号登录
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname , join} from 'path';
import { autoCommons } from '../autoCommons.mjs'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __packagesDirName = join( __dirname, "../", "../", "../" )


let { getNewBrowserTab,wait, basicLauchOptions } = autoCommons;

let options = Object.assign({}, basicLauchOptions)
// 仅供中国大陆境外用户使用
// 需要设置为正确的socks5地址
let socks = "socks5://localhost:3721";  

if(socks){
  options.args = basicLauchOptions.args.slice();
  options.args.push(`--proxy-server=${socks}`)
}
options.userDataDir = __packagesDirName + "/browserDataDirChromeBetaOversea"

// dns  https://8.8.8.8/dns-query{?dns}



async function main({
  content="222",
  headless=false,
  autoCommit=false,
}) {

  let browser = global.browser || await puppeteer.launch({
    ...options,
    headless,
  });
  global.browser = browser;
  /**
   * @type {import('puppeteer-core').Page}
   */
  let page = await browser.newPage();

  try {

    // 打开PDF链接
    await page.goto('https://x.com/',{waitUntil:'domcontentloaded'});

    //  需要扫码登录 没有账号就先注册一个x个人号
    //  以下代码，仅在x个人号上测试通过。其它账号类型不保证有效。

    // 等待 文本输入框 出现
    await page.waitForSelector('div[data-testid="tweetTextarea_0RichTextInputContainer"]',{timeout:0});

    // 点击 文本输入框
    await page.click('div[data-testid="tweetTextarea_0RichTextInputContainer"]');
    await wait(2000)
    await page.keyboard.sendCharacter(content)

    // 自动提交
    if(autoCommit) {
      console.log("autoCommit", autoCommit)
      await wait(15*1000)
      await page.click(`button[data-testid="tweetButtonInline"]`)
    }
    
    
    console.log("X-个人-socks5版 执行完毕 。")

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

let x_personal_socks5 = {
  main,
  desc: "X-个人-socks5版",
  params: ["content","headless","autoCommit"]
}


export { x_personal_socks5 }

