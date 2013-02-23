(function() {
    var com = {};
    com.sb = {};
    com.sb.service = "";
    com.sb.username = "";
    com.sb.iframe_theme = "";
    com.sb.image_theme = "";

    // Cached jQuery selectors
    com.$selectors = {};
    com.$selectors.iframe_code = $("#iframe-code");
    com.$selectors.html_code = $("#html-code");
    com.$selectors.bbcode_code = $("#bbcode-code");
    com.$selectors.iframe_code_mobile = $("#iframe-code-mobile");
    com.$selectors.html_code_mobile = $("#html-code-mobile");
    com.$selectors.bbcode_code_mobile = $("#bbcode-code-mobile");
    com.$selectors.twitch_button = $("#twitch-button");
    com.$selectors.justin_button = $("#justin-button");
    com.$selectors.ustream_button = $("#ustream-button");
    com.$selectors.theme_light = $("#theme-light");
    com.$selectors.theme_dark = $("#theme-dark");
    com.$selectors.iframe_image_bbcode_preview = $(".iframe-preview,.image-preview,.bbcode-preview");
    com.$selectors.preview = $(".preview");
    com.$selectors.username_input = $("#username-input");
    com.$selectors.section_code_code = $("#section-code, .code");
    com.$selectors.button = $(".button");
    com.$selectors.iframe_html_bbcode_code = $("#iframe-code, #html-code, #bbcode-code");
    com.$selectors.iframe_preview_button = $("#iframe-preview-button");
    com.$selectors.iframe_preview = $("#iframe-preview");
    com.$selectors.iframe_preview_class = $(".iframe-preview");
    com.$selectors.image_preview_button = $("#image-preview-button");
    com.$selectors.image_preview = $("#image-preview");
    com.$selectors.image_preview_class = $(".image-preview");
    com.$selectors.bbcode_preview_button = $("#bbcode-preview-button");
    com.$selectors.bbcode_preview = $("#bbcode-preview");
    com.$selectors.bbcode_preview_class = $(".bbcode-preview");
    com.$selectors.section_theme = $("#section-theme");
    com.$selectors.theme_input = $(".theme-input");
    com.$selectors.section_username_section_code_code = $("#section-username, #section-code, .code");
    com.$selectors.section_username = $("#section-username");
    com.$selectors.year = $("#year");
    com.$selectors.logo = $("#logo");

    com.sb.generateCode = function() {
        com.$selectors.iframe_code.html('<iframe src="http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username + com.sb.iframe_theme + '" style="border:none;height:64px;width:100%"></iframe>');
        com.$selectors.html_code.html('<a href="http://' + com.sb.service + '.tv/' + com.sb.username + '"><img src="http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png" alt=""></a>');
        com.$selectors.bbcode_code.html('[url=http://' + com.sb.service + '.tv/' + com.sb.username + '][img]http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png[/img][/url]');
        // Mobile
        com.$selectors.iframe_code_mobile.html('&lt;iframe src="http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username + com.sb.iframe_theme + '" style="border:none;height:64px;width:100%"&gt;&lt;/iframe&gt;');
        com.$selectors.html_code_mobile.html('&lt;a href="http://' + com.sb.service + '.tv/' + com.sb.username + '"&gt;&lt;img src="http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png" alt=""&gt;&lt;/a&gt;');
        com.$selectors.bbcode_code_mobile.html('[url=http://' + com.sb.service + '.tv/' + com.sb.username + '][img]http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png[/img][/url]');
    };

    // Initial textarea value
    com.sb.generateCode();

    // Service button click event
    com.$selectors.twitch_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "twitch");
        }
    });

    com.$selectors.justin_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "justin");
        }
    });

    com.$selectors.ustream_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "ustream");
        }
    });

    // Theme click event
    com.$selectors.theme_light.click(function() {
        com.sb.iframe_theme = "&theme=light";
        com.sb.image_theme = "light/";
        com.sb.generateCode();
        com.$selectors.iframe_image_bbcode_preview.slideUp();
        if (com.sb.username != "") {
            com.$selectors.preview.addClass("available").removeClass("active");
        }
    });

    com.$selectors.theme_dark.click(function() {
        com.sb.iframe_theme = "&theme=dark";
        com.sb.image_theme = "dark/";
        com.sb.generateCode();
        com.$selectors.iframe_image_bbcode_preview.slideUp();
        if (com.sb.username != "") {
            com.$selectors.preview.addClass("available").removeClass("active");
        }
    });

    // Username input event
    com.$selectors.username_input.keyup(function() {
        var $this = $(this);

        if ($this.val() === "") {
            $this = "";
            com.$selectors.section_code_code.removeClass("active");
            com.$selectors.preview.removeClass("available").removeClass("active");
        } else {
            com.$selectors.section_code_code.addClass("active");
            if (com.$selectors.button.hasClass("active")) {
                com.$selectors.preview.addClass("available").removeClass("active");
            } else {
                com.$selectors.preview.removeClass("available").removeClass("active");
            }
        }

        com.sb.username = $this.val();
        com.sb.generateCode();

        com.$selectors.iframe_image_bbcode_preview.slideUp();
    });

    // Select all on focus
    com.$selectors.iframe_html_bbcode_code.focus(function() {
        var $this = $(this);
        $this.select();
        $this.mouseup(function() {
            $this.unbind("mouseup");
            return false;
        });
    });

    // Preview button click event
    com.$selectors.iframe_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        com.$selectors.iframe_preview.attr('src','http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username + com.sb.iframe_theme);
        com.$selectors.iframe_preview_class.slideToggle();
        return false;
    });

    com.$selectors.image_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        com.$selectors.image_preview.attr('src','http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png');
        com.$selectors.image_preview_class.slideToggle();
        return false;
    });

    com.$selectors.bbcode_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        com.$selectors.bbcode_preview.attr('src','http://streambadge.com/' + com.sb.service + '/' + com.sb.image_theme + com.sb.username + '.png');
        com.$selectors.bbcode_preview_class.slideToggle();
        return false;
    });

    // Service button method
    var button_click = function(button, service) {
        // Theme
        if (service == "twitch") {
            com.$selectors.section_theme.slideDown();
        } else {
            com.$selectors.section_theme.slideUp();
            com.sb.iframe_theme = "";
            com.sb.image_theme = "";
            com.$selectors.theme_input.prop('checked', false);
        }

        if (button.hasClass("active")) {
            com.$selectors.button.removeClass("active").removeClass("disabled");
            com.$selectors.username_input.val("");
            com.sb.username = "";
            com.$selectors.username_input.attr("readonly","readonly").addClass("readonly");
            com.$selectors.section_username_section_code_code.removeClass("active");
        } else {
            com.$selectors.button.addClass("disabled").removeClass("active");
            com.$selectors.username_input.removeAttr("readonly").removeClass("readonly").focus();
            com.$selectors.section_username.addClass("active");
            button.addClass("active").removeClass("disabled");
            if (com.$selectors.username_input.val() === "") {
                com.$selectors.preview.removeClass("available");
            } else {
                com.$selectors.preview.addClass("available");
            }
        }

        com.$selectors.iframe_image_bbcode_preview.slideUp();
        com.$selectors.preview.removeClass("active");
        com.sb.service = service;
        com.sb.generateCode();
    };

    var date = new Date();
    com.$selectors.year.html(date.getFullYear());

    com.$selectors.logo.fitText(1.2, { minFontSize: '25px', maxFontSize: '50px' });

    // Query string
    com.sb.query_string = function () {
        var _query_string = {};
        var _query = window.location.search.substring(1);
        var _vars = _query.split("&");

        for ( var i = 0; i < _vars.length; i++ ) {
            var _pair = _vars[i].split("=");
            if ( typeof _query_string[_pair[0]] === "undefined" ) {
                _query_string[_pair[0]] = _pair[1];
            } else if ( typeof _query_string[_pair[0]] === "string" ) {
                var _arr = [ _query_string[_pair[0]], _pair[1] ];
                _query_string[_pair[0]] = _arr;
            } else {
                _query_string[_pair[0]].push(_pair[1]);
            }
        }

        return _query_string;
    }();

    // Justin widget
    com.sb.justin_widget = {};
    com.sb.justin_widget.$justin_widget = $("#justin-widget");

    com.sb.justin_widget.username = com.sb.query_string.username;

    if (typeof(com.sb.justin_widget.username) === 'undefined' || com.sb.justin_widget.username === "") {
        com.sb.justin_widget.$justin_widget.html("<ul><li>Please add a username</li></ul>");
    } else {
        $.getJSON('http://api.justin.tv/api/stream/list.json?channel=' + com.sb.justin_widget.username + '&callback=?', function(data) {
            if (data[0]) {
                com.sb.justin_widget.$justin_widget.html("<ul class='justin-widget-list'><li class='user-name'><a href='http://justin.tv/" + com.sb.justin_widget.username + "' target='_blank'><img src='" + data[0].channel.image_url_small + "' width='44' height='44' alt='" + com.sb.justin_widget.username + " channel logo' class='icon'>" + com.sb.justin_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> " + data[0].title + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data[0].channel_count + "</li></ul>");
            } else {
                $.getJSON('http://api.justin.tv/api/channel/show/list.json?channel=' + com.sb.justin_widget.username + '&callback=?', function(data) {
                    com.sb.justin_widget.$justin_widget.html("<ul class='justin-widget-list'><li><a href='http://justin.tv/" + com.sb.justin_widget.username + "' class='user-name' target='_blank'><img src='" + data.image_url_small + "' width='44' height='44' alt='" + com.sb.justin_widget.username + " channel logo' class='icon'>" + com.sb.justin_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                });
            }
        });
    }

    // Twitch widget
    com.sb.twitch_widget = {};
    com.sb.twitch_widget.api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";
    com.sb.twitch_widget.username = com.sb.query_string.username;
    com.sb.twitch_widget.theme = (com.sb.query_string.theme ? com.sb.query_string.theme : "light");
    com.sb.twitch_widget.$twitch_widget = $("#twitch-widget");

    com.sb.twitch_widget.$twitch_widget.addClass(com.sb.twitch_widget.theme);

    if (typeof(com.sb.twitch_widget.username) === 'undefined' || com.sb.twitch_widget.username === "") {
        com.sb.twitch_widget.$twitch_widget.html("<ul><li>Please add a username</li></ul>");
    } else {
        $.getJSON('https://api.twitch.tv/kraken/streams/' + com.sb.twitch_widget.username + '?client_id=' + com.sb.twitch_widget.api_key + '&callback=?', function(data) {
            if (data.stream) {
                if (data.stream.channel.logo) {
                    com.sb.twitch_widget.image = data.stream.channel.logo;
                } else {
                    com.sb.twitch_widget.image = "../img/twitch-no-image.png";
                }
                com.sb.twitch_widget.$twitch_widget.html("<ul class='twitch-widget-list'><li class='user-name'><a href='http://twitch.tv/" + com.sb.twitch_widget.username + "' target='_blank'><img src='" + com.sb.twitch_widget.image + "' width='44' height='44' alt='" + com.sb.twitch_widget.username + " channel logo' class='icon'>" + com.sb.twitch_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> playing " + (data.stream.game ? "<a href='http://www.twitch.tv/directory/game/" + encodeURIComponent(data.stream.game) + "' target='_blank'>" + data.stream.game + "</a>" : "") + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data.stream.viewers + "</span></li></ul>");
            } else {
                $.getJSON('https://api.twitch.tv/kraken/channels/' + com.sb.twitch_widget.username + '?client_id=' + com.sb.twitch_widget.api_key + '&callback=?', function(data) {
                    if (data.logo) {
                        com.sb.twitch_widget.image = data.logo;
                    } else {
                        com.sb.twitch_widget.image = "../img/twitch-no-image.png";
                    }
                    com.sb.twitch_widget.$twitch_widget.html("<ul class='twitch-widget-list'><li><a href='http://twitch.tv/" + com.sb.twitch_widget.username + "' class='user-name' target='_blank'><img src='" + com.sb.twitch_widget.image + "' width='44' height='44' alt='" + com.sb.twitch_widget.username + " channel logo' class='icon'>" + com.sb.twitch_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                });
            }
        });
    }

    // Ustream widget
    com.sb.ustream_widget = {};
    com.sb.ustream_widget.$ustream_widget = $("#ustream-widget");
    com.sb.ustream_widget.api_key = "EE028473488E26E1424E67B209A3C423";
    com.sb.ustream_widget.username = com.sb.query_string.username;

    if (typeof(com.sb.ustream_widget.username) === 'undefined' || com.sb.ustream_widget.username === "") {
        com.sb.ustream_widget.$ustream_widget.html("<ul><li>Please add a username</li></ul>");
    } else {
        $.getJSON('http://api.ustream.tv/json/channel/live/search/username:eq:' + com.sb.ustream_widget.username + '?key=' + com.sb.ustream_widget.api_key + '&callback=?', function(data) {

            if (data != null) {
                com.sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + com.sb.ustream_widget.username + "' target='_blank'><img src='" + data[0].imageUrl.small + "' width='44' height='44' alt='" + com.sb.ustream_widget.username + " channel logo' class='icon'>" + com.sb.ustream_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> " + data[0].title + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data[0].viewersNow + "</li></ul>");
            } else {
                $.getJSON('http://api.ustream.tv/json/user/' + com.sb.ustream_widget.username + '/getInfo?key=' + com.sb.ustream_widget.api_key + '&callback=?', function(data) {
                    if (data != null) {
                        com.sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + com.sb.ustream_widget.username + "' target='_blank'><img src='" + data.imageUrl.small + "' width='44' height='44' alt='" + com.sb.ustream_widget.username + " channel logo' class='icon'>" + com.sb.ustream_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                    } else {
                        com.sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + com.sb.ustream_widget.username + "' target='_blank'><img src='../img/ustream-no-image.png' width='44' height='44' alt='' class='icon'>" + com.sb.ustream_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                    }
                });
            }
        });
    }

    // Unload global var
    $(window).unload(function() {
        try {
            delete com;
        }
        catch(e) {
            com = undefined;
        }
    });
})();