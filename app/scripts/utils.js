var utils = (function (document, window, undefined) {

	'use strict';

	// JSONP requests
	// https://code.google.com/p/google-ajax-examples/source/browse/trunk/interactive_samples/samples/js/javascript/jsonp.js?r=430
	var requestJSONP = function (url, stream) {

		var script = document.createElement('script');
		script.src = url + 'badge.' + stream;
		script.type = 'text/javascript';
		document.getElementsByTagName('body')[0].appendChild(script);

	};

	// Query string
	var queryString = function () {

		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");

		for ( var i = 0; i < vars.length; i++ ) {

				var pair = vars[i].split("=");

				if ( typeof query_string[pair[0]] === "undefined" ) {

						query_string[pair[0]] = pair[1];

				} else if ( typeof query_string[pair[0]] === "string" ) {

						var arr = [ query_string[pair[0]], pair[1] ];
						query_string[ pair[0] ] = arr;

				} else {

						query_string[pair[0]].push(pair[1]);

				}

		}

		return query_string;

	};

	return {
		requestJSONP: requestJSONP,
		queryString: queryString
	};

})(document, window);