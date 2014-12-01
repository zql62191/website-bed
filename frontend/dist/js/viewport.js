(function() {
    var vp = document.getElementById('viewport');
    var width = (!/tablet|iPad/i.test(navigator.userAgent) && /[^-]mobi/i.test(navigator.userAgent)) ? '640' : '1024';
    vp.setAttribute('content', 'target-densitydpi=device-dpi, width=' + width + ', user-scalable=0');
})();
