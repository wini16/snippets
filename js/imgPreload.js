function imgPreload(url) {
    var img = new Image();
    img.src = url;
    return img;
}

function imgPreload(url) {
    var img = new Image(),
        def = Deferred();
    img.addEventListener('load', () => {
        def.resolve();
    });
    img.src = url;
    return def.promise();
}

function imgsPreload(arr) {
    arr.forEach(function (url) {
        var img = new Image();
        img.src = url;
    });
}