(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.convkit = factory());
}(this, (function () { 'use strict';

    function convkitCookie() {
        this._getCookie = function (name) {
            var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
            return match ? match[1] : null
        };
        this._setCookie = function (name, value) {
            document.cookie = name + '=' + (value || '') + ' path=/';
        };
    }

    function config () {
        return {
            "urls": {
                "addToCart": "http://convkit.local:8080",
                "favorite": "http://convkit.local:8080",
                "purchase": "http://convkit.local:8080",
                "show": "http://convkit.local:8080"
            }
        }
    }

    function Convkit() {
        this.init = function () {
            this.options = JSON.parse(JSON.stringify(config()));
            this.cookieHandler = new convkitCookie();
            this.configureUserAgent();
            this.attachEventListeners();
            this.show();
        };
        this.attachEventListeners = function () {
            document.querySelectorAll('[data-atc-convkit-id]').forEach(function (element) {
                element.addEventListener('click', this.addToCart.bind(this));
            }.bind(this));
            document.querySelectorAll('[data-fav-convkit-id]').forEach(function (element) {
                element.addEventListener('click', this.favorites.bind(this));
            }.bind(this));
        };
        this.addToCart = function (e) {
            var id = e.currentTarget.getAttribute('data-atc-convkit-id');
            this.sendEvent(this.options.urls.addToCart, id, 'atc');
        };
        this.favorites = function (e) {
            var id = e.currentTarget.getAttribute('data-fav-convkit-id');
            this.sendEvent(this.options.urls.addToCart, id, 'fav');
        };
        this.show = function () {
            var element = document.querySelector('[data-convkit-product-page]');
            if (!element) {
                return
            }
            this.sendEvent(this.options.urls.show, element.getAttribute('data-convkit-product-page'), 'show');
        };
        this.sendEvent = function (url, id, eventType) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('pid=' + id + '&e=' + eventType);
        };
        this.configureUserAgent = function () {
            if (this.cookieHandler._getCookie('__convID')) {
                return
            }
            this.cookieHandler._setCookie('__convID', 'conv' + (Math.random() * 999999999));
        };
    }

    function convkitPlugin () {
        this.plugin = new Convkit();
        this.plugin.init();
    }

    return convkitPlugin;

})));
