$.fn.run = function(callback) {
    var args = [].slice.call(arguments, 1);

    callback.call(this, args);

    return this;
};
