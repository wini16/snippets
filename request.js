mmcore._async = true;
mmcore.SetAction('Page_Impressions', 1, 'page_view');
mmcore.SetPageID('mmevents');
mmcore.CGRequest(function () {
    console.log('page_view has been successfully tracked!');
});

function sendAction(action, val, attr) {
    mmcore._async = true;
    mmcore.SetAction(action, val, attr || '');
    mmcore.SetPageID('mmevents');
    mmcore.CGRequest(function () {});
}
