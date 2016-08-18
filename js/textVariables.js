function text(str, obj) {
    return Object.keys(obj).reduce(function (prev, key) {
        return prev.replace(new RegExp('{' + key + '}', 'g'), obj[key]);
    }, str);
}