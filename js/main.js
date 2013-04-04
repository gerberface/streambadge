(function() {
    var sb = {};
    sb.service = "";
    sb.username = "";
    sb.iframe_theme = "";
    sb.image_theme = "";

    // Cached jQuery selectors
    sb.$selectors = {};
    sb.$selectors.iframe_code = $("#iframe-code");
    sb.$selectors.html_code = $("#html-code");
    sb.$selectors.bbcode_code = $("#bbcode-code");
    sb.$selectors.iframe_code_mobile = $("#iframe-code-mobile");
    sb.$selectors.html_code_mobile = $("#html-code-mobile");
    sb.$selectors.bbcode_code_mobile = $("#bbcode-code-mobile");
    sb.$selectors.twitch_button = $("#twitch-button");
    sb.$selectors.justin_button = $("#justin-button");
    sb.$selectors.ustream_button = $("#ustream-button");
    sb.$selectors.theme_light = $("#theme-light");
    sb.$selectors.theme_dark = $("#theme-dark");
    sb.$selectors.iframe_image_bbcode_preview = $(".iframe-preview,.image-preview,.bbcode-preview");
    sb.$selectors.preview = $(".preview");
    sb.$selectors.username_input = $("#username-input");
    sb.$selectors.section_code_code = $("#section-code, .code");
    sb.$selectors.button = $(".button");
    sb.$selectors.iframe_html_bbcode_code = $("#iframe-code, #html-code, #bbcode-code");
    sb.$selectors.iframe_preview_button = $("#iframe-preview-button");
    sb.$selectors.iframe_preview = $("#iframe-preview");
    sb.$selectors.iframe_preview_class = $(".iframe-preview");
    sb.$selectors.image_preview_button = $("#image-preview-button");
    sb.$selectors.image_preview = $("#image-preview");
    sb.$selectors.image_preview_class = $(".image-preview");
    sb.$selectors.bbcode_preview_button = $("#bbcode-preview-button");
    sb.$selectors.bbcode_preview = $("#bbcode-preview");
    sb.$selectors.bbcode_preview_class = $(".bbcode-preview");
    sb.$selectors.section_theme = $("#section-theme");
    sb.$selectors.theme_input = $(".theme-input");
    sb.$selectors.section_username_section_code_code = $("#section-username, #section-code, .code");
    sb.$selectors.section_username = $("#section-username");
    sb.$selectors.year = $("#year");
    sb.$selectors.logo = $("#logo");
    sb.$selectors.header_ad = $(".header-ad");
    sb.$selectors.footer_section_ad = $(".footer-section.ad");

    sb.generateCode = function() {
        sb.$selectors.iframe_code.html('<iframe src="http://streambadge.com/' + sb.service + '/?username=' + sb.username + sb.iframe_theme + '" style="border:none;height:64px;width:100%"></iframe>');
        sb.$selectors.html_code.html('<a href="http://' + sb.service + '.tv/' + sb.username + '"><img src="http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png" alt=""></a>');
        sb.$selectors.bbcode_code.html('[url=http://' + sb.service + '.tv/' + sb.username + '][img]http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png[/img][/url]');
        // Mobile
        sb.$selectors.iframe_code_mobile.html('&lt;iframe src="http://streambadge.com/' + sb.service + '/?username=' + sb.username + sb.iframe_theme + '" style="border:none;height:64px;width:100%"&gt;&lt;/iframe&gt;');
        sb.$selectors.html_code_mobile.html('&lt;a href="http://' + sb.service + '.tv/' + sb.username + '"&gt;&lt;img src="http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png" alt=""&gt;&lt;/a&gt;');
        sb.$selectors.bbcode_code_mobile.html('[url=http://' + sb.service + '.tv/' + sb.username + '][img]http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png[/img][/url]');
    };

    // Initial textarea value
    sb.generateCode();

    // Service button click event
    sb.$selectors.twitch_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "twitch");
        }
    });

    sb.$selectors.justin_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "justin");
        }
    });

    sb.$selectors.ustream_button.click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "ustream");
        }
    });

    // Theme click event
    sb.$selectors.theme_light.click(function() {
        sb.iframe_theme = "&theme=light";
        sb.image_theme = "light/";
        sb.generateCode();
        sb.$selectors.iframe_image_bbcode_preview.slideUp();
        if (sb.username != "") {
            sb.$selectors.preview.addClass("available").removeClass("active");
        }
    });

    sb.$selectors.theme_dark.click(function() {
        sb.iframe_theme = "&theme=dark";
        sb.image_theme = "dark/";
        sb.generateCode();
        sb.$selectors.iframe_image_bbcode_preview.slideUp();
        if (sb.username != "") {
            sb.$selectors.preview.addClass("available").removeClass("active");
        }
    });

    // Username input event
    sb.$selectors.username_input.keyup(function() {
        var $this = $(this);

        if ($this.val() === "") {
            $this = "";
            sb.$selectors.section_code_code.removeClass("active");
            sb.$selectors.preview.removeClass("available").removeClass("active");
        } else {
            sb.$selectors.section_code_code.addClass("active");
            if (sb.$selectors.button.hasClass("active")) {
                sb.$selectors.preview.addClass("available").removeClass("active");
            } else {
                sb.$selectors.preview.removeClass("available").removeClass("active");
            }
        }

        sb.username = $this.val();
        sb.generateCode();

        sb.$selectors.iframe_image_bbcode_preview.slideUp();
    });

    // Select all on focus
    sb.$selectors.iframe_html_bbcode_code.focus(function() {
        var $this = $(this);
        $this.select();
        $this.mouseup(function() {
            $this.unbind("mouseup");
            return false;
        });
    });

    // Preview button click event
    sb.$selectors.iframe_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        sb.$selectors.iframe_preview.attr('src','http://streambadge.com/' + sb.service + '/?username=' + sb.username + sb.iframe_theme);
        sb.$selectors.iframe_preview_class.slideToggle();
        return false;
    });

    sb.$selectors.image_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        sb.$selectors.image_preview.attr('src','http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png');
        sb.$selectors.image_preview_class.slideToggle();
        return false;
    });

    sb.$selectors.bbcode_preview_button.click(function() {
        var $this = $(this);
        $this.toggleClass("available").toggleClass("active");
        sb.$selectors.bbcode_preview.attr('src','http://streambadge.com/' + sb.service + '/' + sb.image_theme + sb.username + '.png');
        sb.$selectors.bbcode_preview_class.slideToggle();
        return false;
    });

    // Service button method
    var button_click = function(button, service) {
        // Theme
        if (service == "twitch") {
            sb.$selectors.section_theme.slideDown();
        } else {
            sb.$selectors.section_theme.slideUp();
            sb.iframe_theme = "";
            sb.image_theme = "";
            sb.$selectors.theme_input.prop('checked', false);
        }

        if (button.hasClass("active")) {
            sb.$selectors.button.removeClass("active").removeClass("disabled");
            sb.$selectors.username_input.val("");
            sb.username = "";
            sb.$selectors.username_input.attr("readonly","readonly").addClass("readonly");
            sb.$selectors.section_username_section_code_code.removeClass("active");
        } else {
            sb.$selectors.button.addClass("disabled").removeClass("active");
            sb.$selectors.username_input.removeAttr("readonly").removeClass("readonly").focus();
            sb.$selectors.section_username.addClass("active");
            button.addClass("active").removeClass("disabled");
            if (sb.$selectors.username_input.val() === "") {
                sb.$selectors.preview.removeClass("available");
            } else {
                sb.$selectors.preview.addClass("available");
            }
        }

        sb.$selectors.iframe_image_bbcode_preview.slideUp();
        sb.$selectors.preview.removeClass("active");
        sb.service = service;
        sb.generateCode();
    };

    var date = new Date();
    sb.$selectors.year.html(date.getFullYear());

    // Media Queries
    sb.matchMediaTest = function() {
        var _media = sb.currentMedia;

        if (matchMedia('only screen and (max-width: 45em)').matches) {
            sb.currentMedia = "small";
        } else if (matchMedia('only screen and (min-width: 45em) and (max-width: 60em)').matches) {
            sb.currentMedia = "medium";
        } else if (matchMedia('only screen and (min-width: 60em)').matches) {
            sb.currentMedia = "large";
        }

        // On resize
        if (_media !== sb.currentMedia) {
            switch (sb.currentMedia) {
            case "small":
                sb.$selectors.header_ad.empty();
                break;
            case "medium":
                sb.$selectors.header_ad.empty();
                sb.$selectors.header_ad.html("<iframe src='/ads/header-medium.html' style='border:none;height:60px;width:234px;' scroll='no'></iframe>");
                break;
            case "large":
                sb.$selectors.header_ad.empty();
                sb.$selectors.header_ad.html("<iframe src='/ads/header-wide.html' style='border:none;height:60px;overflow:hidden;width:468px;'></iframe>");
                break;
            }
        }
    };

    // Call on resize
    window.onresize = function () {
        sb.matchMediaTest();
    };

    // Call on load
    sb.matchMediaTest();

    // On load
    switch (sb.currentMedia) {
    case "small":
        sb.$selectors.header_ad.empty();
        break;
    case "medium":
        sb.$selectors.header_ad.empty();
        sb.$selectors.header_ad.html("<iframe src='/ads/header-medium.html' style='border:none;height:60px;width:234px;'></iframe>");
        break;
    case "large":
        sb.$selectors.header_ad.empty();
        sb.$selectors.header_ad.html("<iframe src='/ads/header-wide.html' style='border:none;height:60px;width:468px;'></iframe>");
        break;
    }

    sb.$selectors.footer_section_ad.html("<iframe src='/ads/footer.html' style='border:none;height:250px;width:250px;'></iframe>");

    // Query string
    sb.query_string = function () {
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
    if ($("#justin-widget").length) {
        sb.justin_widget = {};
        sb.justin_widget.$justin_widget = $("#justin-widget");

        sb.justin_widget.username = sb.query_string.username;

        if (typeof(sb.justin_widget.username) === 'undefined' || sb.justin_widget.username === "") {
            sb.justin_widget.$justin_widget.html("<ul><li>Please add a username</li></ul>");
        } else {
            $.getJSON('http://api.justin.tv/api/stream/list.json?channel=' + sb.justin_widget.username + '&callback=?', function(data) {
                if (data[0]) {
                    sb.justin_widget.$justin_widget.html("<ul class='justin-widget-list'><li class='user-name'><a href='http://justin.tv/" + sb.justin_widget.username + "' target='_blank'><img src='" + data[0].channel.image_url_small + "' width='44' height='44' alt='" + sb.justin_widget.username + " channel logo' class='icon'>" + sb.justin_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> " + data[0].title + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data[0].channel_count + "</li></ul>");
                } else {
                    $.getJSON('http://api.justin.tv/api/channel/show/list.json?channel=' + sb.justin_widget.username + '&callback=?', function(data) {
                        sb.justin_widget.$justin_widget.html("<ul class='justin-widget-list'><li><a href='http://justin.tv/" + sb.justin_widget.username + "' class='user-name' target='_blank'><img src='" + data.image_url_small + "' width='44' height='44' alt='" + sb.justin_widget.username + " channel logo' class='icon'>" + sb.justin_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                    });
                }
            });
        }
    }

    // Twitch widget
    if ($("#twitch-widget").length) {
        sb.twitch_widget = {};
        sb.twitch_widget.api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";
        sb.twitch_widget.username = sb.query_string.username;
        sb.twitch_widget.theme = (sb.query_string.theme ? sb.query_string.theme : "light");
        sb.twitch_widget.$twitch_widget = $("#twitch-widget");

        sb.twitch_widget.$twitch_widget.addClass(sb.twitch_widget.theme);

        if (typeof(sb.twitch_widget.username) === 'undefined' || sb.twitch_widget.username === "") {
            sb.twitch_widget.$twitch_widget.html("<ul><li>Please add a username</li></ul>");
        } else {
            $.getJSON('https://api.twitch.tv/kraken/streams/' + sb.twitch_widget.username + '?client_id=' + sb.twitch_widget.api_key + '&callback=?', function(data) {
                if (data.stream) {
                    if (data.stream.channel.logo) {
                        sb.twitch_widget.image = data.stream.channel.logo;
                    } else {
                        sb.twitch_widget.image = "../img/twitch-no-image.png";
                    }
                    sb.twitch_widget.$twitch_widget.html("<ul class='twitch-widget-list'><li class='user-name'><a href='http://twitch.tv/" + sb.twitch_widget.username + "' target='_blank'><img src='" + sb.twitch_widget.image + "' width='44' height='44' alt='" + sb.twitch_widget.username + " channel logo' class='icon'>" + sb.twitch_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> playing " + (data.stream.game ? "<a href='http://www.twitch.tv/directory/game/" + encodeURIComponent(data.stream.game) + "' target='_blank'>" + data.stream.game + "</a>" : "") + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data.stream.viewers + "</span></li></ul>");
                } else {
                    $.getJSON('https://api.twitch.tv/kraken/channels/' + sb.twitch_widget.username + '?client_id=' + sb.twitch_widget.api_key + '&callback=?', function(data) {
                        if (data.logo) {
                            sb.twitch_widget.image = data.logo;
                        } else {
                            sb.twitch_widget.image = "../img/twitch-no-image.png";
                        }
                        sb.twitch_widget.$twitch_widget.html("<ul class='twitch-widget-list'><li><a href='http://twitch.tv/" + sb.twitch_widget.username + "' class='user-name' target='_blank'><img src='" + sb.twitch_widget.image + "' width='44' height='44' alt='" + sb.twitch_widget.username + " channel logo' class='icon'>" + sb.twitch_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                    });
                }
            });
        }
    }

    // Ustream widget
    if ($("#ustream-widget").length) {
        sb.ustream_widget = {};
        sb.ustream_widget.$ustream_widget = $("#ustream-widget");
        sb.ustream_widget.api_key = "EE028473488E26E1424E67B209A3C423";
        sb.ustream_widget.username = sb.query_string.username;

        if (typeof(sb.ustream_widget.username) === 'undefined' || sb.ustream_widget.username === "") {
            sb.ustream_widget.$ustream_widget.html("<ul><li>Please add a username</li></ul>");
        } else {
            $.getJSON('http://api.ustream.tv/json/channel/live/search/username:eq:' + sb.ustream_widget.username + '?key=' + sb.ustream_widget.api_key + '&callback=?', function(data) {

                if (data != null) {
                    sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + sb.ustream_widget.username + "' target='_blank'><img src='" + data[0].imageUrl.small + "' width='44' height='44' alt='" + sb.ustream_widget.username + " channel logo' class='icon'>" + sb.ustream_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> " + data[0].title + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + data[0].viewersNow + "</li></ul>");
                } else {
                    $.getJSON('http://api.ustream.tv/json/user/' + sb.ustream_widget.username + '/getInfo?key=' + sb.ustream_widget.api_key + '&callback=?', function(data) {
                        if (data != null) {
                            sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + sb.ustream_widget.username + "' target='_blank'><img src='" + data.imageUrl.small + "' width='44' height='44' alt='" + sb.ustream_widget.username + " channel logo' class='icon'>" + sb.ustream_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                        } else {
                            sb.ustream_widget.$ustream_widget.html("<ul class='ustream-widget-list'><li class='user-name'><a href='http://ustream.tv/" + sb.ustream_widget.username + "' target='_blank'><img src='../img/ustream-no-image.png' width='44' height='44' alt='' class='icon'>" + sb.ustream_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                        }
                    });
                }
            });
        }
    }

    // Youtube widget
    if ($("#youtube-widget").length) {
        sb.youtube_widget = {};
        sb.youtube_widget.$youtube_widget = $("#youtube-widget");
        sb.youtube_widget.username = sb.query_string.username;
        sb.youtube_widget.image = "../img/youtube-no-image.png";

        if (typeof(sb.youtube_widget.username) === 'undefined' || sb.youtube_widget.username === "") {
            sb.youtube_widget.$youtube_widget.html("<ul><li>Please add a username</li></ul>");
        } else {
            // Get user image
            var url = "https://gdata.youtube.com/feeds/api/users/" + sb.youtube_widget.username;
            $.ajax({
                url: url,
                type: "GET",
                dataType: "text",
            }).done(function (data) {
                xmlDoc = $.parseXML(data);
                xml = $(xmlDoc);
                if (xml.find("entry > thumbnail").length) {
                    sb.youtube_widget.image = xml.find("entry > thumbnail").attr("url");
                } else {
                    sb.youtube_widget.image = xml.find("entry > media\\:thumbnail").attr("url");
                }
            });

            // Try to get live data first
            var url = "https://gdata.youtube.com/feeds/api/users/" + sb.youtube_widget.username + "/live/events?v=2&status=active&inline=true";
            $.ajax({
                url: url,
                type: "GET",
                dataType: "text",
            }).done(function (data) {
                xmlDoc = $.parseXML(data);
                xml = $(xmlDoc);

                sb.youtube_widget.title = xml.find("feed > entry:first > title").text();

                if (xml.find("feed > entry > content > entry > group > videoid").length) {
                    sb.youtube_widget.video_id = xml.find("feed > entry > content > entry > group > videoid").text();
                } else {
                    sb.youtube_widget.video_id = xml.find("feed > entry > content > entry > media\\:group > yt\\:videoid").text();
                }

                if (xml.find("feed > entry > content > entry > statistics").length) {
                    sb.youtube_widget.viewers = xml.find("feed > entry > content > entry > statistics").attr("currentViewers");
                } else {
                    sb.youtube_widget.viewers = xml.find("feed > entry > content > entry > yt\\:statistics").attr("currentViewers");
                }

                if (xml.find("entry").length) {
                    // Live
                    sb.youtube_widget.$youtube_widget.html("<ul class='youtube-widget-list'><li class='user-name'><a href='" + (sb.youtube_widget.video_id ? "http://www.youtube.com/watch?v=" + sb.youtube_widget.video_id : "http://www.youtube.com/" + sb.youtube_widget.username) + "' target='_blank'><img src='" + sb.youtube_widget.image + "' width='44' height='44' alt='" + sb.youtube_widget.username + " channel logo' class='icon'>" + sb.youtube_widget.username + "</a></li><li class='live'><b>LIVE</b> <span class='online'></span> " + sb.youtube_widget.title  + "</li><li class='viewers'><img src='../img/eye-gray.png' width='14' height='14' alt='' class='icon-eye' /> " + sb.youtube_widget.viewers + "</li></ul>");
                } else {
                    // Offline
                    sb.youtube_widget.$youtube_widget.html("<ul class='youtube-widget-list'><li class='user-name'><a href='http://youtube.com/" + sb.youtube_widget.username + "' target='_blank'><img src='" + sb.youtube_widget.image + "' width='44' height='44' alt='" + sb.youtube_widget.username + " channel logo' class='icon'>" + sb.youtube_widget.username + "</a></li><li class='live'><b>Offline</b></li></ul>");
                }
            });
        }
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