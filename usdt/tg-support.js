/* ===== Telegram 客服按钮 - 公共组件 ===== */
(function(){
  // k2 方法
  window.k2=function(){location.href='https://t.me/BTCETHUSDT999'};

  // 注入样式
  var css='.tg-btn{position:fixed;right:16px;bottom:100px;z-index:40;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#2AABEE,#229ED9);border:none;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(42,171,238,.35);transition:transform .2s,box-shadow .2s}.tg-btn.show{display:flex}.tg-btn:active{transform:scale(.9)}.tg-btn svg{width:22px;height:22px;fill:#fff}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  // 注入按钮 — 等 DOM ready
  function inject(){
    var btn=document.createElement('button');
    btn.className='tg-btn';
    btn.onclick=function(){window.k2()};
    btn.title='Telegram Support';
    btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.46-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.441-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.154.232.171.326.017.094.038.307.021.473z"/></svg>';
    document.getElementById('app').appendChild(btn);

    // 等 boot 消失后再显示
    var boot=document.getElementById('boot');
    if(boot){
      var obs=new MutationObserver(function(){
        if(!document.getElementById('boot')){btn.classList.add('show');obs.disconnect();}
      });
      obs.observe(boot.parentNode,{childList:true});
    }else{
      btn.classList.add('show');
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',inject);}
  else{inject();}
})();
