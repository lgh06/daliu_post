import express from 'express';
import cors from 'cors';
import * as providers from './auto/providers/index.mjs';

const app = express();
app.use(cors());
const port = 3047;

app.get('/providers', (req, res) => {
  res.json(providers);
});

Object.keys(providers).forEach((providerName) => {
  app.get(`/${providerName}`, async (req, res) => {
    
    let paramKeyArr = providers[providerName]?.params?.split(",");
    let paramObj = {};
    
    paramKeyArr?.forEach((key) => {
      paramObj[key] = req.query?.[key] || String(Date.now());
    })
    
    // 暂不加 await 也可以正常执行
    providers[providerName]?.main(paramObj);
    res.send('Hello World!');
  });
});






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});