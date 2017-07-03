//warring：注意及时删除事件，不然会导致内存泄露，因为evnt会保持事件对象和方法的引用，除非显式删除。
define('common.static.js.event', function () {
    var event = {
        on: function (type, fun) {
            if (typeof type == 'string') {
                type = [type];
            }
            for (var i = 0; i < type.length; i++) {
                this._event = this._event || {};
                this._event[type[i]] = this._event[type[i]] || [];
                this._event[type[i]].push(fun);
            }
        },
        once: function (type, fun) {

            this._eventOnce = this._eventOnce || {};
            this._eventOnce[type] = this._eventOnce[type] || [];

            if (this._eventOnce[type].hasEmited === true) {
                fun.call(this, this._eventOnce[type].data);
            }
            else {
                this._eventOnce[type] = this._eventOnce[type] || [];
                this._eventOnce[type].push(fun);
            }

        },
        un: function () {
            //todo:以后实现
        },
        emit: function (type, data, isGlobal) {

            emitEvent.call(this, type, data);

            //全局事件发到document
            if (isGlobal) {
                emitEvent.call(document, type, data);
            }
        },
        emitOnce: function (type, data) {
            this._eventOnce = this._eventOnce || {};
            this._eventOnce[type] = this._eventOnce[type] || [];

            if (this._eventOnce[type].hasEmited === true) {
                return false;
            }

            this._eventOnce[type].hasEmited = true;
            this._eventOnce[type].data = data;

            for (var i = 0; i < this._eventOnce[type].length; i++) {
                this._eventOnce[type][i].call(this, data);
            }

            return true;
        }
    };

    function emitEvent(type, data) {
        if (!this._event || !this._event[type]) { return; }
        for (var i = 0; i < this._event[type].length; i++) {
            this._event[type][i].call(this, data);
        }
    }

    function eventable(target) {
        for (var key in event) {
            if (event.hasOwnProperty(key)) {
                if (typeof target == 'function') {
                    target.prototype[key] = event[key];
                }
                if (typeof target == 'object') {
                    target[key] = event[key];
                }
            }
        }
    }
    eventable(window.document);
    /*--------------------------------------*/

    function on(target, type, handler) {
        if (!target) {
            return;
        }
        type = type.split(',');
        if (window.addEventListener) {
            for (var i = 0; i < type.length; i++) {
                target.addEventListener(type[i], handler, false);
            }
        }
        else {
            for (var i = 0; i < type.length; i++) {
                target.attachEvent('on' + type[i], function () {
                    var e = window.event;

                    e.target = e.srcElement;
                    e.stopPropagation = function () {
                        e.cancelBubble = true;
                    };
                    e.preventDefault = function () {
                        e.returnValue = false;
                    }
                    handler.call(target, e);
                });
            }
        }
    }

    function off(target, type, handler) {
        type = type.split(',');
        if (window.addEventListener) {
            for (var i = 0; i < type.length; i++) {
                target.removeEventListener(type[i], handler);
            }
        }
        else {
            for (var i = 0; i < type.length; i++) {
                target.detachEvent('on' + type[i], handler);
            }
        }
    }

    return {
        eventable: eventable,
        on: on,
        off: off
    }
});