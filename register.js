const formEle = document.querySelector('form')
const userNameInput = document.querySelector('input[name="username"]')
const userp = document.querySelector('.user')
const passwordInput = document.querySelector('input[name="password"]')
const passp = document.querySelector('.pass')
const aInput = document.querySelector('a')
formEle.addEventListener('submit', function (e) {
    e = e || window.event
    e.preventDefault() //阻止默认行为
    //非空验证
    var isUserNameOk = checkUsername()
    var isPasswordOk = checkPassword()
    if (isUserNameOk && isPasswordOk) {
        myPromise({
            method: 'POST',
            url: 'http://api.yuguoxy.com/api/member/add',
            data: {
                username: userNameInput.value,
                password: passwordInput.value
            }
        }).then(data => {
            alert('注册成功')
            location.href = 'sign.html'
        }).catch(err => {
            alert('密码强度不足!')
        })
    }
})

aInput.addEventListener('click', function (e) {
    e = e || window.event
    e.preventDefault() //阻止默认行为
    location.href = 'sign.html'
})

//账号不为空
function checkUsername() {
    var username = userNameInput.value
    if (username == '') {
        userp.innerHTML = '用户名不能为空'
        return false
    } else {
        userp.innerHTML = ''
        return true
    }
}


//密码不为空
function checkPassword() {
    var password = passwordInput.value
    if (password == '') {
        passp.innerHTML = '密码不能为空'
        return false
    } else {
        passp.innerHTML = ''

        //密码强度验证
        /*
         密码强度规则: 
           1. 必须是大写字母开头
               2. 密码包含字母和数字
               3. 至少8位
        */
        let reg = /^[A-Z][0-9a-zA-Z]{7,}/
        if (reg.test(password)) {
            return true
        } else {
            passp.innerHTML = '密码必须是大写字母开头,字母或数字组合至少8位!'
            return false
        }
    }
}