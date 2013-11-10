// Twitch widget
var badge = (function (document, window, undefined) {

    'use strict';

    // Common vars
    var service, apiKey, username, bgColor, linkColor, textColor, theme, badge, image, link, title, viewerCount, streamURL, channelURL;

    // Find service in URL
    if (window.location.href.indexOf('twitch') !== -1) {
        service = 'twitch';
    }
    if (window.location.href.indexOf('justin') !== -1) {
        service = 'justin';
    }
    if (window.location.href.indexOf('ustream') !== -1) {
        service = 'ustream';
    }

    username = utils.queryString().username;
    bgColor = utils.queryString().bg ? 'style="background:#' + utils.queryString().bg + '"' : '';
    linkColor = utils.queryString().link ? 'style="color:#' + utils.queryString().link + '"' : '';
    textColor = utils.queryString().text ? 'style="color:#' + utils.queryString().text + '"' : '';
    badge = document.querySelector('[data-js=badge]');
    image = '/images/' + service + '-no-image.png';

    // Service specific vars
    switch (service) {
        case 'twitch':
            apiKey = '5j0r5b7qb7kro03fvka3o8kbq262wwm';
            theme = utils.queryString().theme ? utils.queryString().theme : 'light';
            streamURL = 'https://api.twitch.tv/kraken/streams/' + username + '?client_id=' + apiKey + '&callback=';
            channelURL = 'https://api.twitch.tv/kraken/channels/' + username + '?client_id=' + apiKey + '&callback=';
            break;

        case 'justin':
            streamURL = 'http://api.justin.tv/api/stream/list.json?channel=' + username + '&jsonp=';
            channelURL = 'http://api.justin.tv/api/channel/show/' + username + '.json?jsonp=';
            break;

        case 'ustream':
            apiKey = 'EE028473488E26E1424E67B209A3C423';
            streamURL = 'http://api.ustream.tv/json/channel/live/search/username:eq:' + username + '?key=' + apiKey + '&callback=';
            channelURL = 'http://api.ustream.tv/json/user/' + username + '/getInfo?key=' + apiKey + '&callback=';
            break;

    }

    var init = function () {

        // Set background color if available
        document.body.style.backgroundColor = utils.queryString().bg ? '#' + utils.queryString().bg : '';

        // Check if service/username is present
        if ( typeof service === 'undefined' || service === '' ) {
            badge.innerHTML = '<div class="badge badge--' + service + ' ' + theme + '" ' + bgColor + '><ul><li ' + textColor + '>Please select a service</li></ul></div>';
        } else if ( typeof username === 'undefined' || username === '' ) {
            badge.innerHTML = '<div class="badge badge--' + service + ' ' + theme + '" ' + bgColor + '><ul><li ' + textColor + '>Please select a username</li></ul></div>';
        } else {
            // Get Stream data
            utils.requestJSONP(streamURL, 'drawStream');
        }

    };

    var drawStream = function ( data ) {

        // Service specific output
        switch (service) {
            case 'twitch':

                link = 'http://twitch.tv/' + username;
                if ( data.stream ) {
                    image = data.stream.channel.logo;
                    title = ' playing ' + (data.stream.game ? '<a href="http://www.twitch.tv/directory/game/' + encodeURIComponent(data.stream.game) + '" target="_blank" ' + linkColor + '>' + data.stream.game + '</a>' : '');
                    viewerCount = data.stream.viewers;
                } else {
                    // Get Channel data
                    utils.requestJSONP(channelURL, 'drawChannel');
                }

                break;

            case 'justin':

                console.log(data);

                link = 'http://justin.tv/' + username;
                if ( data ) {
                    image = data[0].channel.image_url_small;
                    title = data[0].title;
                    viewerCount = data[0].channel_count;
                } else {
                    // Get Channel data
                    utils.requestJSONP(channelURL, 'drawChannel');
                }

                break;

            case 'ustream':

                link = 'http://ustream.tv/' + username;
                if ( data !== null ) {
                    image = data[0].imageUrl.small;
                    title = data[0].title;
                    viewerCount = data[0].viewersNow;
                } else {
                    // Get Channel data
                    utils.requestJSONP(channelURL, 'drawChannel');
                }

                break;

        }

        badge.innerHTML = '<div class="badge badge--' + service + ' ' + theme + '" ' + bgColor + '>' +
                            '<ul class="badge__list">' +
                                '<li class="badge__user-name">' +
                                    '<a href="' + link + '" target="_blank" ' + linkColor + '>' +
                                        '<img src="' + image + '" width="44" height="44" alt="' + username + '" channel logo" class="badge__icon">' + username +
                                    '</a>' +
                                '</li>' +
                                '<li class="badge__live" ' + textColor + '>' +
                                    '<b>LIVE</b> <span class="badge__online"></span> ' + title +
                                '</li>' +
                                '<li class="badge__viewers" ' + textColor + '>' +
                                    '<span aria-hidden="true" class="badge__icon-eye"></span><span class="badge__viewer-number">' + viewerCount + '</span>' +
                                '</li>' +
                            '</ul>' +
                        '</div>';

    };

    var drawChannel = function ( data ) {

        // Service specific output
        switch (service) {
            case 'twitch':
                link = 'http://twitch.tv/' + username;
                if ( data.logo ) {
                    image = data.logo;
                }
                break;

            case 'justin':
                link = 'http://justin.tv/' + username;
                if ( data.image_url_small ) {
                    image = data.image_url_small;
                }
                break;

            case 'ustream':
                link = 'http://ustream.tv/' + username;
                if ( data !== null ) {
                    image = data.imageUrl.small;
                }
                break;

        }

        badge.innerHTML = '<div class="badge badge--' + service + ' ' + theme + '" ' + bgColor + '>' +
                            '<ul class="badge__list">' +
                                '<li>' +
                                    '<a href="' + link + '" class="badge__user-name" target="_blank" ' + linkColor + '>' +
                                        '<img src="' + image + '" width="44" height="44" alt="' + username + ' channel logo" class="badge__icon">' + username +
                                    '</a>' +
                                '</li>' +
                                '<li class="badge__live" ' + textColor + '><b>Offline</b></li>' +
                            '</ul>' +
                        '</div>';

    };

    return {
        init: init,
        drawStream: drawStream,
        drawChannel: drawChannel
    };

})(document, window);

badge.init();