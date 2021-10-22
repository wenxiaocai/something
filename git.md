#查看某个指定文件的提交历史记录
git log --pretty=oneline 文件名
#查看某个文件完成的提交路径，包括merge（单纯git log是被简化的看不到merge记录）
git log --full-history -- 文件名路径

#把HEAD指向最新下载的版本,撤销commit
git reset --hard origin/master  
#（接上步操作）将本次回退推送到远端：
git push origin HEAD --force（不安全）
#查看回退之前的提交记录
git reflog



#查看某次提交的涉及的文件
git show [commit id] --stat

#已处理冲突还是报unmerge
git reset --hard FETCH_HEAD
然后pull 就会成功

#清楚暂存盘
git stash clear

#查看某个人提交的日志、没有分页、一行显示
git --no-pager log --author="wenxiaocai" --pretty=oneline

#从某个(develop)分支创建一个(myfeature)分支
git checkout -b myfeature develop

#给指定的某个commit号加tag
git tag -a v1.2 9fceb02 -m "my tag"

#恢复多个中的某个
git stash pop stash@{$num} 
git stash apply stash@{0}（未验证有效性）

#stash未被跟踪的文件
git stash --include-untracked

#查看远程仓库地址
git remote -v

#新建本地分支
$ git checkout -b branch_name

#把新建的本地分支push到远程服务器，远程分支与本地分支同名
git push origin branch_name:branch_name
#把新建的本地分支push到远程服务器，远程分支与本地分支同名,并建立关联
git push --set-upstream origin branch_name

#删除远程分支 方法1（推送一个空分支到远程分支，其实就相当于删除远程分支）
git push origin :branch_name
#删除远程分支 方法2
$ git push origin --delete branch_name
#删除本地分支
git branch -D branch_name

#拉取更新远程分支列表
git remote update origin --prune

#拉取远程分支并创建本地分支（实际上也是创建了本地新分支x并与远程分支x关联）
git checkout -b 本地分支名x origin/远程分支名x

#指定本地branch_name到远程的分支branch_name
git branch --set-upstream-to=origin/branch_name branch_name

#查看本地分支与远程分支对应
git branch -vv

#取消add操作,将文件拉回到已修改但是未提交到暂存区的状态
git reset HEAD

#报错：Updates were rejected because the remote contains work that you do
通常是因为本地分支没有同步
push的时候指定远程分支不会报这个错
避免报错的方法 1:
使用
git push -u origin branch_name
或者
git push origin branch_name
方法2：
看报错的rejected 是哪个分支，切换到该分支然后更新，再切换回来继续操作，就不会报错了。

#cherry-pick 多个commitid
commitid1…commitid100 (不包含第一个 commitid ， 即 git cherry-pick (commitid1…commitid100])
git cherry-pick A^…B (相当于[A B]包含A)

#更换git地址
git remote set-url origin xxxxx

#git查看某个commit属于哪个分支
git branch --contains commitid

git branch -a --contains <commit id>

#git如何跨分支查找某个commit所属分支	
rebase fast-forwards

#git when-merged -l commitid

#git log --online --decorate --graph commitid..HEAD


#修改远程仓库名称
$ git remote rename pb paul

#git大小写不敏感
git mv git上的旧文件名 新文件名 
然后commit


git message

build: 影响构建系统或外部依赖关系的更改（示例范围：gulp，broccoli，npm）
ci: 更改我们的持续集成文件和脚本（示例范围：Travis，Circle，BrowserStack，SauceLabs）
docs: 仅文档更改
feat: 一个新功能
fix: 修复错误
perf: 改进性能的代码更改
refactor: 代码更改，既不修复错误也不添加功能
style: 不影响代码含义的变化（空白，格式化，缺少分号等）
test: 添加缺失测试或更正现有测试

