//(function($) {
//'use strict';
//
//$(function() {
//  var $fullText = $('.admin-fullText');
//  $('#admin-fullscreen').on('click', function() {
//    $.AMUI.fullscreen.toggle();
//  });
//
//  $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
//    $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
//  });
//});
//
//  //初始化头部日期
//  var nd = new Date();
//  var year = nd.getFullYear();
//  var month = nd.getMonth();
//  var date = nd.getDate();
//  var day = nd.getDay();
//  month++;
//  month = addZero(month);
//  date = addZero(date);
//  var nowDate = year + '-' + month + '-' + date;
//  var nowWeekDay = weekToStr(day);
//  document.getElementById('nowDate').innerHTML = nowDate;
//  document.getElementById('nowWeekDay').innerHTML = nowWeekDay;
//
//  $('.am-panel-hd').on('click',function(){
//     var url = this.dataset.url;
//     location.href = url;
//  });
//})(jQuery);
//
//function addZero(num){
//if(num <= 9){
//  num = '0' + num;
//}
//return num
//}
//function weekToStr(day){
//var tmp = '';
//switch(day){
//    case 0:
//        tmp = '星期天';
//      break;
//    case 1:
//        tmp = '星期一';
//        break;
//    case 2:
//        tmp = '星期二';
//        break;
//    case 3:
//        tmp = '星期三';
//        break;
//    case 4:
//        tmp = '星期四';
//        break;
//    case 5:
//        tmp = '星期五';
//        break;
//    case 6:
//        tmp = '星期六';
//        break;
//}
//return tmp;
//}