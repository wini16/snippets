function searchToObject() {
    var empty = Object.create(null);
    if (!window.location.search) {
        return empty;
    }
    return window.location.search
        .substring(1)
        .split('&')
        .map(function (pair) {
            if (pair !== '') {
                return pair.split('=');
            }
        })
        .reduce(function (obj, pair, i, arr) {
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            obj.arr = arr;
            return obj;
        }, empty);
}

function searchToObject(str) {
    var empty = Object.create(null),
        start = str.indexOf('?');
    if (start === -1) {
        return empty;
    } else {
        str = str.substr(start + 1);
    }
    return str
        .split('&')
        .map(function (pair) {
            if (pair !== '') {
                return pair.split('=');
            }
        })
        .reduce(function (obj, pair, i, arr) {
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            obj.arr = arr;
            return obj;
        }, empty);
}