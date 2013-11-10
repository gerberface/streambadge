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

		var queryString = {},
			query = window.location.search.substring(1),
			vars = query.split('&');

		for ( var i = 0; i < vars.length; i++ ) {

			var pair = vars[i].split('=');

			if ( typeof queryString[pair[0]] === 'undefined' ) {

				queryString[pair[0]] = pair[1];

			} else if ( typeof queryString[pair[0]] === 'string' ) {

				var arr = [ queryString[pair[0]], pair[1] ];
				queryString[ pair[0] ] = arr;

			} else {

				queryString[pair[0]].push(pair[1]);

			}

		}

		return queryString;

	};

	return {
		requestJSONP: requestJSONP,
		queryString: queryString
	};

})(document, window);