# Intro  
大刘的自媒体自动化工具。  
本项目目前是半成品 仍在开发和构思 中。  
欢迎小众平台的用户联系我，可以付费开发小众平台的自动发布工具。  
> 微信 mudguy  

有钱的大佬请出门右转，[新榜小豆芽](https://d.newrank.cn/)  
源码镜像 https://cnb.cool/lgh06/daliu_post  
源码打包下载 https://cnb.cool/lgh06/daliu_post/-/git/archive/main.zip
# 免责声明  
本工具没有逆向、没有反编译、没有破解，只是单纯的模拟用户操作。  
本工具仅用于学习、研究、测试，不得用于任何商业用途。  
任何使用本工具产生的法律责任，由使用者自行承担。  
# Windows用户极简安装  
下载 [此文件](https://cnb.cool/lgh06/daliu_post/-/git/raw/main/zzz_windows_dependencies.ps1?download=true)  
右键，使用PowerShell运行。  

此脚本 会自动下载daliu_post.zip和daliu_post_dependencies.zip， 并自动解压。  

去 daliu_post_dependencies 目录，找到install.bat，双击运行。（或install.ps1 右键 使用PowerShell运行）  
去 daliu_post 目录，找到run.bat，双击运行。  


# 依赖  
Node.js V22  
https://nodejs.org/zh-cn/download    
> 镜像地址 https://registry.npmmirror.com/binary.html?path=node/v22.17.1/  
> windows建议使用 node-v22.17.1-x64.msi ， macOS建议使用 node-v22.17.1.pkg  

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

# 其它
> 有空研究一下ProseMirror，头条和订阅号都使用了这个富文本编辑器。  

> https://developers.weixin.qq.com/doc/subscription/guide/product/mp_editor_jsapi.html  
> https://developers.weixin.qq.com/doc/service/guide/product/mp_editor_jsapi.html  
