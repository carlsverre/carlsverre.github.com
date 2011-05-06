// Load jQuery

var debugMode = false;

function trackAndGo(link, title) {
	mpmetrics.track(debugify("clicked_skill"), {
		'skill': title
	}, function() {
		window.location = link;
	});
}

function browser() {
    var a = navigator.userAgent;
    if (window.opera) {
        return "Opera";
    } else if (/chrom/i.test(a)) {
        return "Chrome"; 
    } else if (/msie/i.test(a)) {
        return "Internet Explorer";
    } else if (/AppleWebKit/.test(navigator.appVersion)) {
        return "Safari";
    } else if (/mozilla/i.test(a) && !/compatible|webkit/i.test(a)) {
        return "Firefox";
    } else {
        return "";
    }
}

function os() {
    var a = navigator.userAgent;
    if (/Windows/i.test(a)) {
        return 'Windows';
    } else if (/iPhone/.test(a)) {
        return 'iPhone';
    } else if (/Android/.test(a)) {
        return 'Android';
    } else if (/Mac/i.test(a)) {
        return 'Mac OS X';
    } else if (/X11/.test(a) || /Linux/.test(a)) {
        return 'Linux';
    } else {
        return '';   
    }
}

function get_pageview_info() {
    var mp_referrer = document.referrer,
        mp_browser = browser(),
        mp_platform = os(),
        mp_page = document.location.href,
        props = {};

    if (mp_referrer.length) { props.mp_referrer = props.referrer = mp_referrer }
    if (mp_browser.length) { props.mp_browser = mp_browser } 
    if (mp_platform.length) { props.mp_platform = mp_platform } 
    if (mp_page.length) { props.mp_page = mp_page } 

    return props;
}

function debugify(evt) {
    if(debugMode) return evt + "_debug";
    else return evt;
}

function init() {
	$('.boxgrid.caption').hover(function() {
		$('.cover', this).stop().animate({top:'181px'},{queue:false,duration:160});
	}, function() {
		$('.cover', this).stop().animate({top:'200px'},{queue:false,duration:160});
	});
	
	debugMode = location.host.search('localhost') != -1;

	// track the visiting event
    $('.mixpanel-track-click').each(function(i, link) {
        $(link).click(function(event) {
            event.preventDefault();
            trackAndGo(link.href,link.title);
        });
    });
    
    mpmetrics.register(get_pageview_info());
    mpmetrics.track(debugify("visit"));
}
