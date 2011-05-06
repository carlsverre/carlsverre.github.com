// Load jQuery

var debugMode = false;

function trackAndGo(link, title) {
	mpmetrics.track("clicked_skill", {
		'skill': title
	}, function() {
		window.location = link;
	});
}

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) { uri[o.key[i]] = m[i] || ""; }

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) { uri[o.q.name][$1] = $2; }
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

// end parseUri
function get_pageview_info() {
    var mp_referrer = document.referrer,
        mp_browser = browser(),
        mp_platform = os(),
        mp_page = document.location.href,
        props = {};

    if (mp_referrer.length) { props.mp_referrer = mp_referrer } 
    if (mp_browser.length) { props.mp_browser = mp_browser } 
    if (mp_platform.length) { props.mp_platform = mp_platform } 
    if (mp_page.length) { props.mp_page = mp_page } 

    return props;
}

function init() {
	$('.boxgrid.caption').hover(function() {
		$('.cover', this).stop().animate({top:'181px'},{queue:false,duration:160});
	}, function() {
		$('.cover', this).stop().animate({top:'200px'},{queue:false,duration:160});
	});
	
	var loc = parseUri(location.host);
	debugMode = (loc && loc.host === 'localhost');

	// track the visiting event
	if(!debugMode) {
		$('.mixpanel-track-click').each(function(i, link) {
			$(link).click(function(event) {
				event.preventDefault();
				trackAndGo(link.href,link.title);
			});
		});
		
//		var referrer = parseUri(document.referrer);
//		mpmetrics.register({
//			'referrer': referrer.host,
//			'mp_source': referrer.host
//		});
//		mpmetrics.track("visit");
        mpmetrics.track("mp_page_view", get_pageview_info());
	}
}
