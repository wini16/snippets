function storeCookie() {
    let persStore = cookies.get('mmapi.store.p.0'),
        sessStore = cookies.get('mmapi.store.s.0');
    window.name = persStore + ';' + sessStore;
}

function restoreCookie() {
    if (window.name) {
        let nameArr = window.name.split(';');
        cookies.set('mmapi.store.p.0', nameArr[0], {
            expires: 365
        });
        cookies.set('mmapi.store.s.0', nameArr[1]);
        window.name = '';
    }
}