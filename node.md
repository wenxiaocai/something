#移除node_modulees
rm -rf node_modules

#查找占用指定端口的pid(进程id)
netstat -ano | findstr "8080"

#杀死指定进程
taskkill  /pid ****  /f
