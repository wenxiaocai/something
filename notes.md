#搭建react-webpack (imooc.com 教程)

npm install -g generator-react-webpack

yo react-webpack projectName

npm install

npm start

# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev

使用路由搭建单页应用
之前已经通过命令安装了vue-router
cnpm install vue-router --save

首先安装n模块：	#git
npm install -g n

升级node.js到最新稳定版
n stable

n后面也可以跟随版本号比如
n v0.10.26





npm的常用命令
npm -v          #显示版本，检查npm 是否正确安装。
 
npm install express   #安装express模块
 
npm install -g express  #全局安装express模块
 
npm list         #列出已安装模块
 
npm show express     #显示模块详情
 
npm update        #升级当前目录下的项目的所有模块
 
npm update express    #升级当前目录下的项目的指定模块
 
npm update -g express  #升级全局安装的express模块
 
npm uninstall express  #删除指定的模块


安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

安装webpack
cnpm install webpack -g

安装vue脚手架
npm install vue-cli -g

在硬盘上找一个文件夹放工程用的，在终端中进入该目录
cd 目录路径

根据模板创建项目
vue init webpack-simple 工程名字<工程名字不能用中文>
或者创建 vue1.0 的项目
vue init webpack-simple#1.0 工程名字<工程名字不能用中文>

更新最新版npm
npm install npm@latest -g


#git
#如果是直接上传本地原有的文件到远程仓库，要初始化一个仓库,成功后会有下面的提示：Initialized empty Git repository in d:......
git init 
#添加整个目录
 git add . 
#文件全部提交到本地仓库
git commit -m "msg"
#提交到远程仓库
git push -u origin master

 #git修改远程仓库地址
 git remote set-url origin [url]
#例如：Git remote set-url origin gitlab@gitlab.chumob.com:PHP/hasoffer.git
#2.先删后加
git remote rm origin
git remote add origin [url]
#3.直接修改config文件




#vue test
npm init
npm install webpack --save--dev
vue init webpack (此处可带项目距名称，即会使用该名称创建新项目)
npm install 
npm run dev
