setHtml();

$('.container').click( e =>{
    let cartArr = JSON.parse( window.localStorage.getItem('cart' ))

    if( $(e.target).attr('name') === 'all'){
        cartArr.forEach( v=>{
            v.buy = $(e.target).prop( 'checked');
        })
    }

    if($(e.target).attr('name') === 'other'){
        cartArr.forEach( v => {

            if(v.goods_id == $(e.target).attr('goods_id') ){
                v.buy = $(e.target).prop('checked');
            }
        })
    }

    if($(e.target).attr('name') === '-'){
        cartArr.forEach( v => {
            if(v.goods_id == $(e.target).attr('goods_id') ){
                v.num--;
            }
        })
    }

    if($(e.target).attr('name') === '+'){
        cartArr.forEach( v => {
            if(v.goods_id == $(e.target).attr('goods_id') ){
                v.num++;
            }
        })
    }

    if($(e.target).attr('name') === 'del'){
        cartArr.forEach( (v , k)=> {
            if(v.goods_id == $(e.target).attr('goods_id') ){
                cartArr.splice( k , 1)
            }
        })
    }

    window.localStorage.setItem( 'cart' , JSON.stringify( cartArr));

    setHtml();
})

function setHtml(){
    console.log(JSON.parse(window.localStorage.getItem('cart')));

    if( window.localStorage.getItem('cart') === null || JSON.parse( window.localStorage.getItem('cart') ).length === 0 ){

        $('.container').html('<h1>购物车已清空</h1>');

        return;
    }

    let cartArr = JSON.parse( window.localStorage.getItem('cart') );

    let bool = true;

    let type = 0;
    let sumNum = 0;
    let pay = 0;


    let str = `
    <div class="checkbox">
      <input type="checkbox" name="all">
      <label>
        全选
      </label>
    </div>
    `;

    cartArr.forEach(v=>{
        if(v.buy === false){
            bool = false;
        }

        if(v.buy === true){
            type++;
            sumNum += v.num
            pay += v.num * v.goods_price;
        }


        str +=`
          <li class="classify">
            <input name="other" goods_id="${v.goods_id}" type="checkbox" ${v.buy ? 'checked' : ''}>
            <a href="#">
              <img src="${v.goods_small_logo}">
            </a> 
            <div class="name">${v.goods_name}</div>
            <button name="del" goods_id="${v.goods_id}" class="del">删除</button>
            <div class="num">
              <button type="button" name="-" goods_id="${v.goods_id}" ${v.num === 1 ? 'disable' : ''}>-</button>
              <button type="button" disabled>${v.num}</button>
              <button type="button" name="+" goods_id="${v.goods_id}" ${v.num === v.goods_number ? 'disabled' : ''}>+</button>
            </div>
            <p>
              <span class="unit">每件${v.goods_price}元</span>
            </p>
            
           
          </li>
        `;
    })


    str += `
      <div class="close">
        <h1>共选中了${type}种商品,共${sumNum}件</h1>
        <h1>共${pay.toFixed(2)}元</h1>
      </div>
    `;

    $('.container').html(str);
    $('[name="all"]').prop('checked' , bool);
}