jQuery(document).ajaxComplete(function (a, s, d) {
    console.info(s);
    console.info(d);
});

XMLHttpRequest.prototype.open = (function (org) {
    return function () {
        var result = org.apply(this, arguments);
        
        console.info(arguments);

        this.addEventListener("readystatechange", function (e) {
            if (e.target.readyState === 4 && e.target.status === 200) {
                //Do stuff here, AJAX COMPLETE
            }
        }, false);
        
        return result;
    };
})(XMLHttpRequest.prototype.open);