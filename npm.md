#全局切换淘宝镜像源
npm config set registry http://registry.npm.taobao.org

#查看镜像源使用状态
npm get registry

#全局切换官方镜像源
npm config set registry https://registry.npmjs.org

#更新npm
npm install -g npm

#查看npm版本
npm -v

#移除node_modulees
rm -rf node_modules

#删除node_modules文件夹
npm install rimraf -g
rimraf node_modules

#查看某个包在远端npm服务器的版本信息
npm view packageName versions

#更新指定包到最新版本