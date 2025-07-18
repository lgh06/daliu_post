import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export function writeProviderIndex() {
  const providersDir = './providers';
  try {
    const files = fs.readdirSync(join(__dirname, providersDir));
    let indexmjs = join(__dirname, providersDir, 'index.mjs');
    try {
      fs.writeFileSync(indexmjs, '');
    } catch (writeError) {
      console.error(`清空 ${indexmjs} 文件内容时出错:`, writeError);
    }
    console.log('读取到的文件:', files);
    files.forEach(v => {
      if (v.endsWith('.mjs') && v !== 'index.mjs') {
        const exportLine = `export * from './${v}';\n`;
        try {
          fs.appendFileSync(join(__dirname, providersDir, 'index.mjs'), exportLine);
        } catch (appendError) {
          console.error(`向 ${join(__dirname, providersDir, 'index.mjs')} 追加内容时出错:`, appendError);
        }
      }
    })
  } catch (error) {
    console.error('读取 providers 目录时出错:', error);
  }
}