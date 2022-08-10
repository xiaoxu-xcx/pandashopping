// function pAjax(options) {
//     return new Promise((resolve, reject)=>{
//         let xhr = new XMLHttpRequest()
//         //url不能为空
//         if (!options.url) {
//             alert('地址不能为空！')
//             return false
//         }
//         //处理参数
//         if (options.query) {
//             //把对象转成查询字符串
//             let str = '?'
//             //遍历对象
//             for (let key in options.query) {
//                 str += `${key}=${options.query[key]}`
//                 str += '&'
//             }
//             str = str.slice(0, -1)
//             xhr.open('get', options.url + str)
//         } else {
//             xhr.open('get', options.url)
//         }
//         xhr.send()
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState == 4) {
//                 if (xhr.status == 200) {
//                     resolve(xhr.responseText)
//                 } else {
//                     reject()
//                 }
//             }
//         }
//     })
// }
function myPromise(options) {
    return new Promise((resovle, reject) => {
        const xhr = new window.XMLHttpRequest()
        let params = formatParmas(options.data) //uid=101
        let method = options.method.toUpperCase()
        if (method == 'GET') {
            xhr.open(method, options.url + '?' + params)
            xhr.send()
        } else if (method == 'POST') {
            xhr.open(method, options.url)
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
            xhr.send(params)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let data = xhr.responseText
                    data = JSON.parse(data)
                    resovle(data)
                } else {
                    reject('网络请求失败')
                }
            }
        }
    })

}

function myAjax(options) {
    const xhr = new window.XMLHttpRequest()
    let params = formatParmas(options.data) //uid=101
    let method = options.method.toUpperCase()
    if (method == 'GET') {
        xhr.open(method, options.url + '?' + params)
        xhr.send()
    } else if (method == 'POST') {
        xhr.open(method, options.url)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let data = xhr.responseText
                data = JSON.parse(data)

                options.success(data)
            } else {
                options.error('网络请求失败')
            }
        }
    }
}

function formatParmas(paramsData) {
    let arr = []
    for (let key in paramsData) {
        arr.push(`${key}=${paramsData[key]}`) //[username=admin,password=123]
    }
    let str = arr.join('&')
    return str
}