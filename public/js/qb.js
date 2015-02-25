function QuickieBar() {
	
	//local reference to wp jQuery
	var $ = jQuery;
	
	var self = this;
	
	self.previewingOnAdminPage = false;
	self.preventHidingWithCloseButton = false;//prevents hiding the bar using the close button

	/*Default Options*/
	self.options = {
		
		bar_uuid: 0,													//the bar's id
		
		bar_height: 'regular',								// regular || thin || tall
		new_tab: 'enabled',										// enabled || disabled
		placement: 'top',											// top || bottom
		devices: 'all',												// all || desktoponly || mobileonly
		attribution: 'hidden',								// visible || hidden
		alignment: 'leftright',								// centered || leftright
		sticky: 'enabled',										// enabled || disabled
		animation: 'slidein',									// slidein || none
		button_style: 'rounded',							// rounded || pill || square || outline
		close_button_visibility: 'onhover',		// onhover || always || hidden

		color_bar_background: '#56C4C3',
		color_bar_text: '#FFFFFF',
		color_button_background: '#062332',
		color_button_text: '#FFFFFF',

		bar_text: 'Get the most powerful conversion dropdown for Wordpress {{arrow-right}}',
		button_text: 'FREE DOWNLOAD {{download}}',
		
		destination: 'http://quickiebar.com',
		
		fixed_compatibility: 'off'
	};

	self.init = function(options){
		
		if(options){
			//for each option, update self.options
			$.each(options, function(index, option){
				self.options[index] = option;
			});
		}
		
	}

	self.initAndShowBar = function(options, isAdminPage){
		
		//we have to set up the bar slightly differently for admin page preview
		if(isAdminPage){
			self.previewingOnAdminPage = true;
			self.preventHidingWithCloseButton = true;
		}
		
		self.init(options);

		self.createBar();

		self.bindEventsToBar();

		self.show();
	}

	self.prepareBarOrButtonText = function(text, removeRightArrows){
		if(!text || text == ''){
			return '';
		}
		
		//only remove right arrows when page width < 900px
		if(removeRightArrows && $('body').width() < 900){
			text = text.replace(/{{(.*?)(-right)(.*?)}}/g, '');
		}
		
		//remove {{}} if text includes "-right" so as to not show right arrows on mobile devices

		//find each inserted icon and replace with <i> html
		return text.replace(/{{(.*?)}}/g, '&nbsp;<i class="fa fa-$1"></i>&nbsp;');
	}
	
	self.getQuickieBarTopLevelClasses = function(){
		var qbClasses = '';

		//add the associated classes based on bar options to quickiebar div
		qbClasses += 'qb-bar_height-' + self.options.bar_height + ' ';
		qbClasses += 'qb-sticky-' + (self.options.fixed_compatibility == 'on' ? 'enabled' : self.options.sticky) + ' ';//overwrite default sticky option if fixed_compatibility mode is on
		qbClasses += 'qb-placement-' + self.options.placement + ' ';
		qbClasses += 'qb-attribution-' + self.options.attribution + ' ';
		qbClasses += 'qb-alignment-' + self.options.alignment + ' ';
		qbClasses += 'qb-button_style-' + self.options.button_style + ' ';
		qbClasses += 'qb-close_button_visibility-' + self.options.close_button_visibility + ' ';
		
		if(self.previewingOnAdminPage){
			qbClasses += 'qb-admin-preview ';
		}
		
		return qbClasses;
	}

	//create html block to be placed before #page div that contains all the html for the quickiebar
	self.craftHtml = function(){
		
		var barText = self.options.bar_text ? self.prepareBarOrButtonText(self.options.bar_text, true) : self.prepareBarOrButtonText('Bar Text goes here {{long-arrow-right}}', true);
		var buttonText = self.options.button_text ? self.prepareBarOrButtonText(self.options.button_text) : 'BUTTON TEXT';
		
		$qbHtml = '';

		$qbHtml += '<div id="quickiebar" class="qb ' + self.getQuickieBarTopLevelClasses() + '" style="background:' + self.options.color_bar_background + ';">';		

			$qbHtml += '<div class="hover-background-overlay"></div>';

			$qbHtml += '<a href="http://quickiebar.com/" target="_blank"><div class="qb-attribution ' + (GetLuminance(self.options.color_bar_background) > 200 ? 'qb-attribution-dark' : '') + '"></div></a>';

			$qbHtml += '<div class="wrap">';
				$qbHtml += '<div class="qb-wrap">';
					$qbHtml += '<span class="bar-text" style="color:' + self.options.color_bar_text + ';">' + barText + '</span>';
					$qbHtml += '<span class="bar-button" style="color:' + self.options.color_button_text + ';background:' + self.options.color_button_background + ';border-color:' + self.options.color_button_text + ';">' + buttonText + '</span>';
				$qbHtml += '</div>';//end .qb-wrap
			$qbHtml += '</div>';//end .wrap

			$qbHtml += '<div class="qb-close-button ' + (GetLuminance(self.options.color_bar_background) > 200 ? 'qb-close-button-dark' : '') + '"><i class="fa fa-times-circle-o"></i></div>';

			$qbHtml += '<a href="' + self.options.destination + '" ' + (self.options.new_tab == 'enabled' ? 'target="_blank"' : '') + ' class="link-overlay"></a>'

			$qbHtml += '<div class="qb-close-bar"><i class="fa fa-chevron-up"></i></div>';

		$qbHtml += '</div>';//end #quickiebar

		return $qbHtml;
	}

	self.createBar = function(){
		
		$page = self.getPage();
		
		//self.getPage().before(self.craftCSS());
		$page.before(self.craftHtml());
		
		//TODO implement this / put this in function
		//$qbReviveHtml = '<div id="quickiebar-revive"><i class="fa fa-bolt"></i></div>';
	}
	
	self.hideAndDestroyBar = function(){
		
		self.hide(0, function(){
			$('#quickiebar.qb').remove();
		});
		
	}

	self.bindEventsToBar = function(){

		//Bind hover functions to show close button & attribution (if applicable)
		$('#quickiebar.qb').on('mouseover', function(){
			$(".qb-attribution").stop().addClass('visible');
			$(".qb-close-button").stop().addClass('visible');
		}).on('mouseout', function(){
			$(".qb-attribution").stop().removeClass('visible');
			$(".qb-close-button").stop().removeClass('visible');
		});

		//Bind close functions
		$('.qb-close-bar,.qb-close-button').click(function(){
			if(self.preventHidingWithCloseButton){
				return;
			}
			
			self.hide();
		});
		
		//Bind conversion tracking on bar click
		$("#quickiebar.qb").click(function(){
			self.trackConversion();
			//console.log("TRACK CONVERSION");
		});
	}

	self.getPage = function(){
		if(self.previewingOnAdminPage){
			return $('html > body');
		}
		else{
			return $('html > body');
		}
	}
	
	self.getFixedHeader = function(){
		
		if($('#masthead')){
			return $('#masthead');
		}
		
		if($('header')){
			return $('header');
		}
		
		if($('.site-header')){
			return $('.site-header').first();
		}
		
		//if we can't find it with selectors, the loop through every element in <body> - stopping once we find a position:fixed element and return that.
		//TODO
		return false;
	}
	
	self.show = function(){
		
		$page = self.getPage();
		
		$qbHeight = $('#quickiebar').height();
		
		$slideIn = self.options.animation === 'slidein';

		//if we need to make page adjustments
		if((self.options.fixed_compatibility == 'on' || self.options.sticky == 'enabled' || self.options.placement == 'bottom' || self.previewingOnAdminPage) && $('body').width() > 900){

			if(self.options.placement == 'top'){

				if($slideIn){
					$page.addClass('qb-disable-animation').animate({'padding-top': $qbHeight}, 300, 'swing', function(){
						$page.removeClass('qb-disable-animation');
					});
				}
				else{
					$page.addClass('qb-disable-animation');
					$page.css('padding-top', $qbHeight);

					//not sure why...but I have to do this after a slight delay
					setTimeout(function(){
						$page.removeClass('qb-disable-animation');
					}, 20);
				}
				
				//adjust fixed header if required
				if(self.options.fixed_compatibility == 'on'){
					$fixedHeader = self.getFixedHeader();
					
					if($fixedHeader){
						
						if($slideIn){
							$fixedHeader.animate({'margin-top': $qbHeight}, 300, 'swing');
						}
						else{
							$fixedHeader.css('margin-top', $qbHeight);
						}
						
					}
				}

			}
			else if(self.options.placement === 'bottom'){
				$page.css('margin-bottom', $qbHeight);
			}
		}

		//Animate the bar itself
		if($slideIn){
			
			$('#quickiebar').stop().slideDown(300);
			
		}
		else{
			$('#quickiebar').stop().show();
		}
		
	}

	self.hide = function(animationDuration, callback){
		
		if(typeof animationDuration == 'undefined'){
			animationDuration = 200;
		}
		
		//don't hide if previewing on admin page
		if(self.previewingOnAdminPage){
			//return;
		}
		
		$page = self.getPage();
		
		$page.addClass('qb-disable-animation').animate({'padding-top': 0, 'margin-bottom': 0}, animationDuration, 'swing', function(){
			$page.removeClass('qb-disable-animation');
		});
		
		$('#quickiebar').stop().slideUp(animationDuration, function(){
			//execute callback when bar hidden from page
			if(typeof callback == 'function'){
				callback();
			}
		});
		
		//adjust fixed header if required
		if(self.options.fixed_compatibility == 'on' && self.options.placement == 'top'){
			$fixedHeader = self.getFixedHeader();
			
			if($fixedHeader){
				
				if($slideIn){
					$fixedHeader.animate({'margin-top': 0}, 300, 'swing');
				}
				else{
					$fixedHeader.css('margin-top', 0);
				}
				
			}
		}
		
	}

	self.fetchBar = function(callback){
		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: {
				action: 'qb_public_ajax',
				endpoint: 'get_bar',
				qb_public_nonce: QB_GLOBALS.QB_PUBLIC_NONCE
			},
			success: function(bar){
				callback(bar);
			},
			dataType: 'json'
		});
	}
	
	self.getUserUuid = function(){
		var user_uuid = QBGetCookie('qb_user_uuid');
		
		if(!user_uuid){
			//if no user_uuid created, create it now
			user_uuid = QBGenerateUuid();
			
			//persist uuid to local storage
			QBSetCookie('qb_user_uuid', user_uuid, 7);//TODO allow user to set the expiration days
		}
		
		return user_uuid;
	}
	
	self.getBarViews = function(){
		
		var bar_views_cookie = QBGetCookie('qb_bar_views');
		var bar_views;
		
		if(!bar_views_cookie){
			
			//initialize empty array as bar_views property
			bar_views = [];
			
			QBSetCookie('qb_bar_views', JSON.stringify(bar_views), 7);
		}
		else{
			
			//load bars_viewed from cookie
			bar_views = JSON.parse(QBGetCookie('qb_bar_views'));
		}
		
		return bar_views;
		
	}
	
	self.getBarConversions = function(){
		
		var bar_conversions_cookie = QBGetCookie('qb_bar_conversions');
		var bar_conversions;
		
		if(!bar_conversions_cookie){
			
			//initialize empty array as bar_conversions property
			bar_conversions = [];
			
			QBSetCookie('qb_bar_conversions', JSON.stringify(bar_conversions), 7);
		}
		else{
			
			//load bars_viewed from cookie
			bar_conversions = JSON.parse(QBGetCookie('qb_bar_conversions'));
		}
		
		return bar_conversions;
		
	}
	
	self.resetAllTracking = function(){
		QBDeleteCookie('qb_user_uuid');
		QBDeleteCookie('qb_bar_views');
		QBDeleteCookie('qb_bar_conversions');
	}
	
	self.trackView = function(){
		
		var bar_uuid = self.options.bar_uuid;
		var bar_views = self.getBarViews();
		
		//if bar_uuid == 0, don't track the view
		if(bar_uuid == 0){
			return;
		}
		
		
		if(bar_views.indexOf(bar_uuid) < 0){
			
			//if user hasn't viewed bar yet, track the view to the db then update locally
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: {
					action: 'qb_public_ajax',
					endpoint: 'save_view',
					user_uuid: self.getUserUuid(),
					bar_uuid: bar_uuid,
					qb_public_nonce: QB_GLOBALS.QB_PUBLIC_NONCE
				},
				success: function(){
					
					//push the current bar onto the list of viewed bars
					bar_views.push(bar_uuid);
					
					//persist viewed bars as cookie
					QBSetCookie('qb_bar_views', JSON.stringify(bar_views), 7);
					
				},
				dataType: 'json'
			});
		}
		
	}
	
	self.trackConversion = function(){
		
		var bar_uuid = self.options.bar_uuid;
		var bar_conversions = self.getBarConversions();
		
		//if bar_uuid == 0, don't track the view
		if(bar_uuid == 0){
			return;
		}
		
		
		if(bar_conversions.indexOf(bar_uuid) < 0){
			
			//if user hasn't viewed bar yet, track the view to the db then update locally
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: {
					action: 'qb_public_ajax',
					endpoint: 'save_conversion',
					user_uuid: self.getUserUuid(),
					bar_uuid: bar_uuid,
					qb_public_nonce: QB_GLOBALS.QB_PUBLIC_NONCE
				},
				success: function(){
					
					//push the current bar onto the list of viewed bars
					bar_conversions.push(bar_uuid);
					
					//persist viewed bars as cookie
					QBSetCookie('qb_bar_conversions', JSON.stringify(bar_conversions), 7);
					
				},
				dataType: 'json'
			});
		}
		
	}

}

jQuery(document).ready(function($){
	
	//if qbhide is toggled in URL, don't create & show the quickiebar
	//this is used on quickiebar.com for previewing the bar on third-party sites
	if(location.hash.indexOf('qbhide') > -1 || location.href.indexOf('wp-admin/admin.php') > -1){
		return;
	}
	
	qb = new QuickieBar();
	
	qb.fetchBar(function(bar){
		if(!bar || !bar.bar_uuid){//need to check bar_uuid also just in case default qb options come back (depending on php version & debuggin settings, this might happen)
			//if no bar is live, nothing more to do
			return;
		}
		
		//if debug mode is toggled on and qbshow is not specified in the url, don't show the bar
		if(bar.debug_mode == 'on' && location.hash.indexOf('qbshow') == -1){
			return;
		}
		
		//if fixed header compatibility mode is on, don't show if on mobile devices (< 900 px)
		if(bar.fixed_compatibility == 'on' && $('body').width() < 900){
			return;
		}
		
		qb.initAndShowBar(bar);
		
		//after bar is fetched, we will track view (if necessary)
		qb.trackView();
	});
	
});


/*
Sample Init Code:

qb.init({
	bar_height: 'regular',								// regular || thin || tall
	new_tab: 'enabled',										// true || false
	placement: 'top',											// top || bottom
	devices: 'all',												// all || desktoponly || mobileonly
	attribution: 'visible',								// visible || hidden
	alignment: 'leftright',								// centered || leftright
	sticky: 'enabled',										// true || false
	animation: 'slidein',									// slidein || none
	button_style: 'rounded',							// rounded || pill || square || outline
	close_button_visibility: 'onhover',		// onhover || alwaysshow || alwayshide

	color_bar_background: '#56C4C3',
	color_bar_text: '#FFFFFF',
	color_button_background: '#062332',
	color_button_text: '#FFFFFF',

	bar_text: 'Get the most powerful conversion dropdown for Wordpress {{arrow-right}}',
	button_text: 'FREE DOWNLOAD {{download}}'
});*/


function QBSetCookie(name, value, days) {
	var d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + '; path=/';
}

function QBGetCookie(name) {
    name += "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return false;
}

function QBDeleteCookie(name) {
	if(QBGetCookie(name)){
		QBSetCookie(name, '', -1);
	}
}

//creates 13 hexidecimal random number as hash / practical "uuid"
function QBGenerateUuid(){
	//return Math.random().toString(36).slice(2);
	
	var id = [];
	var hexDigits = "0123456789abcdef";
	for(var i = 0;i<13;i++){
		id[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	
	return id.join("");
}


function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

/*http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black*/
function GetLuminance(hex){
	var c = hex.substring(1);      // strip #
	var rgb = parseInt(c, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >>  8) & 0xff;  // extract green
	var b = (rgb >>  0) & 0xff;  // extract blue
	
	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
	
	return luma
}