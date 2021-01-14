 // 吸顶效果
 $(window).scroll( function(){
    if( $(window).scrollTop() >200 ){
        $('.searchTop').slideDown(1000);
        $('.storeNav').fadeIn(1000);
    }else{
        $('.searchTop').slideUp(1000);
        $('.storeNav').fadeOut(1000);
    }

    $('.storey li').each( function( k , v){
        if( $(window).scrollTop() + 700 > $(v).offset().top ){
            $( '.storeNav li' ).eq( k ).addClass('active').siblings().removeClass('active');
        }
    }) 
})


// 侧边栏
$('.storeNav').on( 'click' , '[name="backr"]' , function(){
    $('html').animate( {scrollTop : 0} , 1000);
})

// 其他侧边栏li添加点击事件
$('.storeNav').on( 'click' , '[name="li"]' , function(){
    let height = $('.story li').eq( $(this).index() ).offset().top - 200;
    $('html').animate( {scrollTop :height } , 1000 );

})


// 登录按钮
$('[name="login"]').click( ()=>{
    window.location.href = `./pages/login.html?url=${window.location.href}`;
})

// 退出登录按钮事件
$('[name="back"]').click( ()=>{
    // 设定时效过期,删除cookie
    mySetCookie( 'login' , 1 , -1 );
    // 弹窗提示
    window.alert('您已退出登录');
})

$('[name="cart"]').click(()=>{

    const cookieObj = myGetCookie();

    if( cookieObj.login === undefined ){
        let bool = window.confirm('您还没有登陆,点击跳转登录页面');
        if(bool){
            window.location.href = `./pages/login.html?url=${window.location.href}`;
        }

    }else{
        window.location.href = './pages/cart.html';
    }
})


// 轮播图
const imgArr = [
    { path: 'l1.jpg', width: 1023, height: 450, size: 127 },
    { path: 'l2.jpg', width: 1023, height: 450, size: 128 },
    { path: 'l3.jpg', width: 1023, height: 450, size: 129 },
    { path: 'l4.jpg', width: 1023, height: 450, size: 130 },
    { path: 'l5.jpg', width: 1023, height: 450, size: 131 },
];
const oBox = document.querySelector('.box');
const oUl = oBox.querySelector('ul');
const oOl = oBox.querySelector('ol');

const imgLength = imgArr.length;

let oOlLis = {};
let liWidth = 0;
let index = 1;
let time = 0;
let bool = true;
// 调用函数
setLi(imgArr);
autoLoop();
mouseInOut();
setActive();
hid();

// 动态生成 ul>li ol>li
function setLi(array){
    let ulLiStr = '';
    let olLiStr = '';
    array.forEach( (v,k) =>{
        if(k === 0){
            olLiStr +=`<li class="active" name="illi" num="${k}"></li>`;
        }else{
            olLiStr += `<li name="olli" num="${k}"></li>`;
        }
        ulLiStr += `<li><img src="./images/${v.path}"></li>`
    })
    oUl.innerHTML = ulLiStr;
    oOl.innerHTML = olLiStr;

    oOlLis = oOl.querySelectorAll('li');
    // 克隆图片
    const cloneFirst = oUl.querySelectorAll('li')[0].cloneNode(true);
    const cloneLast = oUl.querySelectorAll('li')[imgLength - 1].cloneNode(true);

    oUl.appendChild(cloneFirst);
    oUl.insertBefore(cloneLast,oUl.querySelectorAll('li')[0]);

    liWidth = cloneFirst.offsetWidth;
    oUl.style.width = liWidth * (imgLength + 2) + 'px';
    oUl.style.left = - index * liWidth + 'px';
}
// 自动轮播
function autoLoop(){
    time = setInterval( ()=>{
        index++;
        setLiStyle();
        move(oUl , {left: -index * liWidth},loopEnd);
    }, 2000 );
}

// 轮播终止函数
function loopEnd(){
    if(index === imgLength + 1){
        index = 1
    }else if(index === 0){
        index = imgLength;
    }
    oUl.style.left = `-${index * liWidth}px`;
    bool = true;
}
// 焦点按钮样式函数
function setLiStyle(){
    oOlLis.forEach( (v,k) =>{
        myRemoveClass(v, 'active');
    })
    if(index === imgLength + 1){
        oOlLis[0].className += 'active';
    }else if(index === 0){
        oOlLis[imgLength - 1].className += 'active';
    }else{
        oOlLis[index - 1].className += 'active';
    }
}
// 鼠标移入移出
function mouseInOut(){
    oBox.addEventListener('mouseenter',()=>{
        clearInterval(time);
    })
    oBox.addEventListener('mouseleave', ()=>{
        autoLoop();
    })
}
// 点击事件
function setActive(){
    oBox.addEventListener('click', e =>{
        if(e.target.getAttribute('name') === 'l'){
            if(!bool) return;
            bool = false;
            index--;
            setLiStyle();
            move(oUl,{left:-index * liWidth}, loopEnd)
        }else if(e.target.getAttribute('name') === 'r'){
            if(!bool) return;
            bool = false;
            index++;
            setLiStyle();
            move(oUl,{left:-index * liWidth},loopEnd)
        }else if(e.target.getAttribute('name') === 'olli'){
            if(!bool) return;
            bool = false;
            index = e.target.getAttribute('num') - 0 + 1;
            setLiStyle();
            move(oUl,{left: -index * liWidth},loopEnd)
        }
    })
}

// 浏览器隐藏
function hid(){
    document.addEventListener('visibilitychange',()=>{
        if(document.visibilityState === 'hidden'){
            clearInterval(time);
        }else if(document.visibilityState === 'visible'){
            autoLoop();
        }
    })
}

  setLine( '.cross', '珠宝首饰' );
  setLine( '.cross1', '智能设备' );
  setLine( '.cross2', '家装建材' );
  setLine( '.cross3', '大家电' );
  setLine( '.cross4', '其他' );
  function setLine(classname,string){
      
      let line = 5;
      let page = 1;
      let str ='';

      $.ajax({
          url:'./server/goods_list.php',
          type:'get',
          data:{ cat_one_id: string, page: page, line: line },
          dataType: 'json',
          success: res => {
              let str = '';
              res.forEach((v) => {
                  str += `
                    <div class="list">
                      <a href="./detail.html?goods_id=${v.goods_id}"><img src="${v.goods_small_logo}" alt="..."></a>
                      <h4>${v.goods_name}</h4>
                      <p>
                       <span>￥${v.goods_price}</span>   
                      </p>
                    </div>
                  `;
              })
              $(classname).html(str);
          }
      })
  }