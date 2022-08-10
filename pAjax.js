function pAjax(options){
    return new Promise((resolve, reject)=>{
        //创建ajax对象
    let xhr = new XMLHttpRequest()
    //判断地址是否存在
    if(!options.url){
        alert('小伙子，你逗我完吗？你怕不晓得博哥厉害')
    }
    //处理参数，把对象转成查询字符串
    if(options.query){
        let str = '?'
        for(let key in options.query){
            str += `${key}=${options.query[key]}`
            str += '&'
        }
        str = str.slice(0, -1)
        //请求信息 
        xhr.open('get', options.url+str)
    }else{
        xhr.open('get', options.url)
    }
    //把请求发送出去
    xhr.send()
    //监听请求状态
    //注意点：因为事件是异步执行的，会在同步代码执行的时候，它也会执行。ajax请求其实按照规则来，应该先监听状态，再发送请求
    xhr.onreadystatechange = ()=>{
        //readyState表示ajax的状态
        if(xhr.readyState == 4){
            //status表示http状态
            if(xhr.status == 200){
                resolve(xhr.responseText)
            }else{
                reject()
            }
        }
    }    
    })
}