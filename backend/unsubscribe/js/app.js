// Polyfills for methods uses in this

// Array.prototype.filter
Array.prototype.filter = function filter(callback) {
    if (this === undefined || this === null) {
        throw new TypeError(this + 'is not an object');
    }

    if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function');
    }

    var
        object = Object(this),
        scope = arguments[1],
        arraylike = object instanceof String ? object.split('') : object,
        length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
        index = -1,
        result = [],
        element;

    while (++index < length) {
        element = arraylike[index];

        if (index in arraylike && callback.call(scope, element, index, object)) {
            result.push(element);
        }
    }

    return result;
};

// Array.prototype.indexOf
Array.prototype.indexOf = function indexOf(searchElement) {
    if (this === undefined || this === null) {
        throw new TypeError(this + 'is not an object');
    }

    var
        arraylike = this instanceof String ? this.split('') : this,
        length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
        index = Number(arguments[1]) || 0;

    index = (index < 0 ? Math.max(length + index, 0) : index) - 1;

    while (++index < length) {
        if (index in arraylike && arraylike[index] === searchElement) {
            return index;
        }
    }

    return -1;
};

// Array.prototype.map
Array.prototype.map = function map(callback) {
    if (this === undefined || this === null) {
        throw new TypeError(this + 'is not an object');
    }

    if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function');
    }

    var
        object = Object(this),
        scope = arguments[1],
        arraylike = object instanceof String ? object.split('') : object,
        length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
        index = -1,
        result = [],
        element;

    while (++index < length) {
        if (index in arraylike) {
            result[index] = callback.call(scope, arraylike[index], index, object);
        }
    }

    return result;
};

// Object.keys
Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result;
    };
}());

// Array.prototype.forEach
Array.prototype.forEach = function forEach(callback) {
    if (this === undefined || this === null) {
        throw new TypeError(this + 'is not an object');
    }

    if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function');
    }

    var
    object = Object(this),
    scope = arguments[1],
    arraylike = object instanceof String ? object.split('') : object,
    length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
    index = -1,
    result = [],
    element;

    while (++index < length) {
        if (index in arraylike) {
            callback.call(scope, arraylike[index], index, object);
        }
    }
};

(function() {
    'use strict';
    angular.module('ngMask', []);
})();
(function() {
    'use strict';
    angular.module('ngMask')
        .directive('mask', ['$log', '$timeout', 'MaskService', function($log, $timeout, MaskService) {
            return {
                restrict: 'A',
                require: 'ngModel',
                compile: function($element, $attrs) {

                    if (!$attrs.mask || !$attrs.ngModel) {
                        $log.info('Mask and ng-model attributes are required!');
                        return;
                    }

                    var maskService = MaskService.create();
                    var timeout;
                    var promise;

                    function setSelectionRange(selectionStart) {
                        if (typeof selectionStart !== 'number') {
                            return;
                        }

                        // using $timeout:
                        // it should run after the DOM has been manipulated by Angular
                        // and after the browser renders (which may cause flicker in some cases)
                        $timeout.cancel(timeout);
                        timeout = $timeout(function() {
                            var selectionEnd = selectionStart + 1;
                            var input = $element[0];

                            if (input.setSelectionRange) {
                                input.focus();
                                input.setSelectionRange(selectionStart, selectionEnd);
                            } else if (input.createTextRange) {
                                var range = input.createTextRange();

                                range.collapse(true);
                                range.moveEnd('character', selectionEnd);
                                range.moveStart('character', selectionStart);
                                range.select();
                            }
                        });
                    }

                    return {
                        pre: function($scope, $element, $attrs, controller) {
                            promise = maskService.generateRegex({
                                mask: $attrs.mask,
                                // repeat mask expression n times
                                repeat: ($attrs.repeat || $attrs.maskRepeat),
                                // clean model value - without divisors
                                clean: (($attrs.clean || $attrs.maskClean) === 'true'),
                                // limit length based on mask length
                                limit: (($attrs.limit || $attrs.maskLimit || 'true') === 'true'),
                                // how to act with a wrong value
                                restrict: ($attrs.restrict || $attrs.maskRestrict || 'select'), //select, reject, accept
                                // set validity mask
                                validate: ($attrs.validate || $attrs.maskValidate || 'true'),
                                // default model value
                                model: $attrs.ngModel,
                                // default input value
                                value: $attrs.ngValue
                            });
                        },
                        post: function($scope, $element, $attrs, controller) {
                            promise.then(function() {
                                // get initial options
                                var options = maskService.getOptions();

                                function parseViewValue(value) {

                                    // set default value equal 0
                                    value = value || '';

                                    // get view value object
                                    var viewValue = maskService.getViewValue(value);


                                    // get mask without question marks
                                    var maskWithoutOptionals = options.maskWithoutOptionals || '';

                                    // get view values capped
                                    // used on view
                                    var viewValueWithDivisors = viewValue.withDivisors(true);
                                    // used on model
                                    var viewValueWithoutDivisors = viewValue.withoutDivisors(true);

                                    try {
                                        // get current regex
                                        var regex = maskService.getRegex(viewValueWithDivisors.length - 1);
                                        var fullRegex = maskService.getRegex(maskWithoutOptionals.length - 1);

                                        // current position is valid
                                        var validCurrentPosition = regex.test(viewValueWithDivisors) || fullRegex.test(viewValueWithDivisors);

                                        // difference means for select option
                                        var diffValueAndViewValueLengthIsOne = (value.length - viewValueWithDivisors.length) === 1;
                                        var diffMaskAndViewValueIsGreaterThanZero = (maskWithoutOptionals.length - viewValueWithDivisors.length) > 0;

                                        if (options.restrict !== 'accept') {
                                            if (options.restrict === 'select' && (!validCurrentPosition || diffValueAndViewValueLengthIsOne)) {
                                                var lastCharInputed = value[(value.length - 1)];
                                                var lastCharGenerated = viewValueWithDivisors[(viewValueWithDivisors.length - 1)];

                                                if ((lastCharInputed !== lastCharGenerated) && diffMaskAndViewValueIsGreaterThanZero) {
                                                    viewValueWithDivisors = viewValueWithDivisors + lastCharInputed;
                                                }

                                                var wrongPosition = maskService.getFirstWrongPosition(viewValueWithDivisors);
                                                if (angular.isDefined(wrongPosition)) {
                                                    setSelectionRange(wrongPosition);
                                                }
                                            } else if (options.restrict === 'reject' && !validCurrentPosition) {
                                                viewValue = maskService.removeWrongPositions(viewValueWithDivisors);
                                                viewValueWithDivisors = viewValue.withDivisors(true);
                                                viewValueWithoutDivisors = viewValue.withoutDivisors(true);

                                                // setSelectionRange(viewValueWithDivisors.length);
                                            }
                                        }

                                        if (!options.limit) {
                                            viewValueWithDivisors = viewValue.withDivisors(false);
                                            viewValueWithoutDivisors = viewValue.withoutDivisors(false);
                                        }

                                        // Set validity
                                        if ($scope.$eval(options.validate) && controller.$dirty) {
                                            if (fullRegex.test(viewValueWithDivisors)) {
                                                controller.$setValidity('mask', true);
                                            } else {
                                                controller.$setValidity('mask', false);
                                            }
                                        } else {
                                            controller.$setValidity('mask', true);
                                        }

                                        // Update view and model values
                                        if (value !== viewValueWithDivisors) {
                                            controller.$setViewValue(angular.copy(viewValueWithDivisors), 'input');
                                            controller.$render();
                                        }

                                    } catch (e) {
                                        $log.error('[mask - parseViewValue]');
                                        throw e;
                                    }

                                    // Update model, can be different of view value
                                    if (options.clean) {
                                        return viewValueWithoutDivisors;
                                    } else {
                                        return viewValueWithDivisors;
                                    }
                                }

                                // View -> Model
                                controller.$parsers.push(parseViewValue);

                                // Model -> View
                                controller.$formatters.push(parseViewValue);

                                $element.on('click input paste keyup', function() {
                                    parseViewValue($element.val());
                                    $scope.$apply();
                                });

                                // Register the watch to observe remote loading or promised data
                                // Deregister calling returned function
                                var watcher = $scope.$watch($scope.ngModel, function(newValue, oldValue) {
                                    if (angular.isDefined(newValue)) {
                                        parseViewValue(newValue);
                                        watcher();
                                    }
                                });

                                $scope.$watch(function() {
                                    return $scope.$eval(options.validate);
                                }, function(newValue, oldValue) {
                                    if (newValue !== oldValue) {
                                        parseViewValue(controller.$viewValue);
                                    }
                                });

                                // $evalAsync from a directive
                                // it should run after the DOM has been manipulated by Angular
                                // but before the browser renders
                                if (options.value) {
                                    $scope.$evalAsync(function($scope) {
                                        controller.$setViewValue(angular.copy(options.value), 'input');
                                        controller.$render();
                                    });
                                }
                            });
                        }
                    };
                }
            };
        }]);
})();
(function() {
    'use strict';
    angular.module('ngMask')
        .factory('MaskService', ['$q', 'OptionalService', 'UtilService', function($q, OptionalService, UtilService) {
            function create() {
                var options;
                var maskWithoutOptionals;
                var maskWithoutOptionalsLength = 0;
                var maskWithoutOptionalsAndDivisorsLength = 0;
                var optionalIndexes = [];
                var optionalDivisors = {};
                var optionalDivisorsCombinations = [];
                var divisors = [];
                var divisorElements = {};
                var regex = [];
                var patterns = {
                    '9': /[0-9]/,
                    '8': /[0-8]/,
                    '7': /[0-7]/,
                    '6': /[0-6]/,
                    '5': /[0-5]/,
                    '4': /[0-4]/,
                    '3': /[0-3]/,
                    '2': /[0-2]/,
                    '1': /[0-1]/,
                    '0': /[0]/,
                    '*': /./,
                    'w': /\w/,
                    'W': /\W/,
                    'd': /\d/,
                    'D': /\D/,
                    's': /\s/,
                    'S': /\S/,
                    'b': /\b/,
                    'A': /[A-Z]/,
                    'a': /[a-z]/,
                    'Z': /[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
                    'z': /[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,
                    '@': /[a-zA-Z]/,
                    '#': /[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
                    '%': /[0-9a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/
                };

                // REGEX

                function generateIntermetiateElementRegex(i, forceOptional) {
                    var charRegex;
                    var hasOptional;
                    try {
                        var element = maskWithoutOptionals[i];
                        var elementRegex = patterns[element];
                        hasOptional = isOptional(i);

                        if (elementRegex) {
                            charRegex = '(' + elementRegex.source + ')';
                        } else { // is a divisor
                            if (!isDivisor(i)) {
                                divisors.push(i);
                                divisorElements[i] = element;
                            }

                            charRegex = '(' + '\\' + element + ')';
                        }
                    } catch (e) {
                        throw e;
                    }

                    if (hasOptional || forceOptional) {
                        charRegex += '?';
                    }

                    return new RegExp(charRegex);
                }

                function generateIntermetiateRegex(i, forceOptional) {


                    var elementRegex;
                    var elementOptionalRegex;
                    try {
                        var intermetiateElementRegex = generateIntermetiateElementRegex(i, forceOptional);
                        elementRegex = intermetiateElementRegex;

                        var hasOptional = isOptional(i);
                        var currentRegex = intermetiateElementRegex.source;

                        if (hasOptional && ((i + 1) < maskWithoutOptionalsLength)) {
                            var intermetiateRegex = generateIntermetiateRegex((i + 1), true).elementOptionalRegex();
                            currentRegex += intermetiateRegex.source;
                        }

                        elementOptionalRegex = new RegExp(currentRegex);
                    } catch (e) {
                        throw e;
                    }
                    return {
                        elementRegex: function() {
                            return elementRegex;
                        },
                        elementOptionalRegex: function() {
                            // from element regex, gets the flow of regex until first not optional
                            return elementOptionalRegex;
                        }
                    };
                }

                function generateRegex(opts) {
                    var deferred = $q.defer();
                    options = opts;

                    try {
                        var mask = opts.mask;
                        var repeat = opts.repeat;

                        if (repeat) {
                            mask = new Array((parseInt(repeat) + 1)).join(mask);
                        }

                        optionalIndexes = OptionalService.getOptionals(mask).fromMaskWithoutOptionals();
                        options.maskWithoutOptionals = maskWithoutOptionals = OptionalService.removeOptionals(mask);
                        maskWithoutOptionalsLength = maskWithoutOptionals.length;

                        var cumulativeRegex;
                        for (var i = 0; i < maskWithoutOptionalsLength; i++) {
                            var charRegex = generateIntermetiateRegex(i);
                            var elementRegex = charRegex.elementRegex();
                            var elementOptionalRegex = charRegex.elementOptionalRegex();

                            var newRegex = cumulativeRegex ? cumulativeRegex.source + elementOptionalRegex.source : elementOptionalRegex.source;
                            newRegex = new RegExp(newRegex);
                            cumulativeRegex = cumulativeRegex ? cumulativeRegex.source + elementRegex.source : elementRegex.source;
                            cumulativeRegex = new RegExp(cumulativeRegex);

                            regex.push(newRegex);
                        }

                        generateOptionalDivisors();
                        maskWithoutOptionalsAndDivisorsLength = removeDivisors(maskWithoutOptionals).length;

                        deferred.resolve({
                            options: options,
                            divisors: divisors,
                            divisorElements: divisorElements,
                            optionalIndexes: optionalIndexes,
                            optionalDivisors: optionalDivisors,
                            optionalDivisorsCombinations: optionalDivisorsCombinations
                        });
                    } catch (e) {
                        throw e;
                    }

                    return deferred.promise;
                }

                function getRegex(index) {
                    var currentRegex;

                    try {
                        currentRegex = regex[index] ? regex[index].source : '';
                    } catch (e) {
                        throw e;
                    }

                    return (new RegExp('^' + currentRegex + '$'));
                }

                // DIVISOR

                function isOptional(currentPos) {
                    return UtilService.inArray(currentPos, optionalIndexes);
                }

                function isDivisor(currentPos) {
                    return UtilService.inArray(currentPos, divisors);
                }

                function generateOptionalDivisors() {
                    function sortNumber(a, b) {
                        return a - b;
                    }

                    var sortedDivisors = divisors.sort(sortNumber);
                    var sortedOptionals = optionalIndexes.sort(sortNumber);
                    for (var i = 0; i < sortedDivisors.length; i++) {
                        var divisor = sortedDivisors[i];
                        for (var j = 1; j <= sortedOptionals.length; j++) {
                            var optional = sortedOptionals[(j - 1)];
                            if (optional >= divisor) {
                                break;
                            }

                            if (optionalDivisors[divisor]) {
                                optionalDivisors[divisor] = optionalDivisors[divisor].concat(divisor - j);
                            } else {
                                optionalDivisors[divisor] = [(divisor - j)];
                            }

                            // get the original divisor for alternative divisor
                            divisorElements[(divisor - j)] = divisorElements[divisor];
                        }
                    }
                }

                function removeDivisors(value) {
                    try {

                        if (divisors.length > 0 && value) {
                            var keys = Object.keys(divisorElements);
                            var elments = [];

                            for (var i = keys.length - 1; i >= 0; i--) {
                                var divisor = divisorElements[keys[i]];
                                if (divisor) {
                                    elments.push(divisor);
                                }
                            }

                            elments = UtilService.uniqueArray(elments);

                            // remove if it is not pattern
                            var regex = new RegExp(('[' + '\\' + elments.join('\\') + ']'), 'g');

                            return value.replace(regex, '');
                        } else {
                            return value;
                        }
                    } catch (e) {
                        throw e;
                    }
                }

                function insertDivisors(array, combination) {
                    function insert(array, output) {
                        var out = output;
                        for (var i = 0; i < array.length; i++) {
                            var divisor = array[i];
                            if (divisor < out.length) {
                                out.splice(divisor, 0, divisorElements[divisor]);
                            }
                        }
                        return out;
                    }

                    var output = array;
                    var divs = divisors.filter(function(it) {
                        var optionalDivisorsKeys = Object.keys(optionalDivisors).map(function(it) {
                            return parseInt(it);
                        });

                        return !UtilService.inArray(it, combination) && !UtilService.inArray(it, optionalDivisorsKeys);
                    });

                    if (!angular.isArray(array) || !angular.isArray(combination)) {
                        return output;
                    }

                    // insert not optional divisors
                    output = insert(divs, output);

                    // insert optional divisors
                    output = insert(combination, output);

                    return output;
                }

                function tryDivisorConfiguration(value) {
                    var output = value.split('');
                    var defaultDivisors = true;

                    // has optional?
                    if (optionalIndexes.length > 0) {
                        var lazyArguments = [];
                        var optionalDivisorsKeys = Object.keys(optionalDivisors);

                        // get all optional divisors as array of arrays [[], [], []...]
                        for (var i = 0; i < optionalDivisorsKeys.length; i++) {
                            var val = optionalDivisors[optionalDivisorsKeys[i]];
                            lazyArguments.push(val);
                        }

                        // generate all possible configurations
                        if (optionalDivisorsCombinations.length === 0) {
                            UtilService.lazyProduct(lazyArguments, function() {
                                // convert arguments to array
                                optionalDivisorsCombinations.push(Array.prototype.slice.call(arguments));
                            });
                        }

                        /* jshint -W004 */
                        for (var i = optionalDivisorsCombinations.length - 1; i >= 0; i--) {
                            var outputClone = angular.copy(output);
                            outputClone = insertDivisors(outputClone, optionalDivisorsCombinations[i]);

                            // try validation
                            var viewValueWithDivisors = outputClone.join('');
                            var regex = getRegex(maskWithoutOptionals.length - 1);

                            if (regex.test(viewValueWithDivisors)) {
                                defaultDivisors = false;
                                output = outputClone;
                                break;
                            }
                        }
                    }

                    if (defaultDivisors) {
                        output = insertDivisors(output, divisors);
                    }

                    return output.join('');
                }

                // MASK

                function getOptions() {
                    return options;
                }

                function getViewValue(value) {
                    try {
                        var outputWithoutDivisors = removeDivisors(value);
                        var output = tryDivisorConfiguration(outputWithoutDivisors);

                        return {
                            withDivisors: function(capped) {
                                if (capped) {
                                    return output.substr(0, maskWithoutOptionalsLength);
                                } else {
                                    return output;
                                }
                            },
                            withoutDivisors: function(capped) {
                                if (capped) {
                                    return outputWithoutDivisors.substr(0, maskWithoutOptionalsAndDivisorsLength);
                                } else {
                                    return outputWithoutDivisors;
                                }
                            }
                        };
                    } catch (e) {
                        throw e;
                    }
                }

                // SELECTOR

                function getWrongPositions(viewValueWithDivisors, onlyFirst) {
                    var pos = [];

                    if (!viewValueWithDivisors) {
                        return 0;
                    }

                    for (var i = 0; i < viewValueWithDivisors.length; i++) {
                        var pattern = getRegex(i);
                        var value = viewValueWithDivisors.substr(0, (i + 1));

                        if (pattern && !pattern.test(value)) {
                            pos.push(i);

                            if (onlyFirst) {
                                break;
                            }
                        }
                    }

                    return pos;
                }

                function getFirstWrongPosition(viewValueWithDivisors) {
                    return getWrongPositions(viewValueWithDivisors, true)[0];
                }

                function removeWrongPositions(viewValueWithDivisors) {

                    var wrongPositions = getWrongPositions(viewValueWithDivisors, false);
                    var newViewValue = viewValueWithDivisors;

                    wrongPositions.forEach(function(element, index, array) {
                        var wrongPosition = wrongPositions[index];
                        var viewValueArray = viewValueWithDivisors.split('');
                        viewValueArray.splice(wrongPosition, 1);
                        newViewValue = viewValueArray.join('');
                    });

                    return getViewValue(newViewValue);
                }

                return {
                    getViewValue: getViewValue,
                    generateRegex: generateRegex,
                    getRegex: getRegex,
                    getOptions: getOptions,
                    removeDivisors: removeDivisors,
                    getFirstWrongPosition: getFirstWrongPosition,
                    removeWrongPositions: removeWrongPositions
                };
            }

            return {
                create: create
            };
        }]);
})();
(function() {
    'use strict';
    angular.module('ngMask')
        .factory('OptionalService', [function() {
            function getOptionalsIndexes(mask) {
                var indexes = [];

                try {
                    var regexp = /\?/g;
                    var match = [];

                    while ((match = regexp.exec(mask)) !== null) {
                        // Save the optional char
                        indexes.push((match.index - 1));
                    }
                } catch (e) {
                    throw e;
                }

                return {
                    fromMask: function() {
                        return indexes;
                    },
                    fromMaskWithoutOptionals: function() {
                        return getOptionalsRelativeMaskWithoutOptionals(indexes);
                    }
                };
            }

            function getOptionalsRelativeMaskWithoutOptionals(optionals) {
                var indexes = [];
                for (var i = 0; i < optionals.length; i++) {
                    indexes.push(optionals[i] - i);
                }
                return indexes;
            }

            function removeOptionals(mask) {
                var newMask;

                try {
                    newMask = mask.replace(/\?/g, '');
                } catch (e) {
                    throw e;
                }

                return newMask;
            }

            return {
                removeOptionals: removeOptionals,
                getOptionals: getOptionalsIndexes
            };
        }]);
})();
(function() {
    'use strict';
    angular.module('ngMask')
        .factory('UtilService', [function() {

            // sets: an array of arrays
            // f: your callback function
            // context: [optional] the `this` to use for your callback
            // http://phrogz.net/lazy-cartesian-product
            function lazyProduct(sets, f, context) {
                if (!context) {
                    /* jshint -W040 */
                    context = this;
                }

                var p = [];
                var max = sets.length - 1;
                var lens = [];

                for (var i = sets.length; i--;) {
                    lens[i] = sets[i].length;
                }

                function dive(d) {
                    var a = sets[d];
                    var len = lens[d];

                    if (d === max) {
                        for (var i = 0; i < len; ++i) {
                            p[d] = a[i];
                            f.apply(context, p);
                        }
                    } else {
                        /* jshint -W004 */
                        for (var i = 0; i < len; ++i) {
                            p[d] = a[i];
                            dive(d + 1);
                        }
                    }

                    p.pop();
                }

                dive(0);
            }

            function inArray(i, array) {
                var output;

                try {
                    output = array.indexOf(i) > -1;
                } catch (e) {
                    throw e;
                }

                return output;
            }

            function uniqueArray(array) {
                var u = {};
                var a = [];

                for (var i = 0, l = array.length; i < l; ++i) {
                    if (u.hasOwnProperty(array[i])) {
                        continue;
                    }

                    a.push(array[i]);
                    u[array[i]] = 1;
                }

                return a;
            }

            return {
                lazyProduct: lazyProduct,
                inArray: inArray,
                uniqueArray: uniqueArray
            };
        }]);
})();
;(function() {

    /**
     * @ngdoc provider
     * @name ng.provider:rcMailgunProvider
     *
     * @description
     * configure the mailgun api and directive
     * adding to the scope so the attempt flag can be referenced in markup.
     *
     */
    var rcMailgunProvider = {
        'rcMailgun': function() {

            var configuredOptions = {};

            this.configure = function(options) {
                configuredOptions = options;
            };

            this.$get = function() {
                return {
                    getOptions: function() {
                        return configuredOptions;
                    }
                };
            };
        }
    };

    /**
     * @ngdoc directive
     * @name ng.directive:rcMailgunValid
     *
     * @description
     * Used to track submit attempts on forms. It mimics the ngFormController by
     * adding to the scope so the attempt flag can be referenced in markup.
     *
     */
    var rcMailgunValidDirective = {
        'rcMailgunValid': ['rcMailgun', '$http', '$timeout', '$q', function(rcMailgun, $http, $timeout, $q) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    options = rcMailgun.getOptions();

                    options = options || {};

                    if (!options.api_key) {
                        throw new Error('missing api_key!');
                    }

                    var successWrapper = function(data, status, headers, config) {

                        ctrl.$setValidity('rcMailgunInProgress', true);
                        ctrl.$setValidity('rcMailgunFinished', true);
                        ctrl.$setValidity('rcMailgunEmailValid', (data && data.is_valid));

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    };

                    var errorWrapper = function(data, status, headers, config) {

                        ctrl.$setValidity('rcMailgunInProgress', true);
                        ctrl.$setValidity('rcMailgunFinished', true);
                        ctrl.$setValidity('rcMailgunEmailValid', false);

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    };

                    var inProgressWrapper = function() {

                        // clear when checking
                        ctrl.$setValidity('rcMailgunEmailValid', true);
                        ctrl.$setValidity('rcMailgunInProgress', false);

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    };

                    var clearWhenBlankValidator = function(value) {
                        if (!value) {
                            ctrl.$setValidity('rcMailgunInProgress', true);
                            ctrl.$setValidity('rcMailgunFinished', true);
                            ctrl.$setValidity('rcMailgunEmailValid', true);
                        }

                        return value;
                    };

                    var deferredAbort;

                    var runValidator = function(value) {

                        if (!value) {
                            return;
                        }

                        if (deferredAbort) {
                            deferredAbort.resolve();
                        }

                        deferredAbort = $q.defer();

                        inProgressWrapper();

                        httpPromise = $http
                            .jsonp('https://api.mailgun.net/v2/address/validate?callback=JSON_CALLBACK', {
                                params: {
                                    address: value.toLowerCase(),
                                    api_key: options.api_key
                                },
                                timeout: deferredAbort.promise
                            })
                            .success(successWrapper)
                            .error(errorWrapper);
                    };

                    ctrl.$formatters.push(clearWhenBlankValidator);
                    ctrl.$parsers.unshift(clearWhenBlankValidator);

                    if (!scope.$eval('loggedIn')) {
                        runValidator(ctrl.$viewValue);
                    }

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {

                        if (!newValue || newValue === oldValue) {
                            return;
                        }

                        if (!scope.$eval('loggedIn')) {
                            runValidator(newValue);
                        }

                    });
                }
            };
        }]
    };

    var rcMailgunModule = angular.module('rcMailgun', []);

    if (rcMailgunProvider) {
        rcMailgunModule.provider(rcMailgunProvider);
    }
    if (rcMailgunValidDirective) {
        rcMailgunModule.directive(rcMailgunValidDirective);
    }

})();
;(function() {
    'use strict';

    angular.module('cdmp.services', [])

    .factory('_', ['$window',
        function($window) {
            return $window._;
        }
    ])

    .factory('he', ['$window',
        function($window) {
            return $window.he;
        }
    ])

    .factory('bowser', ['$window',
        function($window) {
            return $window.bowser;
        }
    ])

    .factory('moment', ['$window',
        function($window) {
            return $window.moment;
        }
    ])

    .factory('parseUri', ['$window',
        function($window) {
            return $window.parseUri;
        }
    ])

    .factory('safeApply', ['$rootScope', function($rootScope) {
        return function(fn, $scope) {
            $scope = $scope || $rootScope;
            var phase = $scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        };
    }]);

}).call(this);
;// Taken and modified from https://github.com/dwmkerr/angular-modal-service

(function() {
    'use strict';

    angular.module('cdmp.services')

    .factory('ModalService', ['$window', '$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$timeout', '$templateCache',
        function($window, $document, $compile, $controller, $http, $rootScope, $q, $timeout, $templateCache) {

            //  Get the body of the document, we'll add the modal to this.
            var body = $document.find('.injector--modal');

            if (!body.length) {
                body = $document.find('body');
            }

            function ModalService() {

                var self = this;

                //  Returns a promise which gets the template, either
                //  from the template parameter or via a request to the
                //  template url parameter.
                var getTemplate = function(template, templateUrl) {
                    var deferred = $q.defer();
                    if (template) {
                        deferred.resolve(template);
                    } else if (templateUrl) {
                        // check to see if the template has already been loaded
                        var cachedTemplate = $templateCache.get(templateUrl);
                        if (cachedTemplate !== undefined) {
                            deferred.resolve(cachedTemplate);
                        }
                        // if not, let's grab the template for the first time
                        else {
                            $http({
                                method: 'GET',
                                url: templateUrl,
                                cache: true
                            }).then(function(result) {
                                // save template into the cache and return the template
                                $templateCache.put(templateUrl, result.data);
                                deferred.resolve(result.data);
                            }, function(error) {
                                deferred.reject(error);
                            });
                        }
                    } else {
                        deferred.reject("No template or templateUrl has been specified.");
                    }
                    return deferred.promise;
                };

                self.showModal = function(options) {

                    //  Create a deferred we'll resolve when the modal is ready.
                    var deferred = $q.defer();

                    //  Validate the input parameters.
                    var controller = options.controller;
                    if (!controller) {
                        deferred.reject("No controller has been specified.");
                        return deferred.promise;
                    }

                    //  Get the actual html of the template.
                    getTemplate(options.template, options.templateUrl)
                        .then(function(template) {

                            //  Create a new scope for the modal.
                            var modalScope = options.scope || $rootScope.$new();

                            //  Create the inputs object to the controller - this will include
                            //  the scope, as well as all inputs provided.
                            //  We will also create a deferred that is resolved with a provided
                            //  close function. The controller can then call 'close(result)'.
                            //  The controller can also provide a delay for closing - this is
                            //  helpful if there are closing animations which must finish first.
                            var closeDeferred = $q.defer();
                            var inputs = {
                                $scope: modalScope,
                                close: function(result, delay) {
                                    if (delay === undefined || delay === null) {
                                        delay = 0;
                                    }
                                    $timeout(function() {
                                        closeDeferred.resolve(result);
                                    }, delay);
                                }
                            };

                            //  If we have provided any inputs, pass them to the controller.
                            if (options.inputs) {
                                for (var inputName in options.inputs) {
                                    inputs[inputName] = options.inputs[inputName];
                                }
                            }

                            //  Parse the modal HTML into a DOM element (in template form).
                            var modalElementTemplate = angular.element(template);

                            //  Compile then link the template element, building the actual element.
                            //  Set the $element on the inputs so that it can be injected if required.
                            var linkFn = $compile(modalElementTemplate);
                            var modalElement = linkFn(modalScope);
                            inputs.$element = modalElement;

                            //  Create the controller, explicitly specifying the scope to use.
                            var modalController = $controller(controller, inputs);

                            //  Finally, append the modal to the dom.
                            body.append(modalElement);

                            //  We now have a modal object.
                            var modal = {
                                controller: modalController,
                                scope: modalScope,
                                element: modalElement,
                                close: closeDeferred.promise
                            };

                            // Window resize handler
                            var resizeHandler = function() {

                                var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                                var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                                $('.modal__outer', modal.element).css({
                                    width: width,
                                    height: height
                                });

                                $('.modal__inner', modal.element).css({
                                    'max-height': height - 80
                                });

                                $('.modal').hide().show();
                            };

                            // Add event to window to resize modal
                            angular.element($window).on('resize.modal', resizeHandler);

                            $document.find('html').addClass('no-scroll');

                            modalElement.on('touchmove', function(e) {
                                e.preventDefault();
                            });

                            // Initial resize
                            resizeHandler();

                            //  When close is resolved, we'll clean up the scope and element.
                            modal.close.then(function(result) {
                                //  Clean up the scope
                                if (!options.scope) {
                                    modalScope.$destroy();
                                }

                                modalElement.off('touchmove');

                                //  Remove the element from the dom.
                                modalElement.remove();

                                angular.element($window).off('resize.modal');

                                $document.find('html').removeClass('no-scroll');

                            });

                            deferred.resolve(modal);

                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                };

            }

            return new ModalService();
        }
    ]);

}).call(this);;// Taken and modified from https://github.com/revolunet/angular-google-analytics

/**
 * Angular Google Analytics - Easy tracking for your AngularJS application
 * @version v0.0.6 - 2014-10-14
 * @link http://github.com/revolunet/angular-google-analytics
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* global angular, console */

(function() {
    'use strict';

    angular.module('cdmp.services')

    .provider('Analytics', function() {
        var created = false,
            debugScript = false,
            autoTrackRoutes = true,
            pageFieldUsesPageView = false,
            accountId,
            multipleTrackers = false,
            displayFeatures,
            trackPrefix = '',
            domainName,
            analyticsJS = false,
            pageEvent = '$routeChangeSuccess',
            cookieConfig = 'auto',
            ecommerce = false,
            enhancedLinkAttribution = false,
            removeRegExp,
            experimentId,
            ignoreFirstPageLoad = true,
            crossDomainLinker = false,
            crossLinkDomains,
            linkerConfig = {
                'allowLinker': true
            },
            useAnchor = false;

        this._logs = [];

        // config methods
        this.usePageViewForPageField = function(doIt) {
            pageFieldUsesPageView = doIt;
            return true;
        };
        this.setDebug = function(doDebug) {
            debugScript = doDebug;
            return true;
        };
        this.setAccount = function(id) {
            accountId = id;
            multipleTrackers = _.isArray(accountId);
            return true;
        };
        this.trackPagesAutomatically = function(doTrack) {
            autoTrackRoutes = doTrack;
            return true;
        };

        this.trackPrefix = function(prefix) {
            trackPrefix = prefix;
            return true;
        };

        this.setDomainName = function(domain) {
            domainName = domain;
            return true;
        };

        this.useDisplayFeatures = function(val) {
            displayFeatures = !!val;
            return true;
        };

        this.useAnalytics = function(val) {
            analyticsJS = !!val;
            return true;
        };

        this.useEnhancedLinkAttribution = function(val) {
            enhancedLinkAttribution = !!val;
            return true;
        };

        this.useCrossDomainLinker = function(val) {
            crossDomainLinker = !!val;
            return true;
        };

        this.setCrossLinkDomains = function(domains) {
            crossLinkDomains = domains;
            return true;
        };

        this.setPageEvent = function(name) {
            pageEvent = name;
            return true;
        };

        this.setCookieConfig = function(config) {
            cookieConfig = config;
            return true;
        };

        this.useECommerce = function(val) {
            ecommerce = !!val;
            return true;
        };

        this.setRemoveRegExp = function(regex) {
            if (regex instanceof RegExp) {
                removeRegExp = regex;
                return true;
            }
            return false;
        };

        this.setExperimentId = function(id) {
            experimentId = id;
            return true;
        };

        this.ignoreFirstPageLoad = function(val) {
            ignoreFirstPageLoad = !!val;
        };

        this.setUseAnchor = function(val) {
            useAnchor = !!val;
            return true;
        };

        // public service
        this.$get = ['$document', '$rootScope', '$location', '$window', '_',
            function($document, $rootScope, $location, $window, _) {

                var getUrl = function() {

                    var url = $location.path();

                    if (removeRegExp) {
                        return url.replace(removeRegExp, '');
                    }

                    return url;
                };

                var currentPage;

                // private methods
                function _createScriptTag() {

                    // inject the google analytics tag
                    if (!accountId) {
                        return;
                    }

                    $window._gaq = [];

                    if (multipleTrackers) {

                        _.forEach(accountId, function(trackerObj) {
                            $window._gaq.push([trackerObj.name + '._setAccount', trackerObj.id]);
                        });

                    } else {
                        $window._gaq.push(['_setAccount', accountId]);
                    }

                    if (domainName) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._setDomainName', domainName]);
                            });

                        } else {
                            $window._gaq.push(['_setDomainName', domainName]);
                        }

                    }

                    if (enhancedLinkAttribution) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
                            });

                        } else {
                            $window._gaq.push(['_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
                        }
                    }

                    if (!ignoreFirstPageLoad) {

                        if (removeRegExp) {

                            var url = getUrl();

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {
                                    $window._gaq.push([trackerObj.name + '._trackPageview', url]);
                                });

                            } else {
                                $window._gaq.push(['_trackPageview', url]);
                            }

                        } else {

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {
                                    $window._gaq.push([trackerObj.name + '._trackPageview']);
                                });

                            } else {
                                $window._gaq.push(['_trackPageview']);
                            }
                        }
                    }

                    var gaSrc;
                    if (displayFeatures) {
                        gaSrc = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
                    } else if (debugScript) {
                        gaSrc = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga_debug.js';
                    } else {
                        gaSrc = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

                    }
                    (function() {
                        var document = $document[0];
                        var ga = document.createElement('script');
                        ga.type = 'text/javascript';
                        ga.async = true;
                        ga.src = gaSrc;
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(ga, s);
                    })(gaSrc);

                    created = true;
                }

                function _createAnalyticsScriptTag() {

                    if (!accountId) {
                        return;
                    }

                    var gaSrc;
                    if (debugScript) {
                        gaSrc = '//www.google-analytics.com/analytics_debug.js';
                    } else {
                        gaSrc = '//www.google-analytics.com/analytics.js';
                    }

                    /*jshint -W030:true */
                    (function(i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function() {
                            (i[r].q = i[r].q || []).push(arguments);
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m);
                    })(window, document, 'script', gaSrc, 'ga');

                    if (crossDomainLinker) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {

                                $window.ga('create', trackerObj.id, cookieConfig, _.extend({
                                    name: trackerObj.name
                                }, linkerConfig));

                                $window.ga(trackerObj.name + '.require', 'linker');

                                if (crossLinkDomains) {
                                    $window.ga(trackerObj.name + '.linker:autoLink', crossLinkDomains);
                                }

                            });

                        } else {

                            $window.ga('create', accountId, cookieConfig, linkerConfig);

                            $window.ga('require', 'linker');

                            if (crossLinkDomains) {
                                $window.ga('linker:autoLink', crossLinkDomains);
                            }

                        }

                    } else {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {

                                $window.ga('create', trackerObj.id, cookieConfig, {
                                    name: trackerObj.name
                                });

                            });

                        } else {
                            $window.ga('create', accountId, cookieConfig);
                        }
                    }

                    if (displayFeatures) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.require', 'displayfeatures');
                            });

                        } else {
                            $window.ga('require', 'displayfeatures');
                        }
                    }

                    if (!ignoreFirstPageLoad) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.send', 'pageview');
                            });

                        } else {
                            $window.ga('send', 'pageview');
                        }
                    }

                    if ($window.ga) {

                        if (ecommerce) {

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {
                                    $window.ga(trackerObj.name + '.require', 'ecommerce', 'ecommerce.js');
                                });

                            } else {
                                $window.ga('require', 'ecommerce', 'ecommerce.js');
                            }
                        }

                        if (enhancedLinkAttribution) {
                            $window.ga('require', 'linkid', 'linkid.js');
                        }

                        if (experimentId) {
                            var expScript = document.createElement('script'),
                                s = document.getElementsByTagName('script')[0];
                            expScript.src = "//www.google-analytics.com/cx/api.js?experiment=" + experimentId;
                            s.parentNode.insertBefore(expScript, s);
                        }
                    }

                }

                this._log = function() {
                    // for testing
                    //console.info('analytics log:', arguments);
                    this._logs.push(arguments);
                };

                this._trackPage = function(url, title) {

                    title = title ? title : $document[0].title;

                    if (!analyticsJS && $window._gaq) {

                        // http://stackoverflow.com/questions/7322288/how-can-i-set-a-page-title-with-google-analytics

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._set', 'title', title]);
                                $window._gaq.push([trackerObj.name + '._trackPageview', trackPrefix + url]);
                            });

                        } else {

                            $window._gaq.push(['_set', 'title', title]);
                            $window._gaq.push(['_trackPageview', trackPrefix + url]);
                        }

                        this._log('_trackPageview', arguments);

                    } else if (analyticsJS && $window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {

                                $window.ga(trackerObj.name + '.send', 'pageview', {
                                    'page': trackPrefix + url,
                                    'title': title
                                });

                            });

                        } else {

                            $window.ga('send', 'pageview', {
                                'page': trackPrefix + url,
                                'title': title
                            });

                        }

                        this._log('pageview', arguments);

                    }

                    currentPage = {
                        "page": url,
                        "title": title
                    };
                };

                this._trackEvent = function(category, action, label, value) {

                    if (!analyticsJS && $window._gaq) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._trackEvent', category, action, label, value]);
                            });

                        } else {
                            $window._gaq.push(['_trackEvent', category, action, label, value]);
                        }

                        this._log('trackEvent', arguments);

                    } else if ($window.ga) {

                        if (pageFieldUsesPageView) {

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {

                                    $window.ga(trackerObj.name + '.send', {
                                        'hitType': 'event',
                                        'eventCategory': category,
                                        'eventAction': action,
                                        'eventLabel': label,
                                        'eventValue': value,
                                        'page': currentPage.page,
                                        'title': currentPage.title
                                    });

                                });

                            } else {

                                $window.ga('send', {
                                    'hitType': 'event',
                                    'eventCategory': category,
                                    'eventAction': action,
                                    'eventLabel': label,
                                    'eventValue': value,
                                    'page': currentPage.page,
                                    'title': currentPage.title
                                });

                            }

                        } else {

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {
                                    $window.ga(trackerObj.name + '.send', 'event', category, action, label, value);
                                });

                            } else {
                                $window.ga('send', 'event', category, action, label, value);
                            }
                        }

                        this._log('event', arguments);
                    }

                };

                /**
                 * Add transaction
                 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._addTrans
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addTrans
                 * @param transactionId
                 * @param affiliation
                 * @param total
                 * @param tax
                 * @param shipping
                 * @param city
                 * @param state
                 * @param country
                 * @private
                 */
                this._addTrans = function(transactionId, affiliation, total, tax, shipping, city, state, country, currency) {

                    if (!analyticsJS && $window._gaq) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._addTrans', transactionId, affiliation, total, tax, shipping, city, state, country]);
                            });

                        } else {
                            $window._gaq.push(['_addTrans', transactionId, affiliation, total, tax, shipping, city, state, country]);
                        }

                        this._log('_addTrans', arguments);

                    } else if ($window.ga) {

                        if (!ecommerce) {

                            console.warn('ecommerce no set. Use AnalyticsProvider.setECommerce(true);');

                        } else {

                            if (multipleTrackers) {

                                _.forEach(accountId, function(trackerObj) {

                                    $window.ga(trackerObj.name + '.ecommerce:addTransaction', {
                                        id: transactionId,
                                        affiliation: affiliation,
                                        revenue: total,
                                        tax: tax,
                                        shipping: shipping,
                                        currency: currency || 'USD'
                                    });

                                });

                            } else {

                                $window.ga('ecommerce:addTransaction', {
                                    id: transactionId,
                                    affiliation: affiliation,
                                    revenue: total,
                                    tax: tax,
                                    shipping: shipping,
                                    currency: currency || 'USD'
                                });

                            }

                            this._log('ecommerce:addTransaction', arguments);

                        }

                    }
                };

                /**
                 * Add item to transaction
                 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._addItem
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addItem
                 * @param transactionId
                 * @param sku
                 * @param name
                 * @param category
                 * @param price
                 * @param quantity
                 * @private
                 */
                this._addItem = function(transactionId, sku, name, category, price, quantity) {

                    if (!analyticsJS && $window._gaq) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._addItem', transactionId, sku, name, category, price, quantity]);
                            });

                        } else {
                            $window._gaq.push(['_addItem', transactionId, sku, name, category, price, quantity]);
                        }


                        this._log('_addItem', arguments);

                    } else if ($window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {

                                $window.ga(trackerObj.name + '.ecommerce:addItem', {
                                    id: transactionId,
                                    name: name,
                                    sku: sku,
                                    category: category,
                                    price: price,
                                    quantity: quantity
                                });

                            });

                        } else {

                            $window.ga('ecommerce:addItem', {
                                id: transactionId,
                                name: name,
                                sku: sku,
                                category: category,
                                price: price,
                                quantity: quantity
                            });

                        }

                        this._log('ecommerce:addItem', arguments);

                    }
                };

                /**
                 * Track transaction
                 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEcommerce#_gat.GA_Tracker_._trackTrans
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#sendingData
                 * @private
                 */
                this._trackTrans = function() {

                    if (!analyticsJS && $window._gaq) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window._gaq.push([trackerObj.name + '._trackTrans']);
                            });

                        } else {
                            $window._gaq.push(['_trackTrans']);
                        }

                        this._log('_trackTrans', arguments);

                    } else if ($window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.ecommerce:send');
                            });

                        } else {
                            $window.ga('ecommerce:send');
                        }

                        this._log('ecommerce:send', arguments);

                    }

                };

                /**
                 * Clear transaction
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#clearingData
                 *
                 * @private
                 */
                this._clearTrans = function() {

                    if ($window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.ecommerce:clear');
                            });

                        } else {
                            $window.ga('ecommerce:clear');
                        }


                        this._log('ecommerce:clear', arguments);

                    }
                };

                /**
                 * Send custom events
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#implementation
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions#implementation
                 *
                 * @param obj
                 * @private
                 */
                this._send = function(obj) {

                    if ($window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.send', obj);
                            });

                        } else {
                            $window.ga('send', obj);
                        }

                        this._log('send', obj);

                    }

                };

                /**
                 * Set custom dimensions, metrics or experiment
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
                 * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#customs
                 *
                 * @param name
                 * @param value
                 * @private
                 */
                this._set = function(name, value) {

                    if ($window.ga) {

                        if (multipleTrackers) {

                            _.forEach(accountId, function(trackerObj) {
                                $window.ga(trackerObj.name + '.set', name, value);
                            });

                        } else {
                            $window.ga('set', name, value);
                        }


                        this._log('set', name, value);

                    }

                };

                // creates the ganalytics tracker
                if (analyticsJS) {
                    _createAnalyticsScriptTag();
                } else {
                    _createScriptTag();
                }


                var me = this;

                // activates page tracking
                if (autoTrackRoutes) {
                    $rootScope.$on(pageEvent, function() {
                        me._trackPage(getUrl());
                    });
                }

                return {
                    _logs: me._logs,
                    cookieConfig: cookieConfig,
                    displayFeatures: displayFeatures,
                    ecommerce: ecommerce,
                    enhancedLinkAttribution: enhancedLinkAttribution,
                    getUrl: getUrl,
                    experimentId: experimentId,
                    ignoreFirstPageLoad: ignoreFirstPageLoad,
                    trackPage: function(url, title) {
                        // add a page event
                        me._trackPage(url, title);
                    },
                    trackEvent: function(category, action, label, value) {
                        // add an action event
                        me._trackEvent(category, action, label, value);
                    },
                    addTrans: function(transactionId, affiliation, total, tax, shipping, city, state, country, currency) {
                        me._addTrans(transactionId, affiliation, total, tax, shipping, city, state, country, currency);
                    },
                    addItem: function(transactionId, sku, name, category, price, quantity) {
                        me._addItem(transactionId, sku, name, category, price, quantity);
                    },
                    trackTrans: function() {
                        me._trackTrans();
                    },
                    clearTrans: function() {
                        me._clearTrans();
                    },
                    send: function(obj) {
                        me._send(obj);
                    },
                    set: function(name, value) {
                        me._set(name, value);
                    }
                };
            }
        ];

    });

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers', ['cdmp.services']);

}).call(this);;(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('MainController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '$http', 'matchmedia', 'ModalService', 'Analytics', '_', 'he', 'parseUri', 'showErrorsConfig',
        function($scope, $rootScope, $window, $document, $timeout, $http, matchmedia, ModalService, Analytics, _, he, parseUri, showErrorsConfig) {


            $rootScope.emailPattern = /^.+@[^\.].*\.[a-zA-Z]{2,}$/;
            $rootScope.passwordPattern = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?=.*[a-zA-Z]).*$/;
            $rootScope.datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

            // Media Queries and Watchers Logic

            var mediaQueries = {
                // p: '(orientation: portrait)',
                // l: '(orientation: landscape)',
                sm: 'only screen and (max-width: 640px)',
                md: 'only screen and (min-width: 641px) and (max-width: 1024px)',
                lg: 'only screen and (min-width: 1025px)'
            };
            
            // Changed to put it on the rootScope so services can access it too.
            $rootScope.mq = {};
            
            _.each(mediaQueries, function(value, key) {
            
                $rootScope.mq[key] = matchmedia.is(value);
            
                matchmedia.on(value, function(mediaQueryList) {
                    $rootScope.mq[key] = mediaQueryList.matches;
                });
            
            });

            $scope.scrollTo = function(sel, dur) {

                // Get the element
                var el = angular.element(sel);

                // Check if the element exists
                if (el.length > 0) {

                    // If it exists, scroll there!
                    $document.scrollToElement(el, $scope.offsetTop, dur || 0);
                }

            };

            // Modal stuff
            $scope.showModal = function(name, controller, scope) {
            
                $rootScope.$emit('close:modal');
            
                ModalService
                    .showModal({
                        // scope: scope || $scope,
                        templateUrl: 'views/modal/' + name + '.html',
                        controller: controller || 'ModalController'
                    })
                    .then(function(modal) {
                        // modal.element.show();
                    });
            };


            // Fix for scrolling to an anchor
            $timeout(function() {

                // .slice(1) removes the slash that angular adds
                $scope.scrollTo('#' + parseUri($window.location.href).anchor.slice(1));

            }, 150);

        }
    ]);

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ModalController', ['$scope', '$rootScope', '$window', '$document', '$timeout', 'close', '_',
        function($scope, $rootScope, $window, $document, $timeout, close, _) {

            $scope.isModal = true;

            var closeEnabled = true;

            $scope.close = function() {
                if (closeEnabled) {
                    close();
                }
            };

            $scope.repaint = function($event) {
            
                if ($(document.activeElement).is('input')) {
                    return;
                }
            
                var div = $event.currentTarget;
                div.style.display = 'none';
                var tmp = div.offsetHeight;
                div.style.display = 'block';
            };

            $($document).on('keydown.modal', function(e) {
                if (e.keyCode === 27) {
                    $scope.close();
                }
            });

            $scope.$on('close:disable', function(event, data) {
                closeEnabled = false;
            });
            $scope.$on('close:enable', function(event, data) {
                closeEnabled = true;
            });

            var closeListener = $rootScope.$on('close:modal', function(event, data) {
                close();
            });

            // Close if we hit the mobile breakpoint
            var queryListener = $rootScope.$watch('mq.sm', function(newValue, oldValue) {
                if (newValue === true) {
                    close();
                }
            });

            $scope.$on('$destroy', function(e) {
                closeListener();
                queryListener();
                $($document).off('.modal');
            });
        }
    ]);

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', '$http',function($scope,$http) {

            console.log("in controller");
            
            $scope.submitted = false;
            $scope.notMatch = false;
            
            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
            
                if (!$scope.optInForm.$invalid) {
                    if($scope.optInForm.Email == $scope.optInForm.ConfirmEmail){
                        $scope.notMatch = false;
                        if($scope.checkBox==true){
                            
                            
                            console.log("validation is right");
                            
                            $scope.optForm = function() {
                                
                                console.log("in ajax");
                                console.log($scope.optInForm.FName);
                                
                                
                                var optInfor = {
                                    optInForm: {
                                        CommunicationsOptIn: true,
                                        Name: {
                                            FName: $scope.optInForm.FName,
                                            LName: $scope.optInForm.LName
                                            },
                                        Email: {
                                            Email:$scope.optInForm.Email,
                                            ConfirmEmail:$scope.optInForm.ConfirmEmail
                                        }
                                    },
                                    sourceCode: "0"
                                };
                                
                                
                                console.log(JSON.stringify(optInfor));
                        
                        
                                var URL = BEDSVC + "/SetOptInData";
                                
                                console.log(URL);
                                
                                $http({
                                    method: "POST",
                                    crossDomain: true,
                                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                                    url: URL,
                                    cache: false,
                                    data: JSON.stringify(optInfor),
                                    contentType: "application/json; charset=utf8",
                                    dataType: "json"
                                })
                                    
                                    .success(function (data, status, headers, config) {
                                        console.log("get data" + data);
                                        
                                        if (data.SvcStatus == true) {

                                            window.location.href="thank-you.aspx";
                                            
                                        } else {
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log("Error Ajax\n" + JSON.stringify(data) );
                                        console.log(JSON.stringify(status) );
                                        console.log(JSON.stringify(headers) );
                                    })
                            }
                        }
                        }else{
                            $scope.notMatch = true;
                            console.log("not match");
                        }
                    }
                    else{
                        console.log("Error!");
                        //alert("Please address the errors above!")
                    }
                    
                };

        }])



    

        //.directive('showErrors', function (showErrorsConfig) {
        //    var getShowSuccess;
        //    getShowSuccess = function (options) {
        //        var showSuccess;
        //        showSuccess = showErrorsConfig.showSuccess;
        //        if (options && options.showSuccess != null) {
        //            showSuccess = options.showSuccess;
        //        }
        //        return showSuccess;
        //    };
        //})

        .provider('showErrorsConfig', function () {
            var _showSuccess;
            _showSuccess = false;
            this.showSuccess = function (showSuccess) {
                return _showSuccess = showSuccess;
            };
            this.$get = function () {
                return { showSuccess: _showSuccess };
            };
        });

    
    
        var BEDSVC = "service/BEDService.svc"
    

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ProfilesController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri', '$anchorScroll',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri,$anchorScroll){

            $scope.slides = ["kimberly","nikki","julie","diego"];

            var currentSlide = parseUri($window.location.href).anchor, slides = $scope.slides;

            $anchorScroll();
            

            // console.log("is \t" + currentSlide + " in slides?\t" + (_.indexOf(slides, currentSlide) >= 0) );

            if(currentSlide.length === 0 || _.indexOf(slides, currentSlide) === -1  ){
                currentSlide = "kimberly";
                $scope.currentSlide = "kimberly";
            }else{
                $scope.currentSlide = currentSlide;
            }


            $scope.updateGradient = function(scope){
                var elem = angular.element('#gradient-transition-bottom');

                elem.removeClass();

                elem.addClass($scope.currentSlide);

                // console.log("updating the gradient!");

            };


            //show the currently chosen hero
            $scope.changeHero = function(chosen){

                //don't change if you're switching to the active one
                if(chosen === $scope.currentSlide){
                    return;
                }

                //TODO: Add slide animation!!!

                //change the active hero
                if(_.indexOf(slides, chosen) !== -1){
                    $scope.currentSlide = chosen;
                }


                //change the gradient
                $scope.updateGradient($scope);

                //update the pagination
                $scope.updatePagination($scope);

                // console.log("current slide is\t" + $scope.currentSlide);
                window.location.hash = chosen;

            };

            $scope.swipeControls = function(direction) {

                // this is so swipes only happen on tablet/mobile
                if ($(window).width() < 1024) {
                    $scope.clickControls(direction);
                }
            }

            $scope.clickControls = function(direction){

                //i = the current array index
                var i = _.indexOf(slides,$scope.currentSlide), targetI;

                // console.log("received a click!!! we have " + slides.length + " slides and are currently on # " + i);

                if(i === 0 && direction === 'L'){
                    targetI = slides.length-1;
                }else{

                    if(i === slides.length-1 && direction === 'R'){
                        targetI = 0;
                    }else{
                        if(direction === 'L'){
                            targetI = (i-1);
                        }else{
                            targetI = (i+1);
                        }
                    }

                }

                $scope.changeHero(slides[targetI]);

            };

            $scope.updatePagination = function(scope){

                //clear the old ones first
                var rm = angular.element('ul.pagination li, ul.mobile-pagination li').removeClass('active');

                //update with current slide
                var elem = angular.element('ul.pagination li.' + scope.currentSlide + ', ul.mobile-pagination li.' + scope.currentSlide).addClass('active');

            };


            $scope.updateGradient($scope);
            $scope.updatePagination($scope);

        }
    ]);

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ResourcesController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            //local variables & functions!
            var activehost = "localhost:3000";

            $scope.tabbedVideos = [{
                tabclass : "what-is-bed",
                tabtitle: "What Is B.E.D.?",
                disclaimer: "Drs Bulik and Wilfley are paid consultants for Shire.",
                videos : [
                    {
                        id: "essential-features-diag",
                        title: "What are the essential features for a diagnosis of B.E.D.?",
                        length: "1:25",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "bed-diff-bulimia",
                        title: "How is B.E.D. distinct from bulimia nervosa?",
                        length: "2:23",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03014.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "bed-diff-overeating",
                        title: "How is B.E.D. distinct from overeating and obesity?",
                        length: "2:31",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03013.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "functional-conseqs",
                        title: "What are the functional consequences of B.E.D. in adults?",
                        length: "2:00",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03322.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "clinical-course",
                        title: "What is the clinical course of B.E.D.?",
                        length: "0:31",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            },{
                tabclass: "in-adults",
                tabtitle: "B.E.D. in Adults",
                disclaimer: "Drs Grilo, Kornstein, and Wilfley are paid consultants for Shire.",
                videos: [
                    {
                        id: "prevalence-comparison",
                        title: "How does the prevalence of B.E.D. compare to that of other eating disorders in adults?",
                        length: "0:42",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "rel-obesity-bed",
                        title: "What is the relationship between obesity and B.E.D. in adults?",
                        length: "0:55",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03017.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "psych-conditions-assoc",
                        title: "What psychiatric conditions are commonly associated with B.E.D.?",
                        length: "1:10",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "thought-to-cause",
                        title: "What is thought to cause B.E.D.?",
                        length: "0:53",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "prevalence-comparison-ethnic",
                        title: "How does the prevalence of B.E.D. compare among races/ethnicities in adults?",
                        length: "0:52",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "occur-in-both",
                        title: "Does B.E.D. occur in both women and men?",
                        length: "0:34",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "begin-effective-convo",
                        title: "How can clinicians begin an effective conversation with their adult patients about B.E.D.?",
                        length: "0:51",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            }, {
                tabclass: "experts",
                tabtitle: "Experts Panel Discussion",
                videos: [
                    {
                        id: "living-with-bed",
                        title: "Living with B.E.D.",
                        length: "1:25",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02868.mp4",
                        host: activehost,
                        newFrom: null,//Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "diag-criteria",
                        title: "Diagnostic criteria for B.E.D.",
                        length: "5:56",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03499.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "possible-causes-of-bed",
                        title: "Possible causes of B.E.D.",
                        length: "5:37",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03500.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "recog-adult-patients",
                        title: "Recognizing adult patients with B.E.D.",
                        length: "6:21",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03501.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "functional-conseqs2",
                        title: "Functional consequences of B.E.D. ",
                        length: "2:24",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03502.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "diag-bed-in-adult-patients",
                        title: "Diagnosing B.E.D. in adult patients",
                        length: "4:06",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03503.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    }
                ]
            }];

            //defaults on page load
            $scope.currentTab = "what-is-bed";
            $scope.currentVideo = "essential-features-diag";
            $scope.defaultVideoPath = '//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4'; // default video - never changes

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // MEDIA ELEMENTS INTERNAL STUFFS: 

            // flags for video completion percentages:
            var p0      = false;
            var p25     = false;
            var p50     = false;
            var p75     = false;
            var p90     = false;
            var p100    = false;

            // this is the variable that will hold the mejs object
            var instance = null;

            // MediaElementJS success handler
            var onSuccess = function(me, domObject) {

                me.pause();
                instance = me;

                $(instance).on('loadeddata', onLoadedData).on('timeupdate', onTimeUpdate).on('ended', onEnded);     // Setup player listeners

                $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

                instance.setSrc(document.location.protocol + $scope.defaultVideoPath);
                instance.load();
            };

            var onError = function() { console.log('ERROR: mejs failed to load'); };

            // MediaElementJS loadeddata handler
            var onLoadedData = function(e) {

                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };

            // MediaElementJS timeupdate handler

            // i've copied all the code from bed 2.0 for analytics. 
            // we'll need to copy over some more functions (i think) to actually enable the functionality when the time comes
            var onTimeUpdate = function(e) {

                // Calculate current percentage viewed
                var currentPercentage = (instance.currentTime / instance.duration) * 100;

                if (currentPercentage === 0) {
                    return; // hits 0 percentage after video ended
                }

                if (currentPercentage >= 0 && !p0) {
                    // Check if more than 0% viewed and if not previously fired

                    p0 = true;
                    // BED.Analytics.videoOnPlay(currentVideoTitle);   // fire 'Video Play'

                } else if (currentPercentage >= 25 && !p25) {
                    // Check if more than 25% viewed and if not previously fired

                    p25 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 25); // fire 'Video Milestone' @ 25%

                } else if (currentPercentage >= 50 && !p50) {
                    // Check if more than 50% viewed and if not previously fired

                    p50 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

                } else if (currentPercentage >= 75 && !p75) {
                    // Check if more than 75% viewed and if not previously fired

                    p75 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

                } else if (currentPercentage >= 90 && !p90) {
                    // Check if more than 90% viewed and if not previously fired

                    p90 = true;
                    // BED.Analytics.videoOnComplete(currentVideoTitle);

                } else if (currentPercentage >= 99 && !p100) {
                    // Check if more than 100% viewed and if not previously fired

                    p100 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 100);
                }
            };

            // MediaElementJS ended handler
            var onEnded = function(e) {
                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };


            $(document).ready(function(){ 
                //for some odd loading ordering reason, this was throwing a 'nodeName' undefined TypeError, JM
                // Create MEJS object for the video player element 😻

                $('#videoPlayer').mediaelementplayer({
                    pauseOtherPlayers: false,           // allow multiple videos
                    iPadUseNativeControls: true,        // force iPad's native controls
                    iPhoneUseNativeControls: true,      // force iPhone's native controls
                    AndroidUseNativeControls: true,     // force Android's native controls
                    success: onSuccess,
                    error: onError,
                    // defaultVideoWidth: 960,
                    // defaultVideoHeight: 540,
                    // pluginWidth: "100%",
                    // pluginHeight: "100%",
                    enableAutosize: true
                });

                // firefox needed a source!
                $("#videoPlayer source").prop('src',document.location.protocol + $scope.defaultVideoPath);

                if(bowser.gecko){
                    var foo = $("section.section--video-player .wrap--content");
                    var w = foo.width();
                    foo.css('height', (540/960)*w + "px" );

                    //i hate doing this... and blame MediaElementJS for all wrongdoing
                    $(window).resize(function(elem){
                        var w = foo.width();
                        foo.css('height', (540/960)*w + "px" );
                        // if(w >= 1024){
                        //     foo.css('height', (540/960)*w + "px" );
                        // }else if(w < 1024 && w > 640){
                        //     foo.css('height', (377/768)*w + "px" );
                        // }else if(w < 640){
                        //     foo.css('height', (158/320)*w + "px" );
                        // }
                    });
                }

                if(bowser.webkit){
                    var foo = $(".mejs-container,.mejs-overlay-play");
                    var w = foo.width();
                    foo.css('height', (540/960)*w + "px" );

                    $(window).resize(function(elem){
                        var w = foo.width();
                        foo.css('height', (540/960)*w + "px" );
                        // if(w >= 1024){
                        //     foo.css('height', (540/960)*w + "px" );
                        // }else if(w < 1024 && w > 640){
                        //     foo.css('height', (377/768)*w + "px" );
                        // }else if(w < 640){
                        //     foo.css('height', (158/320)*w + "px" );
                        // }
                    });
                }

                // IE needed a source!
                if(bowser.msie){
                    var foo = $("section.section--video-player .wrap--content");
                    var w = foo.width();
                    foo.css('height', (540/960)*w + "px" );

                    //i hate doing this... and blame MediaElementJS for all wrongdoing
                    $(window).resize(function(elem){
                        var w = foo.width();
                        foo.css('height', (540/960)*w + "px" );
                        // if(w >= 1024){
                        //     foo.css('height', (540/960)*w + "px" );
                        // }else if(w < 1024 && w > 640){
                        //     foo.css('height', (377/768)*w + "px" );
                        // }else if(w < 640){
                        //     foo.css('height', (158/320)*w + "px" );
                        // }
                    });
                }
            });
            
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



            // returns the video file path based on the id string
            $scope.getVideoPath = function(id) {
                
                for (var i = 0; i < $scope.tabbedVideos.length; i++) {              // iterate through the json objects in array which represent each tab of videos

                    if ($scope.tabbedVideos[i].tabclass === $scope.currentTab) {    // when correct tab is found

                        $scope.currentTabVideos = $scope.tabbedVideos[i].videos;    // save the tab's list of videos

                        for (var j = 0; j < $scope.currentTabVideos.length; j++) {  // iterate through that list of videos

                            if ($scope.currentTabVideos[j]['id'] === id) {          // get filepath from that list

                                return $scope.currentTabVideos[j].filepath;   
                            }
                        }
                    }
                }

                return $scope.defaultVideoPath; // if nothing is found by this point set to default  (╯°□°）╯︵ ┻━┻
            };

            // called from ng-clicks to change video being played
            $scope.updateVideo = function(vid){

                instance.pause();

                $scope.currentVideo = vid;

                var filePath = $scope.getVideoPath(vid);   // get video url

                instance.setSrc(document.location.protocol + filePath); // set mejs to that url
                instance.play();
            };

            $scope.changeTab = function(tabIndex){

                //find out the class of the tab the user selected, using index-1 (1: 0, 2:1, 3:2)
                    var i = tabIndex - 1;
                    
                //bad input, brah
                    if(typeof i === undefined || i < 0 || i > 3){
                        return;
                    }

                //add the active class to the tab on the page to toggle display of the videos in the tab
                    // var tab = angular.element(".tab." + $scope.tabbedVideos[i].tabclass);
                    //is this redundant bc idk about AngularJS?

                //update the scope vars
                    $scope.currentTab = $scope.tabbedVideos[i].tabclass;

                //any other DOM updates that need to be reflected on the page


            };

            $scope.mdOpen = false;

            $scope.toggleMobileDropdown = function() {
                $scope.mdOpen = !$scope.mdOpen;
            };

            $scope.changeTabMobile = function(tabIndex, event) {

                if ($scope.mdOpen) {
                    event.stopPropagation();

                    $scope.changeTab(tabIndex);

                    $scope.mdOpen = false;
                }
            };

            // $scope.updateVideo("video_id");
        }
    ]);

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.controllers')


        .controller('emailController', ['$scope', '$http', function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity'); // uses the provider service

                if (!$scope.optOutEmail.$invalid) {
                    console.log("user submit");

                    $scope.optOutEmailForm = function() {

                        console.log("in ajax");

                        var optOutInfor = {
                              email: {
                                Email:$scope.optOutEmail.Email,
                                ConfirmEmail:$scope.optOutEmail.Email
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optOutInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataEmail";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optOutInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

                                } else {
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("Error Ajax\n" + JSON.stringify(data) );
                                console.log(JSON.stringify(status) );
                                console.log(JSON.stringify(headers) );
                            })
                    }

                }
            };

            $scope.syncFields = function(e){
                //the original
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
            };

        }])
        
        .controller('directmailController', ['$scope',"$http", function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optoutdirectmail.$invalid) {
                    console.log("user submit");

                    $scope.optoutdirectmailForm = function() {

                        console.log("in ajax");

                        var optDirectInfor = {
                            email: {
                                Email:$scope.optoutdirectmail.Email,
                                ConfirmEmail:$scope.optoutdirectmail.Email
                            },
                            address:{
                                FName:$scope.optoutdirectmail.FName,
                                MName:"",
                                LName:$scope.optoutdirectmail.LName,
                                Address1:$scope.optoutdirectmail.Address1,
                                Address2:$scope.optoutdirectmail.Address2,
                                City:$scope.optoutdirectmail.City,
                                State:$scope.optoutdirectmail.State,
                                Zip:$scope.optoutdirectmail.Zip
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optDirectInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataAddress";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optDirectInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

                                } else {
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("Error Ajax\n" + JSON.stringify(data) );
                                console.log(JSON.stringify(status) );
                                console.log(JSON.stringify(headers) );
                            })
                    }
                    
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };

            
            $scope.syncFields = function(e){
                //it pains me to copypasta this... JM
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
            };

        }])


        .controller('allmailController', ['$scope','$http', function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optinall.$invalid) {
                    console.log("user submit");

                    $scope.optinallForm = function() {

                        console.log("in ajax");

                        var optAllInfor = {
                            email: {
                                Email:$scope.optinall.Email,
                                ConfirmEmail:$scope.optinall.Email
                            },
                            address:{
                                FName:$scope.optinall.FName,
                                MName:"",
                                LName:$scope.optinall.LName,
                                Address1:$scope.optinall.Address1,
                                Address2:$scope.optinall.Address2,
                                City:$scope.optinall.City,
                                State:$scope.optinall.State,
                                Zip:$scope.optinall.Zip
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optAllInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataBoth";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optAllInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

                                } else {
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("Error Ajax\n" + JSON.stringify(data) );
                                console.log(JSON.stringify(status) );
                                console.log(JSON.stringify(headers) );
                            })
                    }
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };


            $scope.syncFields = function(e){
                //it pains me to copypasta this... JM
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
            };

        }])

    //.controller('clickController', ['$scope', function($scope){
    //    $scope.clickToTY = function(){
    //        window.location.href="thank-you-request.aspx";
    //    }
    //}])


    var BEDSVC = "service/BEDUnsubscribe.svc"
    

}).call(this);


;(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('AudioController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            $scope.defaultPath = "foo.mp3"; // CHANGE ME

            // this is the variable that will hold the mejs object
            var instance = null;

            // MEDIA ELEMENTS INTERNAL STUFFS: 

            // flags for video completion percentages:
            var p0      = false;
            var p25     = false;
            var p50     = false;
            var p75     = false;
            var p90     = false;
            var p100    = false;

            // MediaElementJS success handler
            var onSuccess = function(me, domObject) {

                me.pause();
                instance = me;

                $(instance).on('loadeddata', onLoadedData).on('timeupdate', onTimeUpdate).on('ended', onEnded);     // Setup player listeners

                $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

                // instance.setSrc(document.location.protocol + $scope.defaultVideoPath);
                // instance.load();
            };

            var onError = function() { console.log('ERROR: mejs failed to load'); };

            // MediaElementJS loadeddata handler
            var onLoadedData = function(e) {

                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };

            // MediaElementJS timeupdate handler

            // i've copied all the code from bed 2.0 for analytics. 
            // we'll need to copy over some more functions (i think) to actually enable the functionality when the time comes
            var onTimeUpdate = function(e) {

                // Calculate current percentage viewed
                var currentPercentage = (instance.currentTime / instance.duration) * 100;

                if (currentPercentage === 0) {
                    return; // hits 0 percentage after video ended
                }

                if (currentPercentage >= 0 && !p0) {
                    // Check if more than 0% viewed and if not previously fired

                    p0 = true;
                    // BED.Analytics.videoOnPlay(currentVideoTitle);   // fire 'Video Play'

                } else if (currentPercentage >= 25 && !p25) {
                    // Check if more than 25% viewed and if not previously fired

                    p25 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 25); // fire 'Video Milestone' @ 25%

                } else if (currentPercentage >= 50 && !p50) {
                    // Check if more than 50% viewed and if not previously fired

                    p50 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

                } else if (currentPercentage >= 75 && !p75) {
                    // Check if more than 75% viewed and if not previously fired

                    p75 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

                } else if (currentPercentage >= 90 && !p90) {
                    // Check if more than 90% viewed and if not previously fired

                    p90 = true;
                    // BED.Analytics.videoOnComplete(currentVideoTitle);

                } else if (currentPercentage >= 99 && !p100) {
                    // Check if more than 100% viewed and if not previously fired

                    p100 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 100);
                }
            };

            // MediaElementJS ended handler
            var onEnded = function(e) {
                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };


            // Create MEJS object for the video player element 😻
            $('.audio-player').mediaelementplayer({
                pauseOtherPlayers: true,           // allow multiple videos
                iPadUseNativeControls: false,        // force iPad's native controls
                iPhoneUseNativeControls: false,      // force iPhone's native controls
                AndroidUseNativeControls: true,     // force Android's native controls
                success: onSuccess,
                error: onError
            });

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



            // // returns the video file path based on the id string
            // $scope.getPath = function(id) {
                
            //     $scope.

            //     return $scope.defaultPath; // if nothing is found by this point set to default  (╯°□°）╯︵ ┻━┻
            // };

            // called from ng-clicks to change video being played
            $scope.updateVideo = function(e){

                instance.pause();

                var filePath = e.currentTarget.attribute.src;

                instance.setSrc(document.location.protocol + filePath); // set mejs to that url
                instance.play();
            };

        }
    ]);
}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.directives', [])

    .directive('heroPlayer', ['store',

        function(store) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var people = [{
                        'klass': 'kimberly',
                        'url': '//d2ly9zedmmzqz4.cloudfront.net/BED-S04644-1.mp4',
                        'vzaarUrl' : '//view.vzaar.com/4952792/video'
                    }, {
                        'klass': 'nikki',
                        'url': '//d2ly9zedmmzqz4.cloudfront.net/BED-S04644-2.mp4',
                        'vzaarUrl' : '//view.vzaar.com/4952793/video'
                    }, {
                        'klass': 'julie',
                        'url': '//d2ly9zedmmzqz4.cloudfront.net/BED-S04644-3.mp4',
                        'vzaarUrl' : '//view.vzaar.com/4952794/video'
                    }, {
                        'klass': 'diego',
                        'url': '//d2ly9zedmmzqz4.cloudfront.net/BED-S04644-4.mp4',
                        'vzaarUrl' : '//view.vzaar.com/4952795/video'
                    }];

                    var heroIndex = store.get('heroIndex') || 0;

                    // Setup
                    element.addClass(people[heroIndex].klass);

                    if( angular.element(window).width() > 1024 ){
                    // Add video functionality

                        //Get element's child with class "video" as MediaElement (ME)
                        var videoElem = angular.element("#videoPlayer"),
                            player;

                        //init the ME
                        videoElem.mediaelementplayer({
                            enablePluginDebug: false,
                            pauseOtherPlayers: false, // allow multiple videos
                            startVolume: 0, // there is no audio
                            features: [],
                            autoRewind: false,
                            videoWidth: 1400,
                            videoHeight: 787,
                            success: function(mediaElement, node, playr) {

                                //Set up events. 
                                //If a user presses Spacebar or Escape we just pause the video fade it out
                                var events = ['pause','ended'];

                                for(var i=0;i<events.length;i++){
                                    mediaElement.addEventListener(events[i], function(e){
                                        
                                        element.find(".copy").fadeIn(250, function(){
                                            var callouts = element.find(".callouts");

                                            callouts.fadeIn({ queue: false, duration: 300});
                                            callouts.animate({ top: "377px" }, 'slow', 'swing', function(){
                                                videoElem.fadeOut(500, function(){
                                                    var vid = element.find(".video");
                                                    vid.hide();
                                                    // vid.css("zIndex", 0);
                                                });
                                            });    

                                        });

                                    });
                                }

                                player = mediaElement;

                                // Load video
                                mediaElement.setSrc(people[heroIndex].vzaarUrl);

                                // flash url : controls=false&file=//view.vzaar.com/2552732/video

                                // Load video?
                                mediaElement.load();

                                // setTimeout

                                mediaElement.setVolume(0);

                                mediaElement.play();

                                player = mediaElement;
                            },
                            error: function() {
                                console.log('The video did not load properly.');
                            },
                            keyActions: [{
                                keys: [27,32],
                                action: function(player,media){
                                    //if a user hits escape or space, pause to fire the fadeout fn
                                    media.pause();
                                }
                            }]
                        });

                        // videoElem.on('ended', function() {
                        //     $(this).fadeOut(500);
                        // });
                    }//END VIDEO SETUP

                    // Save for next time
                    if (heroIndex + 1 > people.length - 1) {
                        store.set('heroIndex', 0);
                    } else {
                        store.set('heroIndex', heroIndex + 1);
                    }
                }
            };
        }
    ])

    .directive('mobileNav', ['$window', '$document', '$timeout', '_',

        function($window, $document, $timeout, _) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var ns = '.mobileNav' + _.uniqueId();
                    var opened = false;
                    var jqHtml = $document.find('html');
                    var timeout;

                    function open() {

                        $timeout.cancel(timeout);

                        jqHtml.addClass('nav-transition nav-open');

                        opened = true;
                    }

                    function close() {

                        jqHtml.removeClass('nav-open');

                        timeout = $timeout(function() {
                            jqHtml.removeClass('nav-transition');
                        }, 250);

                        opened = false;
                    }

                    function toggle() {
                        if (opened) {
                            close();
                        } else {
                            open();
                        }
                    }
                    element.on('click' + ns, function(e) {
                        toggle();
                    });

                    scope.$watch('mq.lg', function(newValue, oldValue) {
                        if (newValue === true && newValue !== oldValue) {
                            close();
                        }
                    });

                    scope.$on('$destroy', function() {
                        element.off(ns);
                    });

                }
            };
        }
    ])

    .directive('trackEvent', ['$window', 'Analytics',

        function($window, Analytics) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ctrl) {

                    var eventType = attrs.trackEventType || 'click';

                    element.on(eventType + '.ga', function(event) {

                        // Array is ordered as such:
                        // [category, action, label, value]
                        var trackArray;

                        try {
                            trackArray = scope.$eval(attrs.trackEvent);
                        } catch (exception) {
                            // something messed up
                            trackArray = null;
                        }

                        if (trackArray) {
                            Analytics.trackEvent.apply(this, trackArray);
                        }
                    });

                    scope.$on('$destroy', function() {
                        element.off('.ga');
                    });

                }
            };
        }
    ])

    .directive('showFocus', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var timeout;

                    scope.$watch(attrs.showFocus, function(newValue, oldValue) {

                        if (newValue) {

                            $timeout.cancel(timeout);

                            // something is bluring it, setting timeout to 150
                            timeout = $timeout(function() {
                                element.focus();
                            }, 150);
                        }

                    });
                }
            };
        }
    ])

    .directive('mobiscroll', ['$rootScope', '$window', '$timeout', 'moment',
        function($rootScope, $window, $timeout, moment) {
            return {
                restrict: 'A',
                require: 'ngModel',
                // scope: true,
                link: function(scope, element, attrs, ctrl) {

                    scope.subtract = function(number, period) {
                        return moment().subtract(number, period).toDate();
                    };

                    scope.add = function(number, period) {
                        return moment().add(number, period).toDate();
                    };

                    scope.today = function() {
                        return new Date();
                    };

                    scope.yesterday = function() {
                        return moment().subtract(1, 'days').toDate();
                    };

                    scope.tomorrow = function() {
                        return moment().add(1, 'days').toDate();
                    };

                    var maxDate = scope.$eval(attrs.maxDate) || null;
                    var minDate = scope.$eval(attrs.minDate) || null;

                    var watcher;

                    element
                        .mobiscroll()
                        .calendar({
                            animate: false,
                            buttons: [],
                            closeOnSelect: false,
                            context: '.injector--mobiscroll',
                            focusOnClose: false,
                            maxDate: maxDate,
                            minDate: minDate,
                            scrollLock: false,
                            tap: false,
                            theme: 'mobiscroll',
                            lang: $rootScope.lang,
                            onBeforeShow: function(inst) {

                                if (scope.mq.sm) {
                                    inst.settings.display = 'bottom';
                                } else {
                                    inst.settings.display = 'modal';
                                }

                                if (moment(ctrl.$viewValue, $rootScope.dateFormat).isValid()) {
                                    inst.setDate(moment(ctrl.$viewValue, $rootScope.dateFormat).toDate());
                                }

                                $('.injector--mobiscroll').addClass('open');

                                angular.element($window)
                                    .on('resize.mobiscroll', function(e) {
                                        element.mobiscroll('position', true);
                                    })
                                    .on('orientationchange.mobiscroll', function(e) {
                                        element.mobiscroll('cancel');
                                    });

                            },
                            onShow: function(html, valueText, inst) {

                                // Remove the selected state from the button if there is no date value yet

                                if (!inst.getValues()[0]) {
                                    $('.dw-cal-day.dw-sel', html).removeClass('dw-sel');
                                }

                            },
                            onClose: function(valueText, btn, inst) {

                                $('.injector--mobiscroll').removeClass('open');

                                angular.element($window).off('.mobiscroll');

                                element.trigger('blur');

                            }

                        });

                    element.siblings('.icon, .blocker').on('click.mobiscroll', function(e) {
                        if (!element.is(':disabled')) {
                            element.mobiscroll('show');
                        }
                    });

                    // Only way i could get mobiscroll to do a timeout delay.

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        if (element.mobiscroll('isVisible')) {

                            $timeout(function() {
                                element.mobiscroll('select');
                            }, 0);

                        }
                    });

                    scope.$watch('mq.sm', function(newValue, oldValue) {
                        element.mobiscroll('cancel');
                    });

                    scope.$on('$destroy', function(e) {
                        element.mobiscroll('destroy');
                        element.siblings('.icon, .blocker').off('.mobiscroll');
                    });
                }
            };
        }
    ])

    .directive('uppercase', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });
                }
            };
        }
    ])

    .directive('lowercase', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toLowerCase();

                    });
                }
            };
        }
    ])

    .directive('capitalize', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return _.map(data.split(' '), function(val) {
                            return _.capitalize(val.toLowerCase());
                        }).join(' ');

                    });
                }
            };
        }
    ])

    .directive('equals', [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    scope.$watchCollection('[' + attrs.ngModel + ',' + attrs.equals + ']', function(newValue, oldValue) {
                        ctrl.$setValidity('equals', newValue[0] && newValue[1] && newValue[0] === newValue[1]);
                    });
                }
            };
        }
    ])

    .directive('initModel', ['safeApply',
        function(safeApply) {
            return {
                priority: 450,
                restrict: 'A',
                require: 'ngModel',
                compile: function() {
                    return {
                        pre: function(scope, element, attrs, ctrl) {

                            if (attrs.initModel) {
                                scope.$eval(attrs.ngModel + ' = ' + attrs.initModel);
                            } else {
                                scope.$eval(attrs.ngModel + ' = undefined');
                            }

                        },
                        post: function(scope, element, attrs, ctrl) {

                            // if (attrs.initModel) {

                            //     safeApply(function() {
                            //         ctrl.$setViewValue(scope.$eval(attrs.initModel));
                            //         ctrl.$render();
                            //     }, scope);

                            // }

                        }
                    };
                }
            };
        }
    ])

    .directive('disableWhen', ['safeApply', '$timeout',
        function(safeApply, $timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    scope.$watch(function() {

                        return scope.$eval(attrs.disableWhen);

                    }, function(newValue, oldValue) {

                        if (newValue === true) {

                            element.on('focus.disableWhen', 'input, button, select', function(e) {

                                if (scope.$eval(attrs.disableWhen)) {
                                    $(e.currentTarget).blur();
                                }

                            });

                            element.on('keypress.disableWhen', 'input, button, select', function(e) {

                                if (scope.$eval(attrs.disableWhen)) {
                                    e.preventDefault();
                                }

                            });

                        } else {

                            element.off('.disableWhen');

                        }

                    });
                }
            };
        }
    ])

    .directive('resetWhen', ['safeApply', '$timeout',
        function(safeApply, $timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    scope.$watch(function() {

                        return scope.$eval(attrs.resetWhen);

                    }, function(newValue, oldValue) {

                        // Needed to add an initialized variable to the scope
                        // The controller sometimes sets the data in the user is logged in

                        if (newValue === true) {

                            if (scope.$eval('initialized')) {

                                $timeout(function() {
                                    if (attrs.resetTo) {
                                        scope.$eval(attrs.ngModel + ' = ' + attrs.resetTo);
                                    } else {
                                        scope.$eval(attrs.ngModel + ' = undefined');
                                    }
                                });
                            }
                        }
                    });

                }
            };
        }
    ])

    // All global stuff
    .directive('primeDirective', ['$rootScope', '$window', '$document', '$timeout', '$interval', 'safeApply', 'bowser',
        function($rootScope, $window, $document, $timeout, $interval, safeApply, bowser) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    // Keyboard fix

                    var interval;
                    var oldHeight;
                    var scrollTop;

                    function opened() {
                        // console.log('opened');

                        $interval.cancel(interval);

                        oldHeight = window.innerHeight;

                        interval = $interval(intervalHandler, 500);

                        $document.find('html').addClass('keyboard-open');

                        // scrollTop = angular.element($window).scrollTop();

                    }

                    function closed() {
                        // console.log('closed');

                        $interval.cancel(interval);

                        oldHeight = 0;

                        $document.find('html').removeClass('keyboard-open');

                        // angular.element($window).scrollTop(scrollTop);

                    }

                    function intervalHandler() {
                        // console.log('intervalHandler');

                        if (oldHeight === 0) {
                            return;
                        }

                        var newHeight = window.innerHeight;
                        var diff = Math.abs(oldHeight - newHeight);
                        var perc = Math.round((diff / oldHeight) * 100);

                        if (newHeight > oldHeight) {
                            closed();
                        } else {
                            oldHeight = newHeight;
                        }
                    }

                    element.on('click.keyboardFix focus.keyboardFix', 'input:not([type="checkbox"]):not([type="radio"])', function(e) {
                        if (scope.mq.sm) {
                            opened();
                        }
                    });

                    element.on('blur.keyboardFix', 'input:not([type="checkbox"]):not([type="radio"])', function(e) {
                        if (scope.mq.sm) {
                            closed();
                        }
                    });

                    angular.element($window).on('orientationchange.keyboardFix', function(e) {
                        if (scope.mq.sm) {
                            angular.element(document.activeElement).blur();
                        }
                    });

                    scope.$watch('mq.sm', function(newValue, oldValue) {
                        if (newValue === false && newValue !== oldValue) {
                            closed();
                        }
                    });

                    // Fixed position scroll fix

                    var windowScrollLeft = angular.element($window).scrollLeft();

                    angular.element('.scroll-fix').scrollLeft(windowScrollLeft);

                    angular.element($window).on('scroll.scrollFix', function(e) {

                        var scrollLeft = angular.element(this).scrollLeft();

                        if (scrollLeft !== windowScrollLeft) {

                            angular.element('.scroll-fix').scrollLeft(scrollLeft);

                            windowScrollLeft = scrollLeft;
                        }

                    });

                    scope.$on('$destroy', function() {
                        closed();
                        element.off('.keyboardFix');
                        angular.element($window).off('.keyboardFix, .scrollFix');
                    });

                    // IE8 tab fix

                    if (bowser.msie === true && parseInt(bowser.version, 10) === 8) {

                        element.on('keydown.ie8TabFix', 'input, textarea, select, button', function(e) {
                            if (e.which === 9) {
                                e.preventDefault();
                            }
                        });

                        scope.$on('$destroy', function() {
                            element.off('keydown.ie8TabFix');
                        });

                        // css fixes
                        $('section > .wrap--content:first-child').addClass('first-child');
                        $('section > .wrap--content:last-child').addClass('last-child');
                        $('section > .wrap--content:first-child > :first-child').addClass('first-child');
                        $('section > .wrap--content:last-child > :last-child').addClass('first-child');

                    }
                }
            };
        }
    ])

    .directive('toggleParentClass', ['$document',
        function($document) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.toggleParentClass', function(e) {
                        element.parent().toggleClass(attrs.toggleParentClass);
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.toggleParentClass');
                    });

                }
            };
        }
    ])

    .directive('toggleClass', ['$document',
        function($document) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.toggleClass', function(e) {
                        element.toggleClass(attrs.toggleClass);
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.toggleClass');
                    });

                }
            };
        }
    ])

    .directive('accordion', ['$rootScope', '$parse', '_',
        function($rootScope, $parse, _) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attrs) {

                    var uniqueId = _.uniqueId();

                    var query = _.contains(scope.mq, attrs.accordionQuery) ? attrs.accordionQuery : false;

                    // hacky or clever, you decide.
                    var initialOpen = scope.open = element.hasClass('open');

                    var autoClose = scope.$eval(attrs.accordianAutoclose) ? true : false;

                    element.on('click.accordion', '.accordion__header', function(e) {
                        scope.open = !scope.open;
                        scope.$digest();

                        if (autoClose && scope.open && !scope.mq.sm) {
                            $rootScope.$emit('accordion:opened', {
                                uniqueId: uniqueId
                            });
                        }
                    });

                    if (query) {

                        scope.$watchCollection('[open, mq.' + query + ']', function(newValue, oldValue) {

                            if (newValue[0] === true && newValue[1] === true) {
                                element.addClass('open');
                            } else {
                                element.removeClass('open');
                            }

                        });

                    } else {

                        scope.$watch('open', function(newValue, oldValue) {

                            if (typeof newValue === 'undefined') {
                                return;
                            }

                            if (newValue === true) {
                                element.addClass('open');
                            } else {
                                element.removeClass('open');
                            }
                        });
                    }

                    // // Incase you open them all in sm, and resize to lg
                    // scope.$watch('mq.lg', function(newValue, oldValue) {
                    //     if (newValue === true) {
                    //         scope.open = initialOpen;
                    //     }
                    // });

                    // Reset on breakpoint change
                    scope.$watch('mq', function(newValue, oldValue) {

                        if (newValue === oldValue) {
                            return;
                        }

                        scope.open = initialOpen;

                    }, true);

                    var openListener;

                    if (autoClose) {
                        openListener = $rootScope.$on('accordion:opened', function(event, data) {
                            if (data.uniqueId !== uniqueId && !scope.mq.sm) {
                                scope.open = false;
                                scope.$digest();
                            }
                        });
                    } else {
                        openListener = _.noop;
                    }

                    scope.$on('$destroy', function() {
                        openListener();
                        element.off('.accordion');
                    });
                }
            };
        }
    ])

    .directive('input', ['$rootScope', '$timeout', '_',
        function($rootScope, $timeout, _) {
            return {
                restrict: 'E',
                link: function(scope, element, attrs) {

                    element.on('keyup', function(e) {
                        if (e.which === 13) {
                            element.blur();
                        }
                    });
                }
            };
        }
    ])

    .directive('setType', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    if (attrs.hasOwnProperty('placeholder')) {
                        // type is set in placeholder directive
                        return;
                    }

                    try {

                        element.attr('type', attrs.setType);

                    } catch (e) {

                        if (attrs.setType === 'password') {

                            element.addClass('font--password');

                            // disable cut/copy/paste

                            element.on('cut copy paste', function(e) {
                                e.preventDefault();
                            });

                        }

                    } finally {

                    }

                }
            };
        }
    ])

    .directive('placeholder', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // Allows us to use 'text' for those browsers that don't allow changing type
                    // But change type for those that support it, IE9
                    var originalType = attrs.setType || attrs.type;

                    // Some browsers do not allow us to change the type, IE8
                    var canChangeType = (function() {

                        var canChange = true;

                        try {

                            element.attr('type', originalType);

                        } catch (e) {

                            canChange = false;

                            if (originalType === 'password') {

                                element.addClass('font--password');

                                // disable cut/copy/paste

                                element.on('cut copy paste', function(e) {
                                    e.preventDefault();
                                });

                            }

                        } finally {

                        }

                        return canChange;

                    })();

                    if ('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea')) {
                        // has native support
                        return;
                    }


                    element.on('focus.placeholder', function(e) {

                        if (element.val() === attrs.placeholder) {

                            element.val('');

                            element.removeClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', originalType);
                            }
                        }
                    });

                    element.on('blur.placeholder', function(e) {

                        if (!element.val()) {

                            element.val(attrs.placeholder);

                            element.addClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', 'text');
                            }
                        }
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.placeholder');
                    });

                    $timeout(function() {

                        if (!element.val()) {

                            element.val(attrs.placeholder);

                            element.addClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', 'text');
                            }

                        }
                    });

                    if (ctrl) {

                        // View -> Model
                        ctrl.$parsers.push(function(data) {
                            if (!data) {
                                return;
                            }

                            if (data === attrs.placeholder) {
                                element.addClass('placeholder');
                                return;
                            } else {
                                element.removeClass('placeholder');
                            }

                            return data;
                        });

                        // Model -> View
                        ctrl.$formatters.push(function(data) {
                            if (!data) {
                                return;
                            }

                            if (data === attrs.placeholder) {
                                element.addClass('placeholder');
                            } else {
                                element.removeClass('placeholder');
                            }

                            return data;
                        });

                    }
                }
            };
        }
    ])

    .directive('watchHeight', ['$window', 'safeApply',
        function($window, safeApply) {
            return {
                link: function(scope, element, attrs) {

                    // scope.$watch(function() {
                    //     scope[attrs.watchHeight] = element.height();
                    // });

                    safeApply(function() {
                        scope[attrs.watchHeight] = element.height();
                    }, scope);

                    angular.element($window).on('resize.watchHeight', function(e) {
                        safeApply(function() {
                            scope[attrs.watchHeight] = element.height();
                        }, scope);
                    });

                    scope.$on('$destroy', function() {
                        angular.element($window).off('.watchHeight');
                    });
                }
            };
        }
    ])

    .directive('modal', ['$window',
        function($rootScope, $window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.modal', function(e) {

                        // Check if we're at the desktop breakpoint
                        if (scope.mq.lg) {

                            // Prevent click from redirecting user (if its an anchor)
                            e.preventDefault();

                            var modal = attrs.href.substr(0, attrs.href.lastIndexOf('.')) || attrs.href;

                            // Call show modal function with modal name
                            scope.showModal(modal);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.modal');
                    });
                }
            };
        }
    ])

    .directive('smClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.smClick);

                    element.on('click.smClick', function(event) {

                        if (scope.mq.sm) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.smClick');
                    });
                }
            };
        }
    ])

    .directive('mdClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.smClick);

                    element.on('click.mdClick', function(event) {

                        if (scope.mq.md) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.smClick');
                    });
                }
            };
        }
    ])

    .directive('lgClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.lgClick);

                    element.on('click.lgClick', function(event) {

                        if (scope.mq.lg) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.lgClick');
                    });
                }
            };
        }
    ])


    .directive('scrollTo', ['ScrollTo', function(ScrollTo){
        return {
            restrict : "AC",
            compile : function(){

                return function(scope, element, attr) {
                    element.bind("click", function(event){
                        ScrollTo.idOrName(attr.scrollTo, attr.offset);
                    });
                };
            }
        };
    }])
    .service('ScrollTo', ['$window', 'ngScrollToOptions', function($window, ngScrollToOptions) {

        this.idOrName = function (idOrName, offset, focus) {//find element with the given id or name and scroll to the first element it finds
            var document = $window.document;

            if(!idOrName) {//move to top if idOrName is not provided
                $window.scrollTo(0, 0);
            }

            if(focus === undefined) { //set default action to focus element
                focus = true;
            }

            //check if an element can be found with id attribute
            var el = document.getElementById(idOrName);
            if(!el) {//check if an element can be found with name attribute if there is no such id
                el = document.getElementsByName(idOrName);

                if(el && el.length)
                    el = el[0];
                else
                    el = null;
            }

            if(el) { //if an element is found, scroll to the element
                if (focus) {
                    el.focus();
                }

                ngScrollToOptions.handler(el, offset);
            }

            //otherwise, ignore
        }

    }])
    .provider("ngScrollToOptions", function() {
        this.options = {
            handler : function(el, offset) {
                if (offset) {
                    var top = $(el).offset().top - offset;
                    window.scrollTo(0, top);
                }
                else {
                    el.scrollIntoView();
                }
            }
        };
        this.$get = function() {
            return this.options;
        };
        this.extend = function(options) {
            this.options = angular.extend(this.options, options);
        };
    });
    

    

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.directives')

    .directive('a', ['$rootScope', '$location', 'parseUri', 'ModalService',
        function($rootScope, $location, parseUri, ModalService) {

            var whitelist = [  
                'shire.com',              
                parseUri($location.absUrl()).host,
                $location.$$host
            ];
            var foo = whitelist.join('|');
            var whitelistRegex = new RegExp('(?:' + foo.substring(0, foo.length - 1) + ')$');
            var urlRegex = whitelistRegex;

            return {
                restrict: 'E',
                link: function(scope, element, attrs) {

                    // only target external links
                    if (attrs.target !== '_blank' || element.hasClass('authorized-link')) {
                        return;
                    }

                    var checkWhiteList = function() {

                        var urlObj = parseUri(element.prop('href'));

                        // if (urlObj.path === '/hcp/') {
                        //     // hcp interstitial modal

                        //     setupInterstitial('hcp');

                        // } else {..below..}
                        if (!urlRegex.test(urlObj.host)) {
                            // check if host matches white list
                            // bind interstitial modal

                            setupInterstitial('interstitial');

                        }
                    };

                    var setupInterstitial = function(modalName) {

                        element.on('click.interstitial', function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            scope.interstitialUrl = element.prop('href');

                            ModalService
                                .showModal({
                                    scope: scope,
                                    templateUrl: 'views/modal/' + modalName + '.html',
                                    controller: 'ModalController'
                                })
                                .then(function(modal) {
                                    modal.element.show();
                                });
                        });

                    };

                    var listener = scope.$watch(function() {
                        return attrs.href;
                    }, function() {

                        // Clear
                        listener();

                        checkWhiteList();
                    });

                    scope.$on('$destroy', function() {
                        element.off('.interstitial');
                    });
                }
            };
        }
    ]);

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp.filters', ['ngSanitize'])

    // Return trusted html
    .filter('htrust', ['$sce',
        function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }
    ])

    // Return trusted url
    .filter('utrust', ['$sce',
        function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }
    ])

    .filter('range', function() {
        return function(input, total) {
            return _.range(0, parseInt(total, 10));
        };
    })

    .filter('capitalize', function() {
        return function(input) {
            return _.capitalize(input.toLowerCase());
        };
    })

    ;

}).call(this);
;(function() {
    'use strict';

    angular.module('cdmp', ['cdmp.services', 'cdmp.controllers', 'cdmp.directives', 'cdmp.filters', 'ngSanitize', 'ngCookies', 'angular-storage', 'matchmedia-ng', 'duScroll', 'ngMask', 'rcMailgun', 'templates', 'ngTouch'])

    // Disable router
    // http://stackoverflow.com/a/19825756
    .config(['$provide',

        function($provide) {

            $provide.decorator('$browser', ['$delegate',

                function($delegate) {

                    $delegate.onUrlChange = function() {

                    };

                    $delegate.url = function() {
                        return '';
                    };

                    return $delegate;
                }
            ]);
        }
    ])

    .config(['rcMailgunProvider', 'AnalyticsProvider',
        function(rcMailgunProvider, AnalyticsProvider) {

            // rcMailgunProvider.configure({
            //     api_key: 'pubkey-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            // });

            // // Setup Analytics
            // var isProd = /PROD.com$/i.test(window.location.host);

            // if (isProd) {

            //     AnalyticsProvider.setAccount([{
            //         id: 'UA-62459546-1',
            //         name: 'default'
            //     }, {
            //         id: 'UA-62459546-2',
            //         name: 'rollup'
            //     }, ]);

            //     AnalyticsProvider.setCookieConfig({
            //         'cookieDomain': 'auto'
            //     });

            // } else {

            //     AnalyticsProvider.setAccount([{
            //         id: 'UA-62459546-3',
            //         name: 'default'
            //     }, {
            //         id: 'UA-62459546-4',
            //         name: 'rollup'
            //     }, ]);

            //     AnalyticsProvider.setCookieConfig({
            //         'cookieDomain': 'none'
            //     });

            //     // Turn on to load debug version of analytics (prints a lot of stuff to the console)
            //     // AnalyticsProvider.setDebug(true);

            // }

            // // set to true when using angular routing (make sure to specify the change event name)
            // AnalyticsProvider.trackPagesAutomatically(false);

            // // use analytics.js vs ga.js
            // AnalyticsProvider.useAnalytics(true);

            // // set to true when using angular routing
            // AnalyticsProvider.ignoreFirstPageLoad(false);

            // // set to true when using angular routing
            // AnalyticsProvider.usePageViewForPageField(false);

        }
    ])

    .run(['$rootScope',

        function($rootScope) {

            FastClick.attach(document.body);

        }
    ]);

}).call(this);



//# sourceMappingURL=app.js.map