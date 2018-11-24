//确认弹窗
function x_confirm(content, ok_cb, cancel_cb) {
    var comfirm = document.getElementById('common-comfirm');
    // console.log(toast,'finded toast')
    // console.log(toast);
    var template = '<div class="confirm-box">\
        <div class="comform-title"></div>\
        <div style="padding: .6rem 0.5rem;color: #666;">'+content+'</div>\
        <div class="comfirm-buttons" style="height: 50px;padding: 0rem 0;position: relative;">\
            <button class="comfirm-btn comfirm-cancel" style="display:none;" id="comfirm-cancel">取消</button>\
            <button class="comfirm-btn comfirm-ok" id="comfirm-ok">我知道了</button>\
        </div>\
    </div>';
    var defaultStyle = 'position: fixed;top:0;left:0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.6);z-index: 1000;';
    if(!comfirm) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML='.confirm-box{position: fixed;width: 75%;background-color: #fff;border-radius: .3rem;top: 50%;left: 50%;text-align:center;color: #fff;transform: translate(-50%, 50%); -webkit-animation: commoncomfirm .2s forwards;animation: commoncomfirm .2s forwards;}\
        @-webkit-keyframes commoncomfirm {\
            0%{transform: translateY(-45%) translateX(-50%);opacity: 0.8;}\
            90%{transform: translateY(-51%) translateX(-50%);opacity: 1;}\
            100%{transform: translateY(-50%) translateX(-50%);opacity: 1;}\
        }\
        @keyframes commoncomfirm {\
            0%{transform: translateY(-45%) translateX(-50%);opacity: 0.8;}\
            90%{transform: translateY(-51%) translateX(-50%);opacity: 1;}\
            100%{transform: translateY(-50%) translateX(-50%);opacity: 1;}\
        }\
        .comfirm-buttons::before{\
            content: \'\';\
            position: absolute;\
            width: 100%;\
            height: 1px;\
            background-color:#000;\
            top: 0;\
            left: 0;\
            -webkit-transform: scaleY(.1);\
            transform: scaleY(.1);\
        }\
        .common-comfirm .comfirm-btn{display: inline-block; width: 100%;height: 100%;margin: 0rem;line-height: .5rem;color: #80bd01;text-align: center;border: none;background-color:transparent;}\
        ';
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
        comfirm = document.createElement('div');
        comfirm.id = 'common-comfirm';
        comfirm.className = 'common-comfirm';
        comfirm.style= defaultStyle;
        // console.log(comfirm);
        comfirm.innerHTML = template;
        document.body.appendChild(comfirm);
    }else{
        comfirm.innerHTML = template;
        comfirm.style = defaultStyle;
    }
    var $ok_bt = document.getElementById('comfirm-ok');
    var $cancel_bt = document.getElementById('comfirm-cancel');
    $ok_bt.addEventListener('click', function() {
        comfirm.style = 'display: none;';
        ok_cb && ok_cb();
    });
    $cancel_bt.addEventListener('click', function() {
        comfirm.style = 'display: none;';
        cancel_cb && cancel_cb();
    });
}