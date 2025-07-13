import express from 'express';
import cors from 'cors';
import * as providers from './auto/providers/index.mjs';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3047;

app.get('/providers', (req, res) => {
  res.json(providers);
});

Object.keys(providers).forEach((providerName) => {
  app.post(`/${providerName}`, async (req, res) => {
    
    let paramKeyArr = providers[providerName]?.params?.split(",");
    let paramObj = {};
    
    paramKeyArr?.forEach((key) => {
      paramObj[key] = req.body[key] || String(Date.now());
    })
    
    // 暂不加 await 也可以正常执行
    providers[providerName]?.main(paramObj);
    res.json({msg:"ok"});
  });
});






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});