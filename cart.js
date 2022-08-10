class Cart{
    constructor(){
        //获取元素
        this.cartTable = document.querySelector('.cartTable')
        this.tbody = document.querySelector('tbody')
        this.selectAll = document.querySelector('.selectAll')
        this.totalNum = document.querySelector('.totalNum')
        this.money = document.querySelector('.money')
        this.calc=document.querySelector('.calc')


        //从localStorage里面取出数据
        this.list = JSON.parse(localStorage.getItem('cart')) || []
        this.init()
    }
    init(){
        this.render()
        this.addEvent()
    }
    render(){
        if(!this.list.length){
            this.tbody.innerHTML = `
                <tr height="100">
                    <td colspan="6">
                        <h1>你的购物车空空如也! 赶紧去购物吧<a href="/index.html">Go</a></h1>
                    </td>
                </tr>
            `
        }else{
            this.tbody.innerHTML = ''
            this.list.forEach(item=>{
                this.tbody.innerHTML += `
                    <tr>
                        <td><input type="checkbox" value="" class="select" data-id="${item.goods_id}" ${item.is_select && "checked"}/></td>
                        <td>
                            <img src="${item.img_small_logo}" >
                            <span class="hide">${item.title}</span>
                        </td>
                        <td><span>${item.price}</span></td>
                        <td>
                            <span class="sub" data-id="${item.goods_id}">-</span>
                            <input type="text" value="${item.cart_number}" class="txt" data-id="${item.goods_id}"/>
                            <span class="add" data-id="${item.goods_id}">+</span>
                        </td>
                        <td><span class="price">${item.price * item.cart_number}元</span></td>
                        <td><span class="del" data-id="${item.goods_id}">删除</span></td>
                    </tr>
                `
            })
        }
        this.total()
        //数据可持续化
        localStorage.setItem('cart', JSON.stringify(this.list))
    }
    //注意点：接下来购物车业务逻辑都是先改变数据，再让数据驱动页面（数据变了，重新渲染下，页面就跟着改变了）
    addEvent(){
        this.cartTable.addEventListener('click', (e)=>{
            let target = e.target || e.srcElement
            //做全选功能
            if(target.className == 'selectAll'){
                //获取自己的状态
                let type = target.checked
                this.list.forEach(item=>{
                    item.is_select = type  
                })
                this.render()
            }
            //单选功能
            if(target.className == 'select'){
                let id = target.dataset.id - 0
                let goods = this.list.find(item=>{return item.goods_id == id})
                goods.is_select = !goods.is_select
                this.render()
            }
            //商品数量增加
            if(target.className == 'add'){
                let id = target.dataset.id - 0
                let goods = this.list.find(item=>{return item.goods_id == id})
                //注意点：这里应该判断的是库存的数量才对，但是咱们测试方便所以把数据固定了
                if(goods.cart_number == 10){
                    alert('亲，只能买10件哦！')
                    return false
                }
                goods.cart_number++
                this.render()
            }
            //商品数量减少
            if(target.className == 'sub'){
                let id = target.dataset.id - 0
                let goods = this.list.find(item=>{return item.goods_id == id})
                //注意点：这里应该判断的是库存的数量才对，但是咱们测试方便所以把数据固定了
                if(goods.cart_number == 1){
                    return false
                }
                goods.cart_number--
                this.render()
            }
            //删除功能
            if(target.className == 'del'){
                let id = target.dataset.id - 0
                let index = this.list.findIndex(item=>{return item.goods_id == id})
                this.list.splice(index, 1)
                this.render()
                //如果数组的长度为0的话，就把全选的状态改成false
                if(!this.list.length){
                    this.selectAll.checked = false
                }
            }
            //删除功能，选中几个就删除几个
            if(target.className == 'dlAll'){
                //使用filter()方法进行过滤，要留下没有选中的
                //注意点：过滤出来的就是没有选中的
                let res = this.list.filter(item=>{return item.is_select == false})
                //把没有选中的赋值给数组了，就把选中的给过滤了
                this.list = res
                this.render()
                //如果数组的长度为0的话，就把全选的状态改成false
                if(!this.list.length){
                    this.selectAll.checked = false
                }
            }
            // 链接到二维码
            if(target.className == 'calc'){
                e = e || window.event
                e.preventDefault() //阻止默认行为
                location.href = 'erwei.html'
            }
        }, false)
    }
    total(){
        let num = 0
        let price = 0
        this.list.forEach(item=>{
            if(item.is_select == true){
                num += item.cart_number
                price += item.price * item.cart_number
            }
            let res = this.list.every(item=>{return item.is_select == true})
            if(res){
                this.selectAll.checked = true
            }else{
                this.selectAll.checked = false
            }
        })
        this.totalNum.innerHTML = num
        this.money.innerHTML = price
    }
}
new Cart()