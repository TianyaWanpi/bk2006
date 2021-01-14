$('form').submit( ()=>{

    // 发送 ajax 请求
    $.ajax({
        url:'../server/goods_login.php',
        type:'post',
        data:{ userName: $('[type="text"]').val() , userPwd: $('[type="password"]').val() , },
        dataType:'json',
        success:res=>{
            if(res.result === 1){
                // 登陆成功,设定cookie
                mySetCookie('login' , 1 , 7*24*60*60);
                // 跳转页面
                window.alert('登录成功,点击跳转页面');

                window.location.href = '../index.html';//`${window.location.search.substr(5)}`;

            }else{
                // 登陆失败状态
                window.alert('您的账号密码有误,请检查之后重新登陆');
            }
        }
    })
    return false;
})