orgObj.orgMethod = (function (org) {
    return function () {
        /*custom/additional code start*/
        //
        //
        //
        /*custom/additional code end*/

        //call original function
        org.apply(orgObj, arguments);
    };
})(orgObj.orgMethod);

function decorate(original) {
    return function () {
        var r = original.apply(this, arguments);
        
        return r;
    };
}