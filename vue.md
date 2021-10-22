/* NODE_ENV 目的用于指定是一开发还是生产形式进行操作 */
————————————————————————————————————————————————————————————————————————————————————————
#Vue判断父组件有没有给子组件传递方法
this.$listeners['click']

————————————————————————————————————————————————————————————————————————————————————————————————————————————————


#VUE 点击事件（父子层级元素点击时踩坑记录）#

<ul>
    <li @click="fatherClick">
        <div @click.stop="childClick">
        </div>
    </li>
</ul>
var vm_target = new Vue({
                el: '#vm_target',
                data: {
 
                },
                methods:{
                    /**父元素点击事件**/
                    fatherClick:function(event){
                        var el1 = event.currentTarget;
                                var el2 = event.target;
                    },<br>　　　　　　　　　　　　　　childClick:function(event){ <br>　　　　　　　　　　　　　　　　　　 <br>　　　　　　　　　　　　　　}
                     
                },
                created:function(){
                     
                }
                 
            });   
 在JS中，event.currentTarget获取到的是click事件绑定的DOM对象，event.target获取到的为当前所点击的DOM对象。

 

若绑定了一个父级元素后，点击子元素时，会触发父元素的点击事件，若需要点击子元素时不触发父元素事件，有两种方法：

1、在父元素中判断event.currentTarget == event.target是否为true

editTarget:function(event){
       var el1 = event.currentTarget;
       var el2 = event.target;
       if(el1 == el2){
          //do something
       }  
}
 2、在子元素中，绑定一个阻止冒泡的点击事件 @click.stop (这样点击到子元素的时候，父元素事件完全不会响应，对于处理要获取父元素位置及鼠标位置的需求不可取)


——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————







#此处不需要{{}}
v-bind:title="title"


先搞懂
1. 如何写组件, 如何动态添加组件
2. 如何控制路由, 多级动态路由
3. 如何写HASH样式, 搞懂有啥用
4. 如何动态改变组件属性, 改变组件样式, 组件状态等
5. 如何将数据从一个组件传递到另一个组件, 父子间传递, 兄弟间传递

这些最基础的了 如果搞懂了 再开始研究部署研究运行原理 然后再到 打包原理 然后扩展研究相关 node_module 的作用



Object.assign() zai Vue中的使用技巧
由于Object.assign()有上述特性，所以我们在Vue中可以这样使用： 
Vue组件可能会有这样的需求：在某种情况下，需要重置Vue组件的data数据。此时，我们可以通过this.$data获取当前状态下的data，通过this.$options.data()获取该组件初始状态下的data。然后只要使用Object.assign(this.$data, this.$options.data())就可以将当前状态的data重置为初始状态，非常方便！
————————————————
