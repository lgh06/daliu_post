import express from 'express';
import cors from 'cors';
// import * as providers from './auto/providers/index.mjs';
import { writeProviderIndex } from './auto/writeProviderIndex.mjs';
import { networkInterfaces } from 'os';
import { Buffer } from 'buffer';

let wait = (ms=1000) => new Promise((resolve) => {setTimeout(resolve, ms)})

writeProviderIndex();

// await wait();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3047;

app.get('/', (req, res) => {
  res.send('see /providers');
});

app.get('/providers', async (req, res) => {
  let genMachinecode = () => {
    let machineCode = "";
    // 获取第一个非内部网络接口的MAC地址
    const nets = networkInterfaces();
    let macAddress = '';
    for (const name of Object.keys(nets)) {
      // console.log("name", name)
      for (const net of nets[name]) {
        // console.log("net", net)
        if (!net.internal && net.mac !== '00:00:00:00:00:00') {
          macAddress = net.mac;
          break;
        }
      }
      if (macAddress) break;
    }

    if (macAddress) {
      machineCode =   Buffer.from(macAddress).toString('base64');
    } else {
      machineCode = 'No valid MAC address found';
    }
    return machineCode;
  }

  let result = {
    ...await import('./auto/providers/index.mjs'),
    __machineCode: genMachinecode(),
  }
  res.json(result);
});

import('./auto/providers/index.mjs').then((providers) => {

  Object.keys(providers).forEach((providerName) => {
    if(providerName.startsWith("__")) return;
    app.post(`/${providerName}`, async (req, res) => {
  
      if(global.browser){
        await global.browser.close();
        delete global.browser;
      }
  
      let paramKeyArr = providers[providerName]?.params?.split(",");
      let paramObj = {};
  
      paramKeyArr?.forEach((key) => {
        paramObj[key] = req.body[key] || String(Date.now());
      })
  
      // 暂不加 await 也可以正常执行
      providers[providerName]?.main(paramObj);
      res.json({ msg: "ok" });
    });
  });

  app.listen(port, () => {
    console.log(`API Backend Server running at http://localhost:${port}`);
  });

})






