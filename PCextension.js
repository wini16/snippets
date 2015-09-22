// An update to this

// Added method to get a specific criterion only instead of getting all criteria.

// mmcore.SetPersistentCriterion('foo', 'bar');
// mmcore.SetPersistentCriterion('baz', 'qux');
// Previously it was only possible to get all the criteria at once.
// It was inconvenient if only one criterion was needed.
// var criteria = mmcore.GetPersistentCriteria();
// var foo = criteria.foo;
// Now it's can be done easily.
// var foo = mmcore.GetPersistentCriterion('foo');

(function (mmcore) {
    'use strict';
    var COOKIE_NAME = 'mm_pc';
    var COOKIE_LIFETIME = 365; // A year

    /** @param {!Object.<string>} persCriteria */
    function setPersistentCriteria(persCriteria) {
        var serializedPersCriteria = [];
        var persCriterionValue;
        for (var persCriterionName in persCriteria) {
            if (persCriteria.hasOwnProperty(persCriterionName)) {
                persCriterionValue = persCriteria[persCriterionName];
                serializedPersCriteria.push([
          window.escape(persCriterionName),
          window.escape(persCriterionValue)
        ].join('='));
            }
        }
        var cookieValue = serializedPersCriteria.join('&');
        mmcore.SetCookie(COOKIE_NAME, cookieValue, COOKIE_LIFETIME, true);
    }

    mmcore._Clear = (function (_Clear) {
        return function () {
            _Clear.apply(mmcore, arguments);
            var persCriteria = mmcore.GetPersistentCriteria();
            var persCriterionValue;
            for (var persCriterionName in persCriteria) {
                if (persCriteria.hasOwnProperty(persCriterionName)) {
                    persCriterionValue = persCriteria[persCriterionName];
                    mmcore.SetPersCriterion(persCriterionName, persCriterionValue);
                }
            }
        };
    })(mmcore._Clear);

    /**
     * @param {string} name
     * @param {string} value
     */
    mmcore.SetPersistentCriterion = function (name, value) {
        var persCriteria = mmcore.GetPersistentCriteria();
        persCriteria[name] = value;
        setPersistentCriteria(persCriteria);
        mmcore.SetPersCriterion(name, value);
    };

    /** @param {string} name */
    mmcore.UnsetPersistentCriterion = function (name) {
        var persCriteria = mmcore.GetPersistentCriteria();
        if (!persCriteria.hasOwnProperty(name)) {
            return;
        }
        delete persCriteria[name];
        setPersistentCriteria(persCriteria);
        try {
            delete mmcore._vars.uat[name];
        } catch (error) {}
    };

    /** @return {!Object.<string>} */
    mmcore.GetPersistentCriteria = function () {
        var persCriteria = {};
        var cookieValue = mmcore.GetCookie(COOKIE_NAME, true);
        cookieValue.replace(/([^&]*)=([^&]*)/g, function (ignoredMatch, escapedName, escapedValue) {
            persCriteria[window.unescape(escapedName)] = window.unescape(escapedValue);
        });
        return persCriteria;
    };


    /**
     * @param {string} name
     * @return {?string} null if the persistent personalisation criterion unset.
     */
    mmcore.GetPersistentCriterion = function (name) {
        var persCriteria = mmcore.GetPersistentCriteria();
        return persCriteria.hasOwnProperty(name) ? persCriteria[name] : null;
    };
})(mmcore);
