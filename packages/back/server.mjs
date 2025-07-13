import express from 'express';
import cors from 'cors';
import * as providers from './auto/providers/index.mjs';

const app = express();
app.use(cors());
const port = 3047;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// http://localhost:3047/weixin_dingyue_personal
app.get('/weixin_dingyue_personal', async (req, res) => {
  // 暂不加 await 也可以正常执行
  providers["weixin_dingyue_personal"]({
    title: "说说程序员这个行业 这里是标题 测试测试",
    content: "你好，我是程序员 这里是内容 测试测试"
  })
  res.send('Hello World!');
});

// http://localhost:3047/x_personal
app.get('/x_personal', async (req, res) => {
  // 暂不加 await 也可以正常执行
  providers["x_personal"]({
    content: "你好，我是程序员 这里是内容 测试测试"
  })
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});