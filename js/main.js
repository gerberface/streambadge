(function() {
    var com = {};
    com.sb = {};
    com.sb.service = "";
    com.sb.username = "";

    com.sb.generateCode = function() {
        $("#iframe-code").html('<iframe src="http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username + '" style="border:none;height:64px;width:100%"></iframe>');
        $("#html-code").html('<a href="http://' + com.sb.service + '.tv/' + com.sb.username + '"><img src="http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png" alt=""></a>');
        $("#bbcode-code").html('[url="http://' + com.sb.service + '.tv/' + com.sb.username + '"][img]http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png[/img][/url]');
        // Mobile
        $("#iframe-code-mobile").html('&lt;iframe src="http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username + '" style="border:none;height:64px;width:100%"&gt;&lt;/iframe&gt;');
        $("#html-code-mobile").html('&lt;a href="http://' + com.sb.service + '.tv/' + com.sb.username + '"&gt;&lt;img src="http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png" alt=""&gt;&lt;/a&gt;');
        $("#bbcode-code-mobile").html('[url="http://' + com.sb.service + '.tv/' + com.sb.username + '"][img]http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png[/img][/url]');
    };

    // Initial textarea value
    com.sb.generateCode();

    // Service button click event
    $("#twitch-button").click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($this, "twitch");
        }
    });

    $("#justin-button").click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($(this), "justin");
        }
    });

    $("#ustream-button").click(function() {
        var $this = $(this);
        if ($this.hasClass("active")) {
            button_click($this, "");
        } else {
            button_click($(this), "ustream");
        }
    });

    // Username input event
    $("#username-input").keyup(function() {
        var $this = $(this).val();

        if ($(this).val() === "") {
            $this = "";
            $("#section-code, .code").removeClass("active");
            $(".preview").removeClass("available").removeClass("active");
        } else {
            $("#section-code, .code").addClass("active");
            if ($(".button").hasClass("active")) {
                $(".preview").addClass("available").removeClass("active");
            } else {
                $(".preview").removeClass("available").removeClass("active");
            }
        }

        com.sb.username = $this;
        com.sb.generateCode();

        $(".iframe-preview,.image-preview,.bbcode-preview").slideUp();
    });

    // Select all on focus
    $("#iframe-code, #html-code, #bbcode-code").focus(function() {
        var $this = $(this);
        $this.select();
        $this.mouseup(function() {
            $this.unbind("mouseup");
            return false;
        });
    });

    // Preview button click event
    $("#iframe-preview-button").click(function() {
        $(this).toggleClass("available").toggleClass("active");
        $("#iframe-preview").attr('src','http://streambadge.com/' + com.sb.service + '/?username=' + com.sb.username);
        $(".iframe-preview").slideToggle();
        return false;
    });

    $("#image-preview-button").click(function() {
        $(this).toggleClass("available").toggleClass("active");
        $("#image-preview").attr('src','http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png');
        $(".image-preview").slideToggle();
        return false;
    });

    $("#bbcode-preview-button").click(function() {
        $(this).toggleClass("available").toggleClass("active");
        $("#bbcode-preview").attr('src','http://streambadge.com/' + com.sb.service + '/' + com.sb.username + '.png');
        $(".bbcode-preview").slideToggle();
        return false;
    });

    // Service button method
    var button_click = function(button, service) {
        if (button.hasClass("active")) {
            $(".button").removeClass("active").removeClass("disabled");
            $("#username-input").val("");
            com.sb.username = "";
            $("#username-input").attr("readonly","readonly").addClass("readonly");
            $("#section-username, #section-code, .code").removeClass("active");
        } else {
            $(".button").addClass("disabled").removeClass("active");
            $("#username-input").removeAttr("readonly").removeClass("readonly").focus();
            $("#section-username").addClass("active");
            button.addClass("active").removeClass("disabled");
            if ($("#username-input").val() === "") {
                $(".preview").removeClass("available");
            } else {
                $(".preview").addClass("available");
            }
        }

        $(".iframe-preview,.image-preview,.bbcode-preview").slideUp();
        $(".preview").removeClass("active");
        com.sb.service = service;
        com.sb.generateCode();
    };

    var date = new Date();
    $("#year").html(date.getFullYear());

    $("#logo").fitText(1.2, { minFontSize: '20px', maxFontSize: '50px' });
})();