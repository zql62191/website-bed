if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(con) {
    'use strict';
    var prop, method;
    var empty = {};
    var dummy = function() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
        'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop()) con[prop] = con[prop] || empty;
    while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {}); // Using `this` for web workers.

(function($) {
    $.fn.removeClassRegEx = function(regex) {
        var classes = $(this).attr('class');
        if(!classes || !regex) return false;
        var classArray = [];
        classes = classes.split(' ');
        for(var i=0, len=classes.length; i<len; i++)
            if(!classes[i].match(regex)) classArray.push(classes[i]);
        $(this).attr('class', classArray.join(' '));
        return $(this);
    };
})(jQuery);
