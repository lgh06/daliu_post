# Intro  
大刘的自媒体自动化工具。  
半成品 仍在开发和构思 中。  
代码 已经在 https://cnb.cool/lgh06/daliu_post 开源。
# 免责声明  
本工具没有逆向、没有反编译、没有破解，只是单纯的模拟用户操作。  
本工具仅用于学习、研究、测试，不得用于任何商业用途。  
任何使用本工具产生的法律责任，由使用者自行承担。  
# 语言  
Node.js V22  
https://nodejs.org/zh-cn/download    
> 镜像地址 https://registry.npmmirror.com/binary.html?path=node/v22.17.0/  
> windows建议使用 node-v22.17.0-x64.msi ， macOS建议使用 node-v22.17.0.pkg  
# 额外依赖  
Chrome Beta https://www.google.cn/chrome/beta/?standalone=1  
# 安装  
npm install  
# 修改浏览器二进制文件路径  
`packages/back/auto/autoCommons.mjs` 内，将浏览器的二进制可执行文件的路径，设置正确。  
MacOS Chrome Beta： `'/Applications/Google Chrome Beta.app/Contents/MacOS/Google\ Chrome\ Beta'`  
Windows Chrome Beta： `'C:/Program Files/Google/Chrome Beta/Application/chrome.exe'`  
# providers  
packages/back/auto/providers 目录下的文件，某些行可能也需要修改。  
# 运行  
npm run dev  
# 浏览器打开  
http://localhost:4321  
