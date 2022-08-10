const signOn = document.querySelector('.deng')
const registerOn = document.querySelector('.zhu')
const ul = document.querySelector('.xu')
const span =document.querySelector('.zero')
const right=document.querySelector('.girl')
console.log(right)
// 请求数据
function request(){
    // js文件请求json格式的数据需要通过ajax来访问
    // 本次使用的的pajax（url，data）用绝对路径
    pAjax({url: '/api/goods.json'})
    // 访问到数据（成功）后执行的函数promise=>then，记得打点
    .then(data=>{
        // 将data解码
        let res = JSON.parse(data)
        // 获取前二十个
        res = res.slice(41,53
            )
        // 调用render函数，将res的实参传入
        render(res)
    })
}
// 渲染函数
function render(data){
    // 将数据遍历用foreach
    data.forEach(item=>{
        // 在ul里面添加数据用模板字符串
        ul.innerHTML += `
            <li>
                <a href="html/details.html?id=${item.goods_id}" style="text-decoration:none; color:black;">
                <div class="pic">
                    <img src="${item.img_small_logo}">
                </div>
                <p class="title hide">${item.title}</p>
                </a>
                <p class="price">${item.price}</p>
                <button data-id=${item.goods_id}>加入购物车</button>
            </li>
        ` 
    })
    addEvent(data)
    }
 //监听函数=============================================================================
 function addEvent(data){
    // 事件监听,点击事件
   ul.addEventListener('click', (e)=>{
    // 获得目标兼容写法
        let target = e.target || e.srcElement
        // 当点击按钮时,节点名为按钮==============
        if(target.nodeName == 'BUTTON'){
            //获取自定义属性
            let id = target.dataset.id - 0
            //获取对应的数据.拿到id
            let goods = data.find(item=>{return item.goods_id == id})
            //查看购物车有没有数据,localstorage里面数据时json要转译成js
            // getItem创建cart空间,有数据则放入,自定义
            let list = JSON.parse(localStorage.getItem('cart')) || []
            // 为空则为真,里面没有数据则运行
            if(!list.length){
                //把数据添加进数组,将产品参数push进去
                list.push(goods)
                // 产品的cart_number,即计数的变量为1
                goods.cart_number = 1
            }
            // 若cart里有数据,则进行对比,有相似++,没有一样的则push产品信息,重复上述操作
            else{
                // 定义一个变量用some找到一样的数据,找到为true,把数据传给定义的变量
                // 产品在列表里,所以some列表,对比id是否相同,自定义变量和产品信息
                let res = list.some(item=>{return item.goods_id == id})
                // 若some返回为true,则运行,有相同数据则++
                if(res){
                    // 定义变量index为在list列表里找到的一样的数据的下标,(语义化)
                    let index = list.findIndex(item=>{return item.goods_id == id})
                    // 对数据列表的对应下标的数据的数量实施加一操作
                    list[index].cart_number++
                    // 当数据库有数据并且没有一样的数据时执行
                }else{
                    // 将数据加入数据库
                    list.push(goods)
                    // 将产品的数量赋值为1
                    goods.cart_number = 1
                }
            }
            // 更新localstorage的数据库,数据来自数据列表list.
            // 该数据为js需要转译为jsaon才能存储进locastorage
            // 用setItem来加入数据
            localStorage.setItem('cart', JSON.stringify(list))
            // 调用商品数量统计函数
        totalNum()
        }
        // false为默认属性,冒泡事件
   }, false)
}
// 函数声明.商品总数============================================================
function totalNum(){
    // 定义列表接收数据
    //查看购物车有没有数据,localstorage里面数据时json要转译成js
    // getItem创建cart空间,有数据则放入,自定义
    let list = JSON.parse(localStorage.getItem('cart')) || []
    // 初始化变量
    let num = 0
    // 遍历数据列表
    list.forEach(item=>{
        // 运用+=是将前面的数据存储到num里,再加现在的不断累加
        num += item.cart_number
    })
    // 将得到的产品总数赋值给span里的对应地方

    span.innerHTML = num
}
request()
/**
 * 跳转到登录页面
 */
signOn.addEventListener('click', function (e) {
    e = e || window.event
    e.preventDefault() //阻止默认行为
    location.href = 'html/sign.html'
})
/**
 * 跳转到注册页面
 */
registerOn.addEventListener('click', function (e) {
    e = e || window.event
    e.preventDefault() //阻止默认行为
    location.href = 'html/register.html'
})
// 
right.addEventListener('click', function (e) {
    e = e || window.event
    e.preventDefault() //阻止默认行为
    location.href = 'html/clothe.html'
})
/**
 * 搜索框
 */
const content = document.querySelector('input[name="content"]')
$('.btn').on('click', function () {
    var contents = content.value
    if (contents == '女装') {
        location.href = "https://ai.taobao.com/search/index.htm?spm=a231o.13503973.1998549605.628.435b68edzoZzpu&key=%E5%A5%B3%E8%A3%85&pid=mm_124190590_30248727_111528700405&union_lens=recoveryid%3A201_33.5.39.50_1201786_1651022795808%3Bprepvid%3A201_33.5.39.50_1201786_1651022795808"
    } else if (contents == '男装') {
        location.href = "https://ai.taobao.com/search/index.htm?spm=a231o.13503973.1998549605.118.435b68edSw8bit&key=%E7%94%B7%E8%A3%85&pid=mm_124190590_30248727_111528700405&union_lens=recoveryid%3A201_33.8.42.130_1614134_1651024367937%3Bprepvid%3A201_33.8.42.130_1614134_1651024367937"
    } else if (contents == '美妆') {
        location.href = "https://ai.taobao.com/search/index.htm?spm=a231o.13503973.1998549605.117.435b68edbHHg3a&key=%E7%BE%8E%E5%A6%86&pid=mm_124190590_30248727_111528700405&union_lens=recoveryid%3A201_33.7.156.54_1612719_1651024446381%3Bprepvid%3A201_33.7.156.54_1612719_1651024446381"
    } else if (contents == '数码') {
        location.href = "https://ai.taobao.com/search/index.htm?spm=a231o.13503973.1998549605.447.435b68edbHHg3a&key=%E8%93%9D%E7%89%99%E8%80%B3%E6%9C%BA&pid=mm_124190590_30248727_111528700405&union_lens=recoveryid%3A201_33.7.156.54_1612719_1651024446381%3Bprepvid%3A201_33.7.156.54_1612719_1651024446381"
    } else if (contents == '美食') {
        location.href = "https://ai.taobao.com/search/index.htm?spm=a231o.13503973.1998549605.670.435b68edbHHg3a&key=%E9%9B%B6%E9%A3%9F&pid=mm_124190590_30248727_111528700405&union_lens=recoveryid%3A201_33.7.156.54_1612719_1651024446381%3Bprepvid%3A201_33.7.156.54_1612719_1651024446381"
    } else{
        alert('输入内容不正确/未输入')
    }
})
// 轮播
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });     

