function QuickieBar(){var e=jQuery,t=this;t.previewingOnAdminPage=!1;t.preventHidingWithCloseButton=!1;t.options={bar_uuid:0,bar_height:"thin",new_tab:"enabled",placement:"top",devices:"all",attribution:"hidden",alignment:"leftright",sticky:"enabled",animation:"slidein",button_style:"rounded",close_button_visibility:"onhover",color_bar_background:"#56C4C3",color_bar_text:"#FFFFFF",color_button_background:"#062332",color_button_text:"#FFFFFF",bar_text:"Get the most powerful conversion dropdown for Wordpress {{arrow-right}}",button_text:"FREE DOWNLOAD {{download}}",destination:"https://quickiebar.com",fixed_compatibility:"off"};t.init=function(n){n&&e.each(n,function(e,n){if(e=="bar_text"||e=="button_text"||e=="subscribe_text"||e=="bar_html")n=unescape(n);t.options[e]=n})};t.initAndCreateBar=function(e){t.init(e);t.createBar();t.bindEventsToBar()};t.initAndShowBar=function(e,n){if(n){t.previewingOnAdminPage=!0;t.preventHidingWithCloseButton=!0}t.init(e);t.createBar();t.bindEventsToBar();t.show()};t.prepareBarOrButtonText=function(t,n){if(!t||t=="")return"";n&&e("body").width()<900&&(t=t.replace(/{{(.*?)(-right)(.*?)}}/g,""));return t.replace(/{{(.*?)}}/g,'&nbsp;<i class="fa fa-$1"></i>&nbsp;')};t.getQuickieBarTopLevelClasses=function(){var e="";e+="qb-bar_height-"+t.options.bar_height+" ";e+="qb-sticky-"+(t.options.fixed_compatibility=="on"?"enabled":t.options.sticky)+" ";e+="qb-placement-"+t.options.placement+" ";e+="qb-attribution-"+t.options.attribution+" ";e+="qb-alignment-"+t.options.alignment+" ";e+="qb-button_style-"+t.options.button_style+" ";e+="qb-close_button_visibility-"+t.options.close_button_visibility+" ";t.previewingOnAdminPage&&(e+="qb-admin-preview ");return e};t.craftHtml=function(){var e=t.options.bar_text?t.prepareBarOrButtonText(t.options.bar_text,!0):t.prepareBarOrButtonText("Bar Text goes here",!0),n=t.options.button_text?t.prepareBarOrButtonText(t.options.button_text):"";$qbHtml="";$qbHtml='<div id="quickiebar-show-button" class="show-button-sticky-'+(t.options.fixed_compatibility=="on"?"enabled":t.options.sticky)+" show-button-placement-"+t.options.placement+'" style="color:'+t.options.color_bar_text+";background:"+t.options.color_bar_background+';"><div class="show-button" style="color:'+t.options.color_bar_text+";background:"+t.options.color_bar_background+';"><i class="fa fa-chevron-down"></i><i class="fa fa-chevron-up"></i></div></div>';$qbHtml+='<div id="quickiebar" class="qb '+t.getQuickieBarTopLevelClasses()+'" style="background:'+t.options.color_bar_background+';">';$qbHtml+='<div class="hover-background-overlay"></div>';$qbHtml+='<a href="https://quickiebar.com/" target="_blank"><div class="qb-attribution '+(GetLuminance(t.options.color_bar_background)>200?"qb-attribution-dark":"")+'"></div></a>';$qbHtml+='<div class="wrap">';$qbHtml+='<div class="qb-wrap">';$qbHtml+='<span class="bar-text" style="color:'+t.options.color_bar_text+';">'+e+"</span>";$qbHtml+='<span class="bar-button" style="'+(n==""?"display:none;":"")+"color:"+t.options.color_button_text+";background:"+t.options.color_button_background+";border-color:"+t.options.color_button_text+';">'+n+"</span>";$qbHtml+="</div>";$qbHtml+="</div>";$qbHtml+='<div class="qb-close-button '+(GetLuminance(t.options.color_bar_background)>200?"qb-close-button-dark":"")+'"><i class="fa fa-times-circle-o"></i></div>';$qbHtml+='<a href="'+t.options.destination+'" '+(t.options.new_tab=="enabled"&&t.options.destination.indexOf("#")!=0?'target="_blank"':"")+' class="link-overlay" style="'+(t.options.destination==""?"display:none;":"")+'"></a>';$qbHtml+='<div class="qb-close-bar"><i class="fa fa-chevron-up"></i></div>';$qbHtml+="</div>";return $qbHtml};t.createBar=function(){$page=t.getPage();$page.before(t.craftHtml())};t.hideAndDestroyBar=function(){t.hide(0,function(){e("#quickiebar.qb").remove()})};t.bindEventsToBar=function(){e("#quickiebar.qb").on("mouseover",function(){e(".qb-attribution").stop().addClass("visible");e(".qb-close-button").stop().addClass("visible")}).on("mouseout",function(){e(".qb-attribution").stop().removeClass("visible");e(".qb-close-button").stop().removeClass("visible")});e(".qb-close-bar,.qb-close-button").click(function(){if(t.preventHidingWithCloseButton||t.previewingOnAdminPage)return;t.hide()});e("#quickiebar.qb .link-overlay").click(function(){t.trackConversion()});e("#quickiebar-show-button").click(function(){qb.show();qb.resetCurrentBarDismissalTracking()})};t.getPage=function(){return t.previewingOnAdminPage?e("html > body"):e("html > body")};t.getFixedHeader=function(){return e("header")?e("header"):e("#header")?e("#header"):e("#masthead")?e("#masthead"):e(".site-header")?e(".site-header").first():!1};t.showBarToggle=function(){t.options.placement=="top"?e("#quickiebar-show-button").css("margin-top",-24):t.options.placement=="bottom"&&e("#quickiebar-show-button").css("margin-bottom",-24);e("#quickiebar-show-button").show();e("#quickiebar-show-button").stop().animate({"margin-top":0,"margin-bottom":0},250)};t.show=function(){$page=t.getPage();$qbHeight=e("#quickiebar").height();$slideIn=t.options.animation==="slidein";if((t.options.fixed_compatibility=="on"||t.options.sticky=="enabled"||t.options.placement=="bottom"||t.previewingOnAdminPage)&&e("body").width()>900)if(t.options.placement=="top"){if($slideIn)$page.addClass("qb-disable-animation").animate({"padding-top":$qbHeight},300,"swing",function(){$page.removeClass("qb-disable-animation")});else{$page.addClass("qb-disable-animation");$page.css("padding-top",$qbHeight);setTimeout(function(){$page.removeClass("qb-disable-animation")},20)}if(t.options.fixed_compatibility=="on"){$fixedHeader=t.getFixedHeader();$fixedHeader&&($slideIn?$fixedHeader.animate({"margin-top":$qbHeight},300,"swing"):$fixedHeader.css("margin-top",$qbHeight))}if(e("#wpadminbar")&&!t.previewingOnAdminPage){$page.css("padding-top",$qbHeight+e("#wpadminbar").height());e("#quickiebar").css("marginTop",e("#wpadminbar").height())}}else t.options.placement==="bottom"&&$page.css("margin-bottom",$qbHeight);$slideIn?e("#quickiebar").stop().slideDown(300):e("#quickiebar").stop().show();e("#quickiebar-show-button").hide()};t.hide=function(n,r){t.trackDismissal();typeof n=="undefined"&&(n=200);$page=t.getPage();$page.addClass("qb-disable-animation").animate({"padding-top":0,"margin-bottom":0},n,"swing",function(){$page.removeClass("qb-disable-animation")});e("#quickiebar").stop().slideUp(n,function(){typeof r=="function"&&r()});if(t.options.fixed_compatibility=="on"&&t.options.placement=="top"){$fixedHeader=t.getFixedHeader();$fixedHeader&&($slideIn?$fixedHeader.animate({"margin-top":0},300,"swing"):$fixedHeader.css("margin-top",0))}t.showBarToggle();typeof r=="function"&&r()};t.fetchBar=function(t){e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"get_bar",qb_public_nonce:QB_PUBLIC_GLOBALS.QB_PUBLIC_NONCE},success:function(e){t(e)},dataType:"json"})};t.getUserUuid=function(){var e=QBGetCookie("qb_user_uuid");if(!e){e=QBGenerateUuid();QBSetCookie("qb_user_uuid",e,7)}return e};t.getBarViews=function(){var e=QBGetCookie("qb_bar_views"),t;if(!e){t=[];QBSetCookie("qb_bar_views",JSON.stringify(t),7)}else t=JSON.parse(QBGetCookie("qb_bar_views"));return t};t.getBarConversions=function(){var e=QBGetCookie("qb_bar_conversions"),t;if(!e){t=[];QBSetCookie("qb_bar_conversions",JSON.stringify(t),7)}else t=JSON.parse(QBGetCookie("qb_bar_conversions"));return t};t.getBarDismissals=function(){var e=QBGetCookie("qb_bar_dismissals"),t;if(!e){t=[];QBSetCookie("qb_bar_dismissals",JSON.stringify(t),7)}else t=JSON.parse(QBGetCookie("qb_bar_dismissals"));return t};t.resetAllTracking=function(){QBDeleteCookie("qb_user_uuid");QBDeleteCookie("qb_bar_views");QBDeleteCookie("qb_bar_conversions");QBDeleteCookie("qb_bar_dismissals")};t.resetCurrentBarDismissalTracking=function(){var e=t.getBarDismissals();for(var n=e.length;n>=0;n--)e[n]==qb.options.bar_uuid&&e.splice(n,1);QBSetCookie("qb_bar_dismissals",JSON.stringify(e),7)};t.trackView=function(){var n=t.options.bar_uuid,r=t.getBarViews();if(n==0)return;r.indexOf(n)<0&&e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"save_view",user_uuid:t.getUserUuid(),bar_uuid:n,qb_public_nonce:QB_PUBLIC_GLOBALS.QB_PUBLIC_NONCE},success:function(){r.push(n);QBSetCookie("qb_bar_views",JSON.stringify(r),7)},dataType:"json"})};t.trackConversion=function(){var n=t.options.bar_uuid,r=t.getBarConversions();if(n==0)return;r.indexOf(n)<0&&e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"save_conversion",user_uuid:t.getUserUuid(),bar_uuid:n,qb_public_nonce:QB_PUBLIC_GLOBALS.QB_PUBLIC_NONCE},success:function(){r.push(n);QBSetCookie("qb_bar_conversions",JSON.stringify(r),7)},dataType:"json"})};t.trackDismissal=function(){var e=t.options.bar_uuid,n=t.getBarDismissals();if(e==0)return;n.push(e);QBSetCookie("qb_bar_dismissals",JSON.stringify(n),7)}}function isMobileDevice(){var e=!1;(function(t,n){if(/(android|bb\d+|meego).+mobile|android|ipad|playbook|silk|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))e=!0})(navigator.userAgent||navigator.vendor||window.opera);return e}function QBSetCookie(e,t,n){var r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);var i="expires="+r.toUTCString();document.cookie=e+"="+t+"; "+i+"; path=/"}function QBGetCookie(e){e+="=";var t=document.cookie.split(";");for(var n=0;n<t.length;n++){var r=t[n];while(r.charAt(0)==" ")r=r.substring(1);if(r.indexOf(e)==0)return r.substring(e.length,r.length)}return!1}function QBDeleteCookie(e){QBGetCookie(e)&&QBSetCookie(e,"",-1)}function QBGenerateUuid(){var e=[],t="0123456789abcdef";for(var n=0;n<13;n++)e[n]=t.substr(Math.floor(Math.random()*16),1);return e.join("")}function ColorLuminance(e,t){e=String(e).replace(/[^0-9a-f]/gi,"");e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);t=t||0;var n="#",r,i;for(i=0;i<3;i++){r=parseInt(e.substr(i*2,2),16);r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16);n+=("00"+r).substr(r.length)}return n}function GetLuminance(e){var t=e.substring(1),n=parseInt(t,16),r=n>>16&255,i=n>>8&255,s=n>>0&255,o=.2126*r+.7152*i+.0722*s;return o}jQuery(document).ready(function(e){if(location.hash.indexOf("qbhide")>-1||location.href.indexOf("wp-admin/admin.php")>-1||location.href.indexOf("wp-login.php")>-1)return;qb=new QuickieBar;qb.fetchBar(function(t){if(!t||!t.bar_uuid)return;if(t.debug_mode=="on"&&location.hash.toLowerCase().indexOf("qbshow")>-1){qb.initAndShowBar(t);qb.trackView()}else if(qb.getBarDismissals().indexOf(t.bar_uuid)>-1&&QB_PUBLIC_GLOBALS.USER_TYPE!="admin"){qb.initAndCreateBar(t);qb.showBarToggle()}else{if(t.fixed_compatibility=="on"&&e("body").width()<900)return;if(t.device_visibility!="all"){if(t.device_visibility=="desktoponly"&&isMobileDevice())return;if(t.device_visibility=="mobileonly"&&!isMobileDevice())return}qb.initAndShowBar(t);qb.trackView()}})});