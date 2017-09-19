/**
 * Created by frank on 10/08/2017.
 */



export  const  Get = (url,successCallBack,failedCallBack,isAppenToken=true) => {

    let headers = {}
    if(isAppenToken){
        headers.Authorization=sessionStorage.getItem('current_user_token');
    }

    fetch(url, {
        headers:headers
    })
        .then((res) => res.json())
        .then((res) => {
            successCallBack(res);
        })
        .catch((err) => failedCallBack(err));
}

export  const  Post = (url,body,successCallBack,failedCallBack,isAppenToken=true) => {

        let headers = {
            'Content-Type': 'application/json'
        }
        if(isAppenToken){
            headers.Authorization=sessionStorage.getItem('current_user_token');
        }

        fetch(url, {
            method: 'post',
            // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
            body: JSON.stringify(body),
            headers: headers
        })
            .then((res) => res.json())
            .then((res) => {
                successCallBack(res);
            })
            .catch((err) => failedCallBack(err));
    }

export  const   Put =  (url,body,successCallBack,failedCallBack,isAppenToken=true) =>{
        let headers = {
            'Content-Type': 'application/json'
        }
        if(isAppenToken){
            headers.Authorization=sessionStorage.getItem('current_user_token');
        }
        //console.log(JSON.stringify(body));
        fetch(url, {
            method: 'put',
            // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
            body: JSON.stringify(body),
            headers: headers
        })
            .then((res) => res.json())
            .then((res) => {
                successCallBack(res);
            })
            .catch((err) => failedCallBack(err));
    }

