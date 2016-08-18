function scrollTo(sel) {
    if (window.jQuery) {
        $('html, body').animate({
            scrollTop: $(sel).offset().top - 20
        });
    } else {
        document.querySelector(sel).scrollIntoView();
    }
}