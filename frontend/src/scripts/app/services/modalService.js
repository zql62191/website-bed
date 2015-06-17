// Taken and modified from https://github.com/dwmkerr/angular-modal-service

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

}).call(this);