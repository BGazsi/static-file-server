(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ConvKit = factory());
}(this, (function () { 'use strict';

    function convkitCookie() {
        this.getCookie = function (name) {
            var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
            return match ? match[1] : null
        };
        this.setCookie = function (name, value) {
            document.cookie = name + '=' + (value || '') + ' path=/';
        };
    }

    function config () {
      return {
        urls: {
          addToCart: 'http://convkit.local:8080',
          favorite: 'http://convkit.local:8080',
          purchase: 'http://convkit.local:8080',
          show: 'http://convkit.local:8080'
        },
        selectors: {
          addToCart: '[data-atc]',
          favorite: '[data-fav]',
          purchase: '',
          show: '[data-product-page]',
          id: 'data-convkit-id',
          price: 'data-convkit-price',
          origPrice: 'data-convkit-original-price'
        },
        timeout: 900000,
        lsKey: '__convkit-sent'
      }
    }

    function Convkit () {
      this.init = function () {
        this.options = JSON.parse(JSON.stringify(config()));
        this.cookieHandler = new convkitCookie();
        this.configureUserAgent();
        this.attachEventListeners();
        this.show();
      };
      this.attachEventListeners = function () {
        document.querySelectorAll(this.options.selectors.addToCart).forEach(function (element) {
          element.addEventListener('click', this.addToCart.bind(this));
        }.bind(this));
        document.querySelectorAll(this.options.selectors.favorite).forEach(function (element) {
          element.addEventListener('click', this.favorites.bind(this));
        }.bind(this));
      };
      this.addToCart = function (e) {
        var params = {
          pid: e.currentTarget.getAttribute(this.options.selectors.id),
          e: 'atc',
          p: e.currentTarget.getAttribute(this.options.selectors.price),
          op: e.currentTarget.getAttribute(this.options.selectors.origPrice)
        };
        this.sendEvent(this.options.urls.addToCart, params);
      };
      this.favorites = function (e) {
        var params = {
          pid: e.currentTarget.getAttribute(this.options.selectors.id),
          e: 'fav',
          p: e.currentTarget.getAttribute(this.options.selectors.price),
          op: e.currentTarget.getAttribute(this.options.selectors.origPrice)
        };
        this.sendEvent(this.options.urls.addToCart, params);
      };
      this.show = function () {
        var element = document.querySelector(this.options.selectors.show);
        var pid = !!element ? element.getAttribute(this.options.selectors.id) : false;
        if (!element || this.isSent(pid)) {
          return
        }
        var params = {
          pid: pid,
          e: 'show',
          p: element.getAttribute(this.options.selectors.price),
          op: element.getAttribute(this.options.selectors.origPrice)
        };
        this.sendEvent(this.options.urls.show, params);
        this.setSent(pid);
      };
      this.sendEvent = function (url, params) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(this.createQuery(params));
      };
      this.createQuery = function (params) {
        var ret = '';
        for(var param in params) {
          if (params.hasOwnProperty(param)) {
            ret += (ret.length ? '&' : '') + param + '=' + params[param];
          }
        }
        return ret
      };
      this.isSent = function (pid) {
        var sentItems = JSON.parse(window.localStorage.getItem(this.options.lsKey)) || {};
        for (var id in sentItems) {
          if (sentItems[id] < new Date().getTime() - this.options.timeout) {
            delete sentItems[id];
          }
        }
        window.localStorage.setItem(this.options.lsKey, JSON.stringify(sentItems));
        return !!sentItems[pid]
      };
      this.setSent = function (pid) {
        var sentItems = JSON.parse(window.localStorage.getItem(this.options.lsKey)) || {};
        sentItems[pid] = new Date().getTime();
        window.localStorage.setItem(this.options.lsKey, JSON.stringify(sentItems));
      };
      this.configureUserAgent = function () {
        if (this.cookieHandler.getCookie('__convID')) {
          return
        }
        this.cookieHandler.setCookie('__convID', 'conv' + (Math.random() * 999999999));
      };
    }

    function convkitPlugin () {
        this.plugin = new Convkit();
        this.plugin.init();
    }

    return convkitPlugin;

})));
