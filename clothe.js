class List {
    constructor() {
        this.ul = document.querySelector('.xu')
        this.span = document.querySelector('.zero')
        this.init()
       
    }
    init() {
        this.request()
        this.total()
    }
    request() {
        pAjax({url:'/api/goods.json'})
            .then(data => {
                let res = JSON.parse(data)
                res = res.slice(50, 70)
                this.render(res)
            })

    }
    render(data) {
        data.forEach(item => {
            this.ul.innerHTML += `
       <li>
       <a href="html/details.html?id=${item.goods_id}" style="text-decoration:none; color:black;">
                   <div class="pic">
                       <img src="${item.img_small_logo}">
                   </div>
                   <p class="title hide">${item.title}</p>
                   </a>
                   <p class="price">${item.price}</p>
                   <button data-id=${item.goods_id}>加入购物车</button>
       </li>`
        })
        this.addEvent(data)

    }
    addEvent(data) {
        this.ul.addEventListener('click', (e) => {
            let target = e.target || e.srcElement
            if (target.nodeName == 'BUTTON') {
                let id = target.dataset.id - 0
                let goods = data.find(item => {
                    return item.goods_id == id
                });
                let list = JSON.parse(localStorage.getItem('cart')) || []
                if (!list.length) {
                    list.push(goods)
                    goods.cart_number = 1
                } else {
                    let res = list.some(item => {
                        return item.goods_id == id
                    })
                    if (res) {
                        let index = list.findIndex(item => {
                            return item.goods_id == id
                        })
                        list[index].cart_number++

                    } else {
                        list.push(goods)
                        goods.cart_number = 1
                    }
                }
                localStorage.setItem('cart', JSON.stringify(list))
                this.total()
            }
            
        }, false)

    }
    total(data) {
        let list = JSON.parse(localStorage.getItem('cart')) || []
        let num = 0

        list.forEach(item => {
            num += item.cart_number

        })
        this.span.innerHTML = num
    }
}
new List() 
