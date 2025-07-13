import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const __packagesDirName = join( __dirname, "../", "../" );

// 启动浏览器配置
/**
 * @type {import('puppeteer-core').LaunchOptions}
 */
let basicLauchOptions = {
  executablePath: '/Applications/Google Chrome Beta.app/Contents/MacOS/Google\ Chrome\ Beta', // macOS Chrome Beta路径
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




let autoCommons = {
  basicLauchOptions,
  wait,
  getNewBrowserTab,
}

export { autoCommons, autoCommons as default}