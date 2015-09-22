(function (mmcore) {
    'use strict';

    function Renderer(selectors, campaign) {
        var gi = (function () {
                return Object.keys(tc);
            })();

        function rmbsToggler() {
            gi.forEach(function (i) {
                mmcore._r_mbs[i] = mmcore._r_mbs[i] ? 0 : 1;
            });
        }

        function createIdString() {
            var string = '';
            Object.keys(selectors).forEach(function (el) {
                string += selectors[el];
            });
            return string;
        }


        function hideElements() {
            var styleString = '',
                idString = createIdString(),
                styleElement;

            Object.keys(selectors).forEach(function (el) {
                styleString += el + '{visibility:hidden !important;}';
            });
            styleString += 'body {visibility:hidden !important;}';
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.setAttribute('id', idString);
            if (/WebKit|MSIE/i.test(navigator.userAgent)) {
                if (styleElement.styleSheet) {
                    styleElement.styleSheet.cssText = styleString;
                } else {
                    styleElement.innerText = styleString;
                }
            } else {
                styleElement.innerHTML = styleString;
            }
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }


        function showElements() {
            var onPage = 0,
                selectorKeys = Object.keys(selectors),
                qt = Object.keys(selectors).length;

            function renderCustom(name) {
                mmcore._r_mbs[name] = 0;
                mmcore.RenderMaxyboxes(name);
            }

            function targetsArrived() {
                var renderersArr = true,
                    idString = createIdString(),
                    name;

                for (name in selectors) {
                    if (selectors.hasOwnProperty(name)) {
                        if (!mmcore._renderers[selectors[name]] && mmcore.GenInfo[campaign][selectors[name].toLowerCase()] !== 'Default') {
                            renderersArr = false;
                        }
                    }
                }
                if (renderersArr) {
                    for (name in selectors) {
                        if (selectors.hasOwnProperty(name)) {
                            renderCustom(selectors[name]);
                        }
                    }
                    var styleElement = document.getElementById(idString);
                    if (styleElement) {
                        styleElement.parentNode.removeChild(styleElement);
                        styleElement = null;
                    }
                } else {
                    setTimeout(targetsArrived, 0);
                }
            }

            function isDefaultArrived(m) {
                var b, p, x = document.querySelector(m);
                if (!x) {
                    return false;
                }
                b = document.body;
                p = 'parentNode';
                while (!x.nextSibling && x !== b && x[p]) {
                    x = x[p];
                }
                if (x === b || !x[p]) {
                    return false;
                }
                return true;
            }

            function elsHandler() {
                if (onPage === qt || mmcore._docEnd) {
                    targetsArrived();
                } else {
                    selectorKeys.forEach(function (el) {
                        if (isDefaultArrived(el) && mmcore._renderers[selectors[el]] || mmcore.GenInfo[campaign][selectors[el].toLowerCase()] === 'Default') {
                            selectorKeys.splice(selectorKeys.indexOf(el), 1);
                            onPage++;
                        }
                    });
                    setTimeout(elsHandler, 0);
                }
            }
            elsHandler();
        }

        return {
            render: function (async) {
                if (!async) {
                    hideElements();
                }
                mmcore.HideMaxyboxes = mmcore.ShowMaxyboxes = function () {};
                mmcore._incrRender = false;
                rmbsToggler();
                showElements();
            }
        };
    }

    mmcore.renderer = Renderer;
    mmcore.renderer.hide = function (selectors, hideBody) {
        var styleString = '',
            idString = '',
            styleElement;

        Object.keys(selectors).forEach(function (el) {
            styleString += el + '{visibility:hidden !important;}';
            idString += selectors[el];
        });
        if (hideBody) {
            styleString += 'body {visibility:hidden !important;}';
        }
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.setAttribute('id', idString);
        if (/WebKit|MSIE/i.test(navigator.userAgent)) {
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = styleString;
            } else {
                styleElement.innerText = styleString;
            }
        } else {
            styleElement.innerHTML = styleString;
        }
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        setTimeout(function () {
            var elem = document.getElementById(idString);
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        }, 2000);
    };
}(mmcore));

// Usage:
// var headerRenderer = new mmcore.renderer({'h1.main': 'header'}, campaignName);
// {'selector (string)': 'element name from UI (string)'}, campaignName (string)
//
// If one CGRequest just run renderer
// headerRenderer.render(async);
// async (boolean, optional)
