  // 生成验证码
  $('#vc').html(setVc()).click(() => $('#vc').html(setVc()));


  // input,name,失去焦点时,获取name数据,验证是否有这个用户名
  $('[name="name"]').blur(function () {
      $.ajax({
          url: '../server/goods_select.php',
          data: { userName: $('[name="name"]').val() },
          type: 'post',
          dataType: 'json',
          success: res => {
              if (res.result === 1) {
                  $('[name="nameSpan"]').html('<span style="color:blue">您的用户名可用</span>');
              } else {
                  $('[name="nameSpan"]').html('<span style="color:red">您的用户名重复</span>');
              }
          }
      })
  })

  // 点击 注册 button按钮
  // 给 button 添加点击事件
  $('button').click( () => {
      // 获取数据 验证两次密码必须相同
      if($('[name="pwd1"]').val() !== $('[name="pwd2"]').val()){
          $('[name="pwd2Span"]').html('<span style="color:red">密码错误,请重新输入<span>');
          // 执行return,终止后面的程序
          return;
      }else{
          $('[name="pwd2Span"]').html('');
      }


      // 验证码必须相同,统一大小写
      if ($('[name="vc"]').val().toLowerCase() !== $('#vc').text().toLowerCase()) {
          $('[name="vcSpan"]').html('<span style="color:red">验证码有误!!!</span>');
          // 执行return,终止后面程序
          // return;
      } else{
          $('[name="vcSpan"]').html('');
      }


      // 发送请求

      $.ajax({
          url: '../server/goods_res.php',
          data: { userName: $('[name="name"]').val(), userPwd: $('[name="pwd1"]').val()},
          type: 'post',
          dataType: 'json',
          success: res => {
              if (res.result === 1 ){

                  $('.mask').css({ display: 'flex'});

                  let time = 5;

                  setInterval(() => {

                      time --;

                      $('.mask div p').html(`恭喜您注册成功,${time}秒后跳转首页面`);

                      if (time === 0) {

                          window.location.href = '../index.html';
                      }
                  },1000)
              }else{
                  window.alert('注册失败,用户名已被用');
              }
          }
      })
  })