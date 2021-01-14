  // 使用 getUrlVal 来获取地址栏参数
  const urlObj = getUrlVal();

  // 根据数据向页面发起请求,生成页面内容
  // 将请求内容封装成一个函数

  let page = 1;

  let line = 12;

  setHtml()

  function setHtml() {
      $.ajax({
          url: '../server/goods_list.php',
          type: 'get',
          data: { cat_one_id: urlObj.cat_one_id, page: page, line: line },
          dataType: 'json',
          success: res => {
              console.log(res);
              let str = '';
              res.forEach( (v) => {
                  str +=`
                  <div class="nav">
                    <ol>
                      <li><a href="#">${v.cat_one_id}</a></li>
                      <li><a href="#">${v.cat_two_id}</a></li>
                      <li class="active">${v.cat_three_id}</li>
                    </ol>                        
                    <div class="list">
                        <img src="${v.goods_big_logo}">
                        <p class="money">￥${v.goods_price}</p>
                        <p class="name">${v.goods_name}</p>
                        
                        <p class="link">
                          <a href="JavaScript:;" " role="button">查找相似商品</a>
                          <a href="./detail.html?goods_id=${v.goods_id}"role="button">查看商品详情</a>
                        </p>
                    </div>
                  </div>
                  `;
              })

              // 将li写到ul中
              $('.container ul').html(str);

              // 请求回之后的内容执行分页显示
              $('.M-box1').pagination({
                  mode:'fixed',
                  count:4,
                  pageCount: res[0].sumPage,
                  totalDate: res[0].row,
                  current: res[0].page,
                  showData: line,
                  prevContent:'上一页',
                  nextContent:'下一页',
                  prevCls: 'myPrev',
                  nextCls: 'myNext',
                  activeCls:'active',
                  coping : true,
                  homePage: '首页',
                  endPage: '末页',
                  callback:(res)=>{

                      page = res.getCurrent();

                      setHtml();
                  },
              });
          }
      })
  }