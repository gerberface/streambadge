var app = (function (document, window, undefined) {

    'use strict';

    var service = '',
        username = '',
        theme = '',
        usernameInput = document.querySelector('[data-js=username-input]'),
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
        bbcodePreview = document.querySelector('[data-js=bbcode-preview]');

    // Generate the code for copying
    var generateCode = function () {

        iframeCode.innerHTML = '<iframe src="http://streambadge.com/' + service + '/' + theme + username + '/" style="border:none;height:4em;width:100%"></iframe>';
        htmlCode.innerHTML = '<a href="http://' + service + '.tv/' + username + '"><img src="http://streambadge.com/' + service + '/' + theme + username + '.png" width="300" height="64" alt="' + username + '\'s Streambadge"></a>';
        bbcodeCode.innerHTML = '[url=http://' + service + '.tv/' + username + '][img]http://streambadge.com/' + service + '/' + theme + username + '.png[/img][/url]';

        // Mobile
        iframeCodeMobile.innerHTML = '&lt;iframe src="http://streambadge.com/' + service + '/' + theme + username + '/" style="border:none;height:4em;width:100%"&gt;&lt;/iframe&gt;';
        htmlCodeMobile.innerHTML = '&lt;a href="http://' + service + '.tv/' + username + '"&gt;&lt;img src="http://streambadge.com/' + service + '/' + theme + username + '.png" width="300" height="64" alt="' + username + '\'s Streambadge"&gt;&lt;/a&gt;';
        bbcodeCodeMobile.innerHTML = '[url=http://' + service + '.tv/' + username + '][img]http://streambadge.com/' + service + '/' + theme + username + '.png[/img][/url]';

    };

    // Service button method
    var serviceButtonClick = function ( button ) {

        // Theme
        if ( service === 'twitch' ) {

            themeLight.removeAttribute('disabled');
            themeDark.removeAttribute('disabled');
            sectionTheme.style.display = 'block';

        } else if ( service === 'justin' ) {

            themeLight.setAttribute('disabled', true);
            themeDark.setAttribute('disabled', true);
            sectionTheme.style.display = 'block';

        } else {

            sectionTheme.style.display = 'none';
            theme = '';

            [].forEach.call( themeInput, function (el) {
                el.setAttribute('checked', false);
            });

            colorSelectors.style.display = 'none';

        }

        if ( button.classList.contains('active') ) {

            [].forEach.call( serviceButton, function (el) {
                el.classList.remove('active');
                el.classList.remove('disabled');
            });

            usernameInput.value = '';
            username = '';

            usernameInput.setAttribute('readonly','readonly');
            usernameInput.classList.add('readonly');

            [].forEach.call( serviceCode, function (el) {
                el.classList.remove('active');
            });

            sectionCode.classList.remove('active');
            sectionUsername.classList.remove('active');

            [].forEach.call( previewButton, function (el) {
                el.classList.remove('available');
            });

        } else {

            [].forEach.call( serviceButton, function (el) {
                el.classList.remove('active');
                el.classList.add('disabled');
            });

            usernameInput.removeAttribute('readonly');
            usernameInput.classList.remove('readonly');
            usernameInput.focus();

            sectionUsername.classList.add('active');

            button.classList.add('active');
            button.classList.remove('disabled');

            if ( usernameInput.value === '' ) {

                [].forEach.call( previewButton, function (el) {
                    el.classList.remove('available');
                });

            } else {

                [].forEach.call( previewButton, function (el) {
                    el.classList.add('available');
                });

            }
        }

        [].forEach.call( sectionPreview, function (el) {
            el.style.display = 'none';
        });

        [].forEach.call( previewButton, function (el) {
            el.classList.remove('active');
        });

        [].forEach.call( themeInput, function (el) {
            el.checked = false;
        });

        colorSelectors.style.display = 'none';

        theme = '';

        generateCode();

    };

    // Service button click event
    [].forEach.call( serviceButton, function (el) {

        el.onclick = function () {

            var el = this;

            if ( el.classList.contains('active') ) {
                service = '';
            } else {
                service = el.getAttribute('data-button');
            }

            serviceButtonClick( el );

        };

    });

    [].forEach.call( themeInput, function (el) {

        // Theme click event
        el.onclick = function () {

            var thisTheme = this.getAttribute('data-theme');

            switch ( thisTheme ) {

                case 'light':
                    theme = 'light/';

                    colorSelectors.style.display = 'none';

                    break;

                case 'dark':
                    theme = 'dark/';

                    colorSelectors.style.display = 'none';

                    break;

                case 'custom':
                    theme = 'custom/' + bgColor.value.replace('#','') + '/' + linkColor.value.replace('#','') + '/' + textColor.value.replace('#','') + '/';

                    if ( colorSelectors.style.display === 'none' || colorSelectors.style.display === '' ) {
                        colorSelectors.style.display = 'block';
                    } else {
                        colorSelectors.style.display = 'none';
                    }

                    break;

                default:
                    theme = 'light/';

                    colorSelectors.style.display = 'none';

                    break;

            }

            if ( usernameInput === '' ) {

                [].forEach.call( previewButton, function (el) {
                    el.classList.add('available');
                    el.classList.remove('active');
                });

            }

            [].forEach.call( sectionPreview, function (el) {
                el.style.display = 'none';
            });

            generateCode();

        };

    });

    [].forEach.call( colorSelector, function (el) {

        el.onchange = function() {

            var _colorSelection, _bgColor, _linkColor, _textColor, _thisColor;

            _colorSelection = this.getAttribute('data-color-selector');
            _bgColor = bgColor.value.replace('#','');
            _linkColor = linkColor.value.replace('#','');
            _textColor = textColor.value.replace('#','');
            _thisColor = this.value.replace('#','');

            switch ( _colorSelection ) {

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

            [].forEach.call( sectionPreview, function (el) {
                el.style.display = 'none';
            });

            if ( username !== '' ) {

                [].forEach.call( previewButton, function (el) {
                    el.classList.add('available');
                    el.classList.remove('active');
                });

            }

            generateCode();

        };

    });

    // Username input event
    usernameInput.onkeyup = function () {

        var el = this,
            enablePreviewButtons = false;

        if ( el.value === '' ) {

            el = '';
            sectionCode.classList.remove('active');

            [].forEach.call( serviceCode, function ( el ) {
                el.classList.remove('active');
            });

            [].forEach.call( previewButton, function (el) {
                el.classList.remove('available');
                el.classList.remove('active');
            });

        } else {

            sectionCode.classList.add('active');

            [].forEach.call( serviceCode, function ( el ) {
                el.classList.add('active');
            });

            [].forEach.call( serviceButton, function ( el ) {

                if ( el.classList.contains('active') ) {
                    enablePreviewButtons = true;
                }

            });

            if ( enablePreviewButtons ) {
                [].forEach.call( previewButton, function (el) {
                    el.classList.add('available');
                    el.classList.remove('active');
                });
            } else {
                [].forEach.call( previewButton, function (el) {
                    el.classList.remove('available');
                    el.classList.remove('active');
                });
            }

        }

        username = el.value;

        [].forEach.call( sectionPreview, function (el) {
            el.style.display = 'none';
        });

        generateCode();

    };

    // Select all on focus
    [].forEach.call( serviceCode, function (el) {

        el.onfocus = function () {

            var el = this;

            el.select();

            el.onmouseup = function () {

                el.onmouseup = null;
                return false;

            };

        };

    });

    // Preview button click event
    [].forEach.call( previewButton, function (el) {

        el.onclick = function () {

            var el = this,
                previewButton = el.getAttribute('data-preview');

            switch ( previewButton ) {

                case 'iframe':
                    iframePreview.setAttribute('src','http://streambadge.com/' + service + '/' + theme + username + '/');

                    if ( iframePreviewSection.style.display === 'none' || iframePreviewSection.style.display === '' ) {
                        iframePreviewSection.style.display = 'block';
                    } else {
                        iframePreviewSection.style.display = 'none';
                    }

                    break;

                case 'image':
                    imagePreview.setAttribute('src','http://streambadge.com/' + service + '/' + theme + username + '.png');

                    if ( imagePreviewSection.style.display === 'none' || imagePreviewSection.style.display === '' ) {
                        imagePreviewSection.style.display = 'block';
                    } else {
                        imagePreviewSection.style.display = 'none';
                    }

                    break;

                case 'bbcode':
                    bbcodePreview.setAttribute('src','http://streambadge.com/' + service + '/' + theme + username + '.png');

                    if ( bbcodePreviewSection.style.display === 'none' || bbcodePreviewSection.style.display === '' ) {
                        bbcodePreviewSection.style.display = 'block';
                    } else {
                        bbcodePreviewSection.style.display = 'none';
                    }

                    break;

                default:
                    break;

            }

            el.classList.toggle('available');
            el.classList.toggle('active');

            return false;

        };

    });

    var init = function () {

        var date = new Date(),
            year = document.querySelector('[data-js=year]');

        // Initial textarea value
        generateCode();

        // Footer year
        //year.innerHTML = date.getFullYear();

    };

    return {
        init: init
    };


})(document, window);

app.init();