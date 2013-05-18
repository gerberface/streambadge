(function () {

    'use strict';

    // Global object
    var App = {};

    /*
            ___                  ____      _ __
           /   |  ____  ____    /  _/___  (_) /_
          / /| | / __ \/ __ \   / // __ \/ / __/
         / ___ |/ /_/ / /_/ / _/ // / / / / /_
        /_/  |_/ .___/ .___(_)___/_/ /_/_/\__/
              /_/   /_/
    */

    App.Init = function () {

        App.service = '';
        App.username = '';
        App.iframe_theme = '';
        App.image_theme = '';

        App.Cache();
        App.BindListeners();
        App.Methods();
        App.Util();

        // Initial textarea value
        App.generateCode();

        // Match media
        App.matchMediaTest();
        App.mediaSwitch();

        // Call match media on resize
        window.onresize = function () {
            App.matchMediaTest();
        };

        // Load footer ad
        App.dom.footer_section_ad.html("<iframe src='/ads/footer.html' style='border:none;height:250px;width:250px;'></iframe>");

        // Footer year
        var date = new Date();
        App.dom.year.html( date.getFullYear() );

        // Justin widget
        if ( App.dom.justin_widget.length ) {

            App.justinWidget();

        }

        // Twitch widget
        if ( App.dom.twitch_widget.length ) {

            App.twitchWidget();

        }

        // UStream widget
        if ( App.dom.ustream_widget.length ) {

            App.ustreamWidget();

        }

    };

    /*
            ___                 ______           __
           /   |  ____  ____   / ____/___ ______/ /_  ___
          / /| | / __ \/ __ \ / /   / __ `/ ___/ __ \/ _ \
         / ___ |/ /_/ / /_/ // /___/ /_/ / /__/ / / /  __/
        /_/  |_/ .___/ .___(_)____/\__,_/\___/_/ /_/\___/
              /_/   /_/
    */

    App.Cache = function () {

        // Cache selectors
        App.dom = {};

        // Code elements
        App.dom.iframe_code = $('#iframe-code');
        App.dom.html_code = $('#html-code');
        App.dom.bbcode_code = $('#bbcode-code');

        // Code elements - mobile
        App.dom.iframe_code_mobile = $('#iframe-code-mobile');
        App.dom.html_code_mobile = $('#html-code-mobile');
        App.dom.bbcode_code_mobile = $('#bbcode-code-mobile');

        // Custom theme controls
        App.dom.color_selector = $('.color-selector');
        App.dom.color_selectors = $('.color-selectors');
        App.dom.bg_color = $('#bg-color');
        App.dom.link_color = $('#link-color');
        App.dom.text_color = $('#text-color');

        // Badge preview elements
        App.dom.iframe_image_bbcode_preview = $('.iframe-preview,.image-preview,.bbcode-preview');

        // Preview buttons
        App.dom.preview = $('.preview');

        // Username input
        App.dom.username_input = $('#username-input');

        // Code section
        App.dom.section_code_code = $('#section-code, .code');

        // Service buttons
        App.dom.button = $('.button');

        // Single code element selector
        App.dom.iframe_html_bbcode_code = $('#iframe-code, #html-code, #bbcode-code');

        // iframe preview controls
        App.dom.iframe_preview = $('#iframe-preview');
        App.dom.iframe_preview_class = $('.iframe-preview');

        // image oreview controls
        App.dom.image_preview = $('#image-preview');
        App.dom.image_preview_class = $('.image-preview');

        // bbcode preview controls
        App.dom.bbcode_preview = $('#bbcode-preview');
        App.dom.bbcode_preview_class = $('.bbcode-preview');

        // Theme wrapper
        App.dom.section_theme = $('#section-theme');

        // Theme radio buttons
        App.dom.theme_input = $('.theme-input');

        //
        App.dom.section_username_section_code_code = $('#section-username, #section-code, .code');
        App.dom.section_username = $('#section-username');

        // Footer year
        App.dom.year = $('#year');

        // Main logo
        App.dom.logo = $('#logo');

        // Ads
        App.dom.header_ad = $('.header-ad');
        App.dom.footer_section_ad = $('.footer-section.ad');

        // Widgets
        App.dom.twitch_widget = $('#twitch-widget');
        App.dom.justin_widget = $('#justin-widget');
        App.dom.ustream_widget = $('#ustream-widget');

    };

    /*
            ___                  ____  _           ____    _      __
           /   |  ____  ____    / __ )(_)___  ____/ / /   (_)____/ /____  ____  ___  __________
          / /| | / __ \/ __ \  / __  / / __ \/ __  / /   / / ___/ __/ _ \/ __ \/ _ \/ ___/ ___/
         / ___ |/ /_/ / /_/ / / /_/ / / / / / /_/ / /___/ (__  ) /_/  __/ / / /  __/ /  (__  )
        /_/  |_/ .___/ .___(_)_____/_/_/ /_/\__,_/_____/_/____/\__/\___/_/ /_/\___/_/  /____/
              /_/   /_/
    */

    App.BindListeners = function () {

        // Event listeners

        // Service button click event
        App.dom.button.on('click', function () {

            var $this = $(this);

            if ( $this.hasClass('active') ) {

                App.serviceButtonClick( $this, '' );

            } else {

                App.serviceButtonClick( $this, $this.data('button') );

            }

        });

        // Theme click event
        App.dom.theme_input.on('click', function () {

            var theme = $(this).data('theme');

            switch ( theme ) {

                case 'light':
                    App.iframe_theme = '&theme=light';
                    App.image_theme = 'light/';
                    App.dom.color_selectors.slideUp();
                    break;

                case 'dark':
                    App.iframe_theme = '&theme=dark';
                    App.image_theme = 'dark/';
                    App.dom.color_selectors.slideUp();
                    break;

                case 'custom':
                    App.iframe_theme = '&theme=custom&bg=' + App.dom.bg_color.val().replace('#','') + '&link=' + App.dom.link_color.val().replace('#','') + '&text=' + App.dom.text_color.val().replace('#','');
                    App.image_theme = 'custom/' + App.dom.bg_color.val().replace('#','') + '/' + App.dom.link_color.val().replace('#','') + '/' + App.dom.text_color.val().replace('#','') + '/';
                    App.dom.color_selectors.slideToggle();
                    break;

                default:
                    App.iframe_theme = '&theme=light';
                    App.image_theme = 'light/';
                    App.dom.color_selectors.slideUp();
                    break;

            }

            if ( App.dom.username_input === '' ) {

                App.dom.preview.addClass('available').removeClass('active');

            }

            App.dom.iframe_image_bbcode_preview.slideUp();
            App.generateCode();

        });

        App.dom.color_selector.on('change', function() {

            var color_selection, bg_color, link_color, text_color, $this_color;

            color_selection = $(this).data('color-selector');
            bg_color = App.dom.bg_color.val().replace('#','');
            link_color = App.dom.link_color.val().replace('#','');
            text_color = App.dom.text_color.val().replace('#','');
            $this_color = $(this).val().replace('#','');

            switch ( color_selection ) {

                case 'bg-color':
                    App.iframe_theme = '&theme=custom&bg=' + $this_color + '&link=' + link_color + '&text=' + text_color;
                    App.image_theme = 'custom/' + $this_color + '/' + link_color + '/' + text_color + '/';
                    break;

                case 'link-color':
                    App.iframe_theme = '&theme=custom&bg=' + bg_color + '&link=' + $this_color + '&text=' + text_color;
                    App.image_theme = 'custom/' + bg_color + '/' + $this_color + '/' + text_color + '/';
                    break;

                case 'text-color':
                    App.iframe_theme = '&theme=custom&bg=' + bg_color + '&link=' + link_color + '&text=' + $this_color;
                    App.image_theme = 'custom/' + bg_color + '/' + link_color + '/' + $this_color + '/';
                    break;

                default:
                    break;

            }

            App.dom.iframe_image_bbcode_preview.slideUp();

            if ( App.username !== '' ) {

                App.dom.preview.addClass('available').removeClass('active');

            }

            App.generateCode();

        });

        // Username input event
        App.dom.username_input.keyup(function() {

            var $this = $(this);

            if ( $this.val() === "" ) {

                $this = "";
                App.dom.section_code_code.removeClass("active");
                App.dom.preview.removeClass("available").removeClass("active");

            } else {

                App.dom.section_code_code.addClass("active");

                if ( App.dom.button.hasClass("active") ) {

                    App.dom.preview.addClass("available").removeClass("active");

                } else {

                    App.dom.preview.removeClass("available").removeClass("active");

                }
            }

            App.username = $this.val();
            App.dom.iframe_image_bbcode_preview.slideUp();
            App.generateCode();

        });

        // Select all on focus
        App.dom.iframe_html_bbcode_code.on('focus', function () {

            var $this = $(this);

            $this.select();

            $this.on('mouseup', function () {

                $this.unbind('mouseup');
                return false;

            });

        });

        // Preview button click event
        App.dom.preview.on('click', function () {

            var $this, preview_button;

            $this = $(this);
            preview_button = $this.data('preview');

            switch ( preview_button ) {

                case 'iframe':
                    App.dom.iframe_preview.attr('src','http://streambadge.com/' + App.service + '/?username=' + App.username + App.iframe_theme);
                    App.dom.iframe_preview_class.slideToggle();
                    break;

                case 'image':
                    App.dom.image_preview.attr('src','http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png');
                    App.dom.image_preview_class.slideToggle();
                    break;

                case 'bbcode':
                    App.dom.bbcode_preview.attr('src','http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png');
                    App.dom.bbcode_preview_class.slideToggle();
                    break;

                default:
                    break;

            }

            $this.toggleClass("available").toggleClass("active");
            return false;

        });

    };

    /*
            ___                  __  ___     __  __              __
           /   |  ____  ____    /  |/  /__  / /_/ /_  ____  ____/ /____
          / /| | / __ \/ __ \  / /|_/ / _ \/ __/ __ \/ __ \/ __  / ___/
         / ___ |/ /_/ / /_/ / / /  / /  __/ /_/ / / / /_/ / /_/ (__  )
        /_/  |_/ .___/ .___(_)_/  /_/\___/\__/_/ /_/\____/\__,_/____/
              /_/   /_/
    */

    App.Methods = function () {

        // Custom functions

        App.generateCode = function () {

            App.dom.iframe_code.html('<iframe src="http://streambadge.com/' + App.service + '/?username=' + App.username + App.iframe_theme + '" style="border:none;height:64px;width:100%"></iframe>');
            App.dom.html_code.html('<a href="http://' + App.service + '.tv/' + App.username + '"><img src="http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png" width="300" height="64" alt="' + App.username + '\'s Streambadge"></a>');
            App.dom.bbcode_code.html('[url=http://' + App.service + '.tv/' + App.username + '][img]http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png[/img][/url]');

            // Mobile
            App.dom.iframe_code_mobile.html('&lt;iframe src="http://streambadge.com/' + App.service + '/?username=' + App.username + App.iframe_theme + '" style="border:none;height:64px;width:100%"&gt;&lt;/iframe&gt;');
            App.dom.html_code_mobile.html('&lt;a href="http://' + App.service + '.tv/' + App.username + '"&gt;&lt;img src="http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png" width="300" height="64" alt="' + App.username + '\'s Streambadge"&gt;&lt;/a&gt;');
            App.dom.bbcode_code_mobile.html('[url=http://' + App.service + '.tv/' + App.username + '][img]http://streambadge.com/' + App.service + '/' + App.image_theme + App.username + '.png[/img][/url]');

        };

        // Service button method
        App.serviceButtonClick = function ( button, service ) {

            // Theme
            if ( service === 'twitch' ) {

                App.dom.section_theme.slideDown();

            } else {

                App.dom.section_theme.slideUp();
                App.iframe_theme = '';
                App.image_theme = '';
                App.dom.theme_input.prop('checked', false);
                App.dom.color_selectors.slideUp();

            }

            if ( button.hasClass('active') ) {

                App.dom.button.removeClass('active').removeClass('disabled');
                App.dom.username_input.val('');
                App.username = '';
                App.dom.username_input.attr('readonly','readonly').addClass('readonly');
                App.dom.section_username_section_code_code.removeClass('active');
                App.dom.preview.removeClass('available');

            } else {

                App.dom.button.addClass('disabled').removeClass('active');
                App.dom.username_input.removeAttr('readonly').removeClass('readonly').focus();
                App.dom.section_username.addClass('active');
                button.addClass('active').removeClass('disabled');

                if ( App.dom.username_input.val() === '' ) {

                    App.dom.preview.removeClass('available');

                } else {

                    App.dom.preview.addClass('available');

                }
            }

            App.dom.iframe_image_bbcode_preview.slideUp();
            App.dom.preview.removeClass('active');
            App.service = service;
            App.generateCode();

        };

        // Media Queries
        App.matchMediaTest = function () {

            var media = App.currentMedia;

            if ( matchMedia('only screen and (max-width: 30em)').matches ) {

                App.currentMedia = 'small';

            } else if ( matchMedia('only screen and (min-width: 30em) and (max-width: 45em)').matches ) {

                App.currentMedia = 'medium';

            } else if ( matchMedia('only screen and (min-width: 45em)').matches ) {

                App.currentMedia = 'large';

            }

            // On resize
            if ( media !== App.currentMedia ) {

                App.mediaSwitch();

            }

        };

        App.mediaSwitch = function () {

            switch (App.currentMedia) {

                case 'none':
                    App.dom.header_ad.empty();
                    break;

                case 'small':
                    App.dom.header_ad.empty().html('<iframe src="ads/header-medium.html" style="border:none;height:60px;width:234px;"></iframe>');
                    break;

                case 'medium':
                    App.dom.header_ad.empty().html('<iframe src="/ads/header-wide.html" style="border:none;height:60px;width:468px;"></iframe>');
                    break;

                case 'large':
                    App.dom.header_ad.empty().html('<iframe src="/ads/header-super.html" style="border:none;height:90px;width:728px;"></iframe>');
                    break;

                default:
                    break;

            }

        };

        // Justin widget
        App.justinWidget = function () {

            App.justin_widget = {};
            App.justin_widget.$justin_widget = App.dom.justin_widget;
            App.justin_widget.username = App.queryString.username;

            if ( typeof App.justin_widget.username === 'undefined' || App.justin_widget.username === '' ) {

                App.justin_widget.html('<ul><li>Please add a username</li></ul>');

            } else {

                $.getJSON('http://api.justin.tv/api/stream/list.json?channel=' + App.justin_widget.username + '&jsonp=?', function(data) {

                    if ( data[0] ) {

                        App.justin_widget.$justin_widget.html('<ul class="justin-widget-list"><li class="user-name"><a href="http://justin.tv/' + App.justin_widget.username + '" target="_blank"><img src="' + data[0].channel.image_url_small + '" width="44" height="44" alt="' + App.justin_widget.username + ' channel logo" class="icon">' + App.justin_widget.username + '</a></li><li class="live"><b>LIVE</b> <span class="online"></span> ' + data[0].title + '</li><li class="viewers"><img src="/img/eye-gray.png" width="14" height="14" alt="" class="icon-eye"> ' + data[0].channel_count + '</li></ul>');

                    } else {

                        $.getJSON('http://api.justin.tv/api/channel/show/list.json?channel=' + App.justin_widget.username + '&jsonp=?', function(data) {

                           App.justin_widget.$justin_widget.html('<ul class="justin-widget-list"><li><a href="http://justin.tv/' + App.justin_widget.username + '" class="user-name" target="_blank"><img src="' + data.image_url_small + '" width="44" height="44" alt="' + App.justin_widget.username + ' channel logo" class="icon">' + App.justin_widget.username + '</a></li><li class="live"><b>Offline</b></li></ul>');
                        });

                    }

                });

            }

        };

        // Twitch widget
        App.twitchWidget = function () {

            App.twitch_widget = {};
            App.twitch_widget.api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";
            App.twitch_widget.username = App.queryString.username;
            App.twitch_widget.theme = (App.queryString.theme ? App.queryString.theme : "light");
            App.twitch_widget.bg_color = 'style="background:#' + App.queryString.bg + '"';
            App.twitch_widget.link_color = 'style="color:#' + App.queryString.link + '"';
            App.twitch_widget.text_color = 'style="color:#' + App.queryString.text + '"';
            App.twitch_widget.$twitch_widget = App.dom.twitch_widget;

            if ( typeof App.twitch_widget.username === 'undefined' || App.twitch_widget.username === '' ) {

                App.twitch_widget.$twitch_widget.html('<div class="twitch-widget ' + App.twitch_widget.theme + '" ' + App.twitch_widget.bg_color + '><ul><li ' + App.twitch_widget.text_color + '>Please add a username</li></ul></div>');

            } else {

                $.getJSON('https://api.twitch.tv/kraken/streams/' + App.twitch_widget.username + '?client_id=' + App.twitch_widget.api_key + '&callback=?', function(data) {

                    if ( data.stream ) {

                        if ( data.stream.channel.logo ) {

                            App.twitch_widget.image = data.stream.channel.logo;

                        } else {

                            App.twitch_widget.image = "/img/twitch-no-image.png";

                        }

                        App.twitch_widget.$twitch_widget.html('<div class="twitch-widget ' + App.twitch_widget.theme + '" ' + App.twitch_widget.bg_color + '><ul class="twitch-widget-list"><li class="user-name"><a href="http://twitch.tv/' + App.twitch_widget.username + '" target="_blank" ' + App.twitch_widget.link_color + '><img src="' + App.twitch_widget.image + '" width="44" height="44" alt="' + App.twitch_widget.username + '" channel logo" class="icon">' + App.twitch_widget.username + '</a></li><li class="live" ' + App.twitch_widget.text_color + '><b>LIVE</b> <span class="online"></span> playing ' + (data.stream.game ? '<a href="http://www.twitch.tv/directory/game/' + encodeURIComponent(data.stream.game) + '" target="_blank" ' + App.twitch_widget.link_color + '>' + data.stream.game + '</a>' : '') + '</li><li class="viewers" ' + App.twitch_widget.text_color + '><span aria-hidden="true" class="icon-eye"></span><span class="viewer-number">' + data.stream.viewers + '</span></li></ul></div>');

                    } else {

                        $.getJSON('https://api.twitch.tv/kraken/channels/' + App.twitch_widget.username + '?client_id=' + App.twitch_widget.api_key + '&callback=?', function(data) {

                            if ( data.logo ) {

                                App.twitch_widget.image = data.logo;

                            } else {

                                App.twitch_widget.image = "/img/twitch-no-image.png";

                            }

                            App.twitch_widget.$twitch_widget.html('<div class="twitch-widget ' + App.twitch_widget.theme + '" ' + App.twitch_widget.bg_color + '><ul class="twitch-widget-list"><li><a href="http://twitch.tv/' + App.twitch_widget.username + '" class="user-name" target="_blank" ' + App.twitch_widget.link_color + '><img src="' + App.twitch_widget.image + '" width="44" height="44" alt="' + App.twitch_widget.username + ' channel logo" class="icon">' + App.twitch_widget.username + '</a></li><li class="live" ' + App.twitch_widget.text_color + '><b>Offline</b></li></ul></div>');

                        });

                    }

                });

            }

        };

        // Ustream widget
        App.ustreamWidget = function () {

            App.ustream_widget = {};
            App.ustream_widget.$ustream_widget = App.dom.ustream_widget;
            App.ustream_widget.api_key = "EE028473488E26E1424E67B209A3C423";
            App.ustream_widget.username = App.queryString.username;

            if ( typeof App.ustream_widget.username === 'undefined' || App.ustream_widget.username === '' ) {

                App.ustream_widget.$ustream_widget.html('<ul><li>Please add a username</li></ul>');

            } else {

                $.getJSON('http://api.ustream.tv/json/channel/live/search/username:eq:' + App.ustream_widget.username + '?key=' + App.ustream_widget.api_key + '&callback=?', function(data) {

                    if ( data !== null ) {

                        App.ustream_widget.$ustream_widget.html('<ul class="ustream-widget-list"><li class="user-name"><a href="http://ustream.tv/' + App.ustream_widget.username + '" target="_blank"><img src="' + data[0].imageUrl.small + '" width="44" height="44" alt="' + App.ustream_widget.username + ' channel logo" class="icon">' + App.ustream_widget.username + '</a></li><li class="live"><b>LIVE</b> <span class="online"></span> ' + data[0].title + '</li><li class="viewers"><img src="/img/eye-gray.png" width="14" height="14" alt="" class="icon-eye"> ' + data[0].viewersNow + '</li></ul>');

                    } else {

                        $.getJSON('http://api.ustream.tv/json/user/' + App.ustream_widget.username + '/getInfo?key=' + App.ustream_widget.api_key + '&callback=?', function(data) {

                            if ( data !== null ) {

                                App.ustream_widget.$ustream_widget.html('<ul class="ustream-widget-list"><li class="user-name"><a href="http://ustream.tv/' + App.ustream_widget.username + '" target="_blank"><img src="' + data.imageUrl.small + '" width="44" height="44" alt="' + App.ustream_widget.username + ' channel logo" class="icon">' + App.ustream_widget.username + '</a></li><li class="live"><b>Offline</b></li></ul>');

                            } else {

                                App.ustream_widget.$ustream_widget.html('<ul class="ustream-widget-list"><li class="user-name"><a href="http://ustream.tv/' + App.ustream_widget.username + '" target="_blank"><img src="/img/ustream-no-image.png" width="44" height="44" alt="" class="icon">' + App.ustream_widget.username + '</a></li><li class="live"><b>Offline</b></li></ul>');

                            }

                        });

                    }

                });

            }

        };

    };

    /*
            ___                 __  ____  _ __
           /   |  ____  ____   / / / / /_(_) /
          / /| | / __ \/ __ \ / / / / __/ / /
         / ___ |/ /_/ / /_/ // /_/ / /_/ / /
        /_/  |_/ .___/ .___(_)____/\__/_/_/
              /_/   /_/
    */

    App.Util = function () {

        // Util functions

        // Query string
        App.queryString = function () {

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

        }();

    };

    // Start all the things!
    App.Init();

})();