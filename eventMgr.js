/* EventManager, v1.0.1
 *
 * Copyright (c) 2009, Howard Rauscher
 * Licensed under the MIT License
 */

(function (mmcore) {
    'use strict';
    console.log('MANAGER');
    function EventManager() {
        this._listeners = {};
    }

    EventManager.prototype = {
        on: function (name, fn) {
            (this._listeners[name] = this._listeners[name] || []).push(fn);
            return this;
        },
        remove: function (name, fn) {
            if (arguments.length === 1) {
                this._listeners[name] = [];
            } else if (typeof (fn) === 'function') {
                var listeners = this._listeners[name];
                if (listeners !== undefined) {
                    var foundAt = -1;
                    for (var i = 0, len = listeners.length; i < len && foundAt === -1; i++) {
                        if (listeners[i] === fn) {
                            foundAt = i;
                        }
                    }

                    if (foundAt >= 0) {
                        listeners.splice(foundAt, 1);
                    }
                }
            }

            return this;
        },
        fire: function (name, args) {
            var listeners = this._listeners[name];
            args = args || [];
            if (listeners !== undefined) {
                var data = {},
                    evt;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    evt = new EventManager.EventArg(name, data);

                    listeners[i].apply(window, args.concat(evt));

                    data = evt.data;
                    if (evt.removed) {
                        listeners.splice(i, 1);
                        len = listeners.length;
                        --i;
                    }
                    if (evt.cancelled) {
                        break;
                    }
                }
            }
            return this;
        },
        hasListeners: function (name) {
            return (this._listeners[name] === undefined ? 0 : this._listeners[name].length) > 0;
        }
    };

    EventManager.EventArg = function (name, data) {
        this.name = name;
        this.data = data;
        this.cancelled = false;
        this.removed = false;
    };
    EventManager.EventArg.prototype = {
        cancel: function () {
            this.cancelled = true;
        },
        remove: function () {
            this.removed = true;
        }
    };

    mmcore.eMgr = new EventManager();
})(mmcore);
