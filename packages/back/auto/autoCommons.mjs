import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const __packagesDirName = join( __dirname, "../", "../" );

let getExecutablePath = () => {
  let filePaths = [
    '/Applications/Google Chrome Beta.app/Contents/MacOS/Google\ Chrome\ Beta', // macOS Chrome Beta路径
    'C:/Program Files/Google/Chrome Beta/Application/chrome.exe', // windows Chrome Beta路径
  ]
  for (let filePath of filePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
}

let executablePath = getExecutablePath();

// 启动浏览器配置
/**
 * @type {import('puppeteer-core').LaunchOptions}
 */
let basicLauchOptions = {
  executablePath,
  userDataDir: __packagesDirName + '/browserDataDirChromeBeta',
  headless: false,
  defaultViewport: null,
  timeout: 0,
  args: [
    `--window-size=1680,900`
  ],
  ignoreDefaultArgs: ['--enable-automation'],
  enableExtensions: true,
};

let wait = (ms=5000) => new Promise(resolve => setTimeout(resolve, ms))

async function getNewBrowserTab(browser) {
    let resultPromise

    async function onTargetcreatedHandler(target) {
        if (target.type() === 'page') {
            const newPage = await target.page()
            const newPagePromise = new Promise(y =>
                newPage.once('domcontentloaded', () => y(newPage))
            )

            const isPageLoaded = await newPage.evaluate(
                () => document.readyState
            )

            browser.off('targetcreated', onTargetcreatedHandler) // unsubscribing

            return isPageLoaded.match('complete|interactive')
                ? resultPromise(newPage)
                : resultPromise(newPagePromise)
        }
    }

    return new Promise(resolve => {
        resultPromise = resolve
        browser.on('targetcreated', onTargetcreatedHandler)
    })
}
/**
 * 
 * @param {import("express").Response} res 
 * @param {String} uid 
 * @param {String} str 
 */
async function sendProgressToUser(newestProgressResponse,uid="1",str="") {
  console.log("sendProgressToUser",newestProgressResponse)
  let res = newestProgressResponse["uid"+uid];
  if(res && res.req?.query?.uid === uid){
    console.log("sendProgressToUser uid匹配")
    res.write(`data: ${str}\n\n`)
  }else{
    console.log("sendProgressToUser uid 不不不匹配", uid, res.query?.uid)

  }
}




let autoCommons = {
  basicLauchOptions,
  wait,
  getNewBrowserTab,
  sendProgressToUser,
}

export { autoCommons, autoCommons as default}