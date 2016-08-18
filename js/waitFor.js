function waitFor(test, callback, int, tOut) {
    return (function () {
        var interval = setInterval(function () {
            if (test()) {
                clearInterval(interval);
                callback();
            }
        }, int || 50);
        setTimeout(function () {
            clearInterval(interval);
        }, tOut || 5000);
    }());
}

function waitFor(test, callback, int, tOut) {
    return (() => {
        let interval = setInterval(() => {
            if (test()) {
                clearInterval(interval);
                callback();
            }
        }, int || 50);
        setTimeout(() => {
            clearInterval(interval);
        }, tOut || 5000);
    })();
}

function waitFor(n,t,e,r){return function(){var a=setInterval(function(){n()&&(clearInterval(a),a=null,t())},e||50);setTimeout(function(){a&&clearInterval(a)},r||5e3)}()}