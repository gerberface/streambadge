var App = (function(document, window, undefined) {

    'use strict';

    // Selector cache
    var usernameInput = document.querySelector('[data-js=username-input]'),
        sectionCode = document.querySelector('[data-js=section-code]'),
        serviceButton = document.querySelectorAll('[data-js=service-button]'),
        serviceCode = document.querySelectorAll('[data-js-code=service-code]'),
        previewButton = document.querySelectorAll('[data-js=preview-button]'),
        sectionPreview = document.querySelectorAll('[data-js-preview=section-preview]'),
        themeInput = document.querySelectorAll('[data-js=theme-input]'),
        colorSelectors = document.querySelector('[data-js=color-selectors]'),
        colorSelector = document.querySelectorAll('[data-js=color-selector]'),
        bgColor = document.querySelector('[data-js-color=bg-color]'),
        linkColor = document.querySelector('[data-js-color=link-color]'),
        textColor = document.querySelector('[data-js-color=text-color]'),
        iframeCode = document.querySelector('[data-js=iframe-code]'),
        htmlCode = document.querySelector('[data-js=html-code]'),
        bbcodeCode = document.querySelector('[data-js=bbcode-code]'),
        iframeCodeMobile = document.querySelector('[data-js=iframe-code-mobile]'),
        htmlCodeMobile = document.querySelector('[data-js=html-code-mobile]'),
        bbcodeCodeMobile = document.querySelector('[data-js=bbcode-code-mobile]'),
        sectionTheme = document.querySelector('[data-js=section-theme]'),
        themeLight = document.querySelector('[data-js-theme=theme-light]'),
        themeDark = document.querySelector('[data-js-theme=theme-dark]'),
        sectionUsername = document.querySelector('[data-js=section-username]'),
        iframePreviewSection = document.querySelector('[data-js=iframe-preview-section]'),
        imagePreviewSection = document.querySelector('[data-js=image-preview-section]'),
        bbcodePreviewSection = document.querySelector('[data-js=bbcode-preview-section]'),
        iframePreview = document.querySelector('[data-js=iframe-preview]'),
        imagePreview = document.querySelector('[data-js=image-preview]'),
        bbcodePreview = document.querySelector('[data-js=bbcode-preview]'),
        featuredStreams = document.querySelector('[data-js=featured-streams]'),
        beta = window.location.href.indexOf('beta') !== -1 ? 'beta.' : '',
        service = '',
        username = '',
        theme = '';

    /**
     * init() doesn't do much except set the
     * current year in the footer.
     *
     */
    var init = function() {
        var date = new Date(),
            year = document.querySelector('[data-js=year]');

        // Footer year
        year.innerHTML = date.getFullYear();

        // Get featured streams
        if (window.matchMedia("(min-width: 960px)").matches) {
            getFeatured();
        }
    };

    /**
     * displayFeatured() outputs 3 featured streams on to page
     *
     */
    var displayFeatured = function(data) {
        var output = '<ul class="featured-streams__list">',
            colorArr = ['2b2b2b/b9a3e3/808080', '484848/ABD530/D5D5D5', '243056/F80F80/eeeeee'];

        for (var i = 0, dataFeatured = data.featured.length; i < dataFeatured; i++) {
            output += '<li class="featured-streams__list__item"><iframe src="http://' + beta + 'streambadge.com/twitch/custom/' + colorArr[i] + '/' + data.featured[i].stream.channel.display_name + '/" style="border:none;height:4em;width:100%"></iframe></li>';
        }

        output += '</ul>';

        featuredStreams.innerHTML = output;
    };

    /**
     * getFeatured() grabs the current 3 featured streams from Twitch
     *
     */
    var getFeatured = function() {

        // Get data
        var script = document.createElement('script');
        script.src = 'https://api.twitch.tv/kraken/streams/featured?limit=3&callback=App.displayFeatured';
        script.type = 'text/javascript';
        document.getElementsByTagName('body')[0].appendChild(script);

    };

    /**
     * generateCode() dynamically generates the 'code'
     * for the user to copy and paste.
     *
     */
    var generateCode = function() {
        // Desktop (returns within <textarea> for text selection on click)
        iframeCode.innerHTML = '<iframe src="http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '/" style="border:none;height:4em;width:100%"></iframe>';
        htmlCode.innerHTML = '<a href="http://' + (service === 'goodgame' ? service + '.ru/channel/' + username + '/' : service + '.tv/' + username) + '"><img src="http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png" width="300" height="64" alt="' + username + '\'s Streambadge"></a>';
        bbcodeCode.innerHTML = '[url=http://' + (service === 'goodgame' ? service + '.ru/channel/' + username + '/' : service + '.tv/' + username) + '][img]http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png[/img][/url]';

        // Mobile (returns within <div> for long-press text selection)
        iframeCodeMobile.innerHTML = '&lt;iframe src="http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '/" style="border:none;height:4em;width:100%"&gt;&lt;/iframe&gt;';
        htmlCodeMobile.innerHTML = '&lt;a href="http://' + (service === 'goodgame' ? service + '.ru/channel/' + username + '/' : service + '.tv/' + username) + '"&gt;&lt;img src="http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png" width="300" height="64" alt="' + username + '\'s Streambadge"&gt;&lt;/a&gt;';
        bbcodeCodeMobile.innerHTML = '[url=http://' + (service === 'goodgame' ? service + '.ru/channel/' + username + '/' : service + '.tv/' + username) + '][img]http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png[/img][/url]';
    };

    // Service button method
    var serviceButtonClick = function() {

        var _this = this;
        service = _this.classList.contains('active') ? '' : _this.getAttribute('data-button');

        // Theme
        if (service === 'twitch') {
            themeLight.removeAttribute('disabled');
            themeDark.removeAttribute('disabled');
            sectionTheme.style.display = 'block';
        } else if (service === 'justin') {
            themeLight.setAttribute('disabled', true);
            themeDark.setAttribute('disabled', true);
            sectionTheme.style.display = 'block';
        } else if (service === 'goodgame' || service === 'hitbox') {
            themeLight.setAttribute('disabled', true);
            themeDark.setAttribute('disabled', true);
            sectionTheme.style.display = 'block';
            iframeCode.parentNode.style.display = 'none';
            iframeCode.parentNode.previousElementSibling.style.display = 'none';
        } else {
            theme = '';

            [].forEach.call(themeInput, function(el) {
                el.setAttribute('checked', false);
            });

            sectionTheme.style.display = 'none';
            colorSelectors.style.display = 'none';
        }

        if (_this.classList.contains('active')) {

            [].forEach.call(serviceButton, function(el) {
                el.classList.remove('active');
                el.classList.remove('disabled');
            });

            usernameInput.value = '';
            username = '';
            usernameInput.setAttribute('readonly', 'readonly');
            usernameInput.classList.add('readonly');

            [].forEach.call(serviceCode, function(el) {
                el.classList.remove('active');
            });

            sectionCode.classList.remove('active');
            sectionUsername.classList.remove('active');

            [].forEach.call(previewButton, function(el) {
                el.classList.remove('available');
            });

            iframeCode.parentNode.style.display = 'block';
            iframeCode.parentNode.previousElementSibling.style.display = 'block';

        } else {

            [].forEach.call(serviceButton, function(el) {
                el.classList.remove('active');
                el.classList.add('disabled');
            });

            usernameInput.removeAttribute('readonly');
            usernameInput.classList.remove('readonly');
            usernameInput.focus();
            sectionUsername.classList.add('active');
            _this.classList.add('active');
            _this.classList.remove('disabled');

            if (usernameInput.value === '') {

                [].forEach.call(previewButton, function(el) {
                    el.classList.remove('available');
                });

            } else {

                [].forEach.call(previewButton, function(el) {
                    el.classList.add('available');
                });

            }

            if (service !== 'goodgame' && service !== 'hitbox') {
                iframeCode.parentNode.style.display = 'block';
                iframeCode.parentNode.previousElementSibling.style.display = 'block';
            }
        }

        [].forEach.call(sectionPreview, function(el) {
            el.style.display = 'none';
        });

        [].forEach.call(previewButton, function(el) {
            el.classList.remove('active');
        });

        [].forEach.call(themeInput, function(el) {
            el.checked = false;
        });

        colorSelectors.style.display = 'none';
        theme = '';
        generateCode();

    };

    // Theme input click
    var themeClick = function() {

        var _this = this;

        colorSelectors.style.display = 'none';

        switch (_this.getAttribute('data-theme')) {
            case 'light':
                theme = 'light/';
                break;
            case 'dark':
                theme = 'dark/';
                break;
            case 'custom':
                theme = 'custom/' + bgColor.value.replace('#', '') + '/' + linkColor.value.replace('#', '') + '/' + textColor.value.replace('#', '') + '/';

                if (colorSelectors.style.display === 'none' || colorSelectors.style.display === '') {
                    colorSelectors.style.display = 'block';
                } else {
                    colorSelectors.style.display = 'none';
                }

                colorSelectors.style.display = 'block';
                break;
            default:
                theme = 'light/';
                break;
        }

        if (usernameInput === '') {

            [].forEach.call(previewButton, function(el) {
                el.classList.add('available');
                el.classList.remove('active');
            });

        }

        [].forEach.call(sectionPreview, function(el) {
            el.style.display = 'none';
        });

        generateCode();
    };

    // Color Selector click
    var colorSelectorClick = function() {

        var _colorSelection = this.getAttribute('data-color-selector'),
            _bgColor = bgColor.value.replace('#', ''),
            _linkColor = linkColor.value.replace('#', ''),
            _textColor = textColor.value.replace('#', ''),
            _thisColor = this.value.replace('#', '');

        switch (_colorSelection) {
            case 'bg-color':
                theme = 'custom/' + _thisColor + '/' + _linkColor + '/' + _textColor + '/';
                break;
            case 'link-color':
                theme = 'custom/' + _bgColor + '/' + _thisColor + '/' + _textColor + '/';
                break;
            case 'text-color':
                theme = 'custom/' + _bgColor + '/' + _linkColor + '/' + _thisColor + '/';
                break;
        }

        [].forEach.call(sectionPreview, function(el) {
            el.style.display = 'none';
        });

        if (username !== '') {

            [].forEach.call(previewButton, function(el) {
                el.classList.add('available');
                el.classList.remove('active');
            });

        }

        generateCode();
    };

    // Username input event
    var usernameInputKeyUp = function() {

        var _this = this,
            enablePreviewButtons = false;

        if (_this.value === '') {
            _this = '';
            sectionCode.classList.remove('active');

            [].forEach.call(serviceCode, function(el) {
                _this.classList.remove('active');
            });

            [].forEach.call(previewButton, function(el) {
                _this.classList.remove('available');
                _this.classList.remove('active');
            });

        } else {
            sectionCode.classList.add('active');

            [].forEach.call(serviceCode, function(el) {
                _this.classList.add('active');
            });

            [].forEach.call(serviceButton, function(el) {
                if (el.classList.contains('active')) {
                    enablePreviewButtons = true;
                }
            });

            if (enablePreviewButtons) {

                [].forEach.call(previewButton, function(el) {
                    _this.classList.add('available');
                    _this.classList.remove('active');
                });

            } else {
                [].forEach.call(previewButton, function(el) {
                    _this.classList.remove('available');
                    _this.classList.remove('active');
                });
            }

        }

        username = _this.value;

        [].forEach.call(sectionPreview, function(el) {
            el.style.display = 'none';
        });

        generateCode();
    };

    var serviceCodeFocus = function() {
        var _this = this;

        _this.select();

        _this.onmouseup = function() {
            _this.onmouseup = null;

            return false;
        };
    };

    var previewButtonClick = function() {

        var _this = this,
            previewButton = _this.getAttribute('data-preview');

        switch (previewButton) {
            case 'iframe':
                iframePreview.setAttribute('src', 'http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '/');

                if (iframePreviewSection.style.display === 'none' || iframePreviewSection.style.display === '') {
                    iframePreviewSection.style.display = 'block';
                } else {
                    iframePreviewSection.style.display = 'none';
                }

                break;

            case 'image':
                imagePreview.setAttribute('src', 'http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png');

                if (imagePreviewSection.style.display === 'none' || imagePreviewSection.style.display === '') {
                    imagePreviewSection.style.display = 'block';
                } else {
                    imagePreviewSection.style.display = 'none';
                }

                break;

            case 'bbcode':
                bbcodePreview.setAttribute('src', 'http://' + beta + 'streambadge.com/' + service + '/' + theme + username + '.png');

                if (bbcodePreviewSection.style.display === 'none' || bbcodePreviewSection.style.display === '') {
                    bbcodePreviewSection.style.display = 'block';
                } else {
                    bbcodePreviewSection.style.display = 'none';
                }

                break;
        }

        _this.classList.toggle('available');
        _this.classList.toggle('active');

        return false;
    };

    // Service Button event listener
    [].forEach.call(serviceButton, function(el) {
        el.addEventListener('click', serviceButtonClick, false);
    });

    // Theme event listener
    [].forEach.call(themeInput, function(el) {
        el.addEventListener('click', themeClick, false);
    });

    // Color selector event listener
    [].forEach.call(colorSelector, function(el) {
        el.addEventListener('click', colorSelectorClick, false);
    });

    // Username input event listener
    usernameInput.addEventListener('keyup', usernameInputKeyUp, false);

    // Select all focus event listener
    [].forEach.call(serviceCode, function(el) {
        el.addEventListener('onfocus', serviceCodeFocus, false);
    });

    // Preview button click event
    [].forEach.call(previewButton, function(el) {
        el.addEventListener('click', previewButtonClick, false);
    });

    return {
        init: init,
        displayFeatured: displayFeatured
    };

})(document, window);

App.init();