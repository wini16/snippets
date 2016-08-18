window.addEventListener('error', function (e) {
    var error = e.error;
    console.info(error);
    console.info(error.stack);
});