(function(){function a(a){a.states=c,a.form={optoutchoice:"none"},a.professions=["*Profession","Eating Disorder Clinician","Internal Medicine","Primary Care Physician","Psychiatrist","Psychologist"],a.form.state=a.states[0],a.form.profession=a.professions[0]}var b,c=["*State","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kanasas","Kentucky","Lousiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","American Samoa","Guam","Northern Mariana Islands","Puerto Rico","U.S. Minor Outlying Islands","U.S. Virgin Islands"];b=angular.module("BED.controllers",[]),b.controller("UnsubscribeController",["$scope",a])}).call(this),function(){var a=angular.module("BED.directives",[]);a.directive("stateselect",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return"*State"===a?(d.$setValidity("stateselect",!1),a):(d.$setValidity("stateselect",!0),a)})}}}),a.directive("profselect",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return"*Profession"===a?(d.$setValidity("profselect",!1),a):(d.$setValidity("profselect",!0),a)})}}}),a.directive("confirmemail",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(b){return angular.equals(a.form.email,b)?(d.$setValidity("confirmemail",!0),b):void d.$setValidity("confirmemail",!1)})}}})}.call(this),function(){var a;a=angular.module("BED",["BED.controllers","BED.directives"])}.call(this);
//# sourceMappingURL=form-angular.map