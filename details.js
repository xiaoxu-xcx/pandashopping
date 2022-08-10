class Details {
    constructor() {
        this.pic = document.querySelector('.pic>img')
        this.bigPic = document.querySelector('.bigPic>img')
        this.details = document.querySelector('.details')
        this.price = document.querySelector('.price')
        this.title = document.querySelector('.titles')
        this.all = document.querySelector('.all')
        // console.log(this.bigPic)
        // 放大镜获取元素

        this.firstBox = document.querySelector('.pic')
        this.mask = document.querySelector('.pic>span')
        this.bigBox = document.querySelector('.bigPic')
        this.allIn = document.querySelector('.zoom')
        this.init()
    }
    init() {
        this.request()
        this.addEvent()
        this.over()
        this.out()
        this.move()
    }

    getQueryStr(name) {
        //location.search这个属性可以直接帮助咱们拿到查询字符串需要的部分数据
        // 拿到？id=5=>id=5=>再根据=来分割
        let id = location.search.slice(1)
        let obj = {}
        let arr = id.split('=')
        obj[arr[0]] = arr[1]
        return obj[name]
    }
    request() {
        //判断有没有id存在
        let myId = this.getQueryStr('id')
        if (!myId) {
            location.href = '/index.html'
            return false
        } else {
            pAjax({
                    url: '/api/goods.json'
                })
                .then(data => {
                    let res = JSON.parse(data)
                    res = res.slice(41, 53)
                    let goods = res.find(item => {
                        return item.goods_id == myId
                    })
                    this.render(goods)
                })
        }
    }
    render(data) {
        this.pic.src = data.img_small_logo
        this.bigPic.src = this.pic.src
        this.details.innerHTML = data.goods_introduce
        this.title.innerHTML = data.title
        this.price.innerHTML = data.price
    }
    // 数据渲染==========================
    addEvent() {
        this.all.addEventListener('click', (e) => {
            let target = e.target || e.srcElement
            //做全选功能
            if (target.className == 'selectAll') {
                //获取自己的状态
                let type = target.checked
                this.list.forEach(item => {
                    item.is_select = type
                })
                this.render()
            }
            //单选功能

            if (target.className == 'deng') {
                e = e || window.event
                e.preventDefault() //阻止默认行为
                location.href = 'cart.html'
            }
        }, false)
    }
    // 一下为放大镜效果=============================
    over() {
        this.firstBox.onmouseover = () => {
            this.mask.style.display = 'block'
            this.bigBox.style.display = 'block'
        }
    }
    out() {
        this.firstBox.onmouseout = () => {
            this.mask.style.display = 'none'
            this.bigBox.style.display = 'none'
        }
    }
    move() {
        this.firstBox.onmousemove = (e) => {
            let x = e.clientX - this.allIn.offsetLeft - this.mask.offsetWidth / 2
            let y = e.clientY - this.mask.offsetHeight / 2
            if (x < 0) {
                x = 0
            } else if (x >= this.firstBox.offsetWidth - this.mask.offsetWidth) {
                x = this.firstBox.offsetWidth - this.mask.offsetWidth
            }
            if (y < 0) {
                y = 0
            } else if (y >= this.firstBox.offsetHeight - this.mask.offsetHeight) {
                y = this.firstBox.offsetHeight - this.mask.offsetHeight
            }
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'
            let w = x / (this.firstBox.offsetWidth - this.mask.offsetWidth)
            let h = y / (this.firstBox.offsetHeight - this.mask.offsetHeight)
            this.bigPic.style.left = -w * (this.bigPic.offsetWidth - this.bigBox.offsetWidth) + 'px'
            this.bigPic.style.top = -h * (this.bigPic.offsetHeight - this.bigBox.offsetHeight) + 'px'
        }
    }

}
new Details()