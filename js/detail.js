 // 获取地址栏信息
 const urlObj = getUrlVal();
 console.log(urlObj)

 let msg;

 // 根据 good_id 向数据库做查询
 $.ajax({
     url:'../server/goods_detail.php',
     data:{ goods_id: urlObj.goods_id },
     type:'post',
     dataType:'json',
     success:res=>{

        msg = res;

         let str = `
           <h2 class="title">商品详细信息</h2>
           <a href="#" class="images">
              <img src="${res.goods_small_logo}" alt="...">
           </a>
         <div class="deta">
           <h4 class="name">${res.goods_name}</h4>
           <p class="unit">价格:￥${res.goods_price}</p>
           <div class="button">号码:
             <button>S</button>
             <button>M</button>
             <button>L</button>
             <button>XL</button>
             <button>XXL</button>
           </div>
           <p class="buy">
             <a href="javascript:;">立即购买</a>
             <a href="JavaScript:;" name="inCart">加入购物车</a>
           </p>
         </div>
         <ul class="link">
           <li><a href="javascript:;" class="active">商品详细信息</a></li>
           <li><a href="javascript:;">商品参数信息</a></li>
           <li><a href="javascript:;">相关商品</a></li>
         </ul>
         <div>
           ${res.goods_introduce}
         </div>
         `;

         $('.container').html(str);
     }
 })

 $('.container').on( 'click' , '[name="inCart"]' , ()=>{

     const cookieObj = myGetCookie();

     if(cookieObj.login === undefined){
         let bool = window.confirm('您还没有登录,点击确定,跳转登录页面');
         if(bool){
             window.location.href = `./login.html?url=${window.location.href}`;
         }
     }else{

       let cartArr = window.localStorage.getItem('cart');
       console.log(cartArr);

       if( cartArr === null ){

         msg.num = 1;

         msg.buy = true;

         const arr = [ msg ];

         window.localStorage.setItem( 'cart' , JSON.stringify(arr) );

       }else{

         cartArr = JSON.parse(cartArr);

         let bool = true;

         cartArr.forEach( (v,k)=>{
           if(v.goods_id === msg.goods_id){

             v.num++;

             bool = false;
           }
         })

         if(bool){

           msg.num = 1;
           msg.buy = true;

           cartArr.push( msg );
         }

         window.localStorage.setItem( 'cart' , JSON.stringify( cartArr ) );

         window.location.href = './cart.html';
       }


     }
 } )