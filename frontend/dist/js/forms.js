function convertSpecToCode(a){switch(a){case"Eating Disorder Clinician":return"EDC";case"Internal Medicine":return"IM";case"Primary Care Physician":return"PCPR";case"Psychiatrist":return"P";case"Psychologist":return"PSY";default:return null}}function convertStateToAbbr(a){var b={Alabama:"AL",Alaska:"AK",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE",Florida:"FL",Georgia:"GA",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND",Ohio:"OH",Oklahoma:"OK",Oregon:"OR",Pennsylvania:"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT",Virginia:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY",Guam:"GU","Northern Mariana Islands":"MP","Puerto Rico":"PR","U.S. Minor Outlying Islands":"UM","U.S. Virgin Islands":"VI"};return b[a]?b[a]:null}function showSignUpThankYou(){$(".modal--thankyou").show()}(function(){function a(a,b,c,e,f,g,h){a.states=d,a.form={optoutchoice:"none"},a.form.state=a.states[0],a.unsubscribe=function(){var b=$(document).height()-$(window).height(),c=$(window).scrollTop(),d=b-c;if(a.bed_form.$valid)switch(g(function(){var a=$(document).height()-$(window).height(),b=$(window).scrollTop(),e=a-b,f=e-d;$(window).scrollTop(c+f)},100),$("input:checked").val()){case"email":a.unsubscribeEmail();break;case"direct":a.unsubscribeDirect();break;case"both":a.unsubscribeAll()}},a.unsubscribeAll=function(){var b,d={email:{Email:a.form.email,ConfirmEmail:a.form.email},address:{FName:a.form.fname,MName:a.checkFormPresent(a.form.MI),LName:a.form.lname,Address1:a.form.street,Address2:a.checkFormPresent(a.form.suite),City:a.form.city,State:convertStateToAbbr(a.form.state),Zip:a.form.zip}};c.log(convertStateToAbbr(a.form.state)),b="/BEDSite/Service/BEDService.svc/SetUnsubscribeDataBoth",Data=JSON.stringify(d),a.processForm(b,Data)},a.unsubscribeDirect=function(){var b,c={FName:a.form.fname,MName:a.checkFormPresent(a.form.MI),LName:a.form.lname,Address1:a.form.street,Address2:a.checkFormPresent(a.form.suite),City:a.form.city,State:convertStateToAbbr(a.form.state),Zip:a.form.zip};b="/BEDSite/Service/BEDService.svc/SetUnsubscribeDataDirect",Data=JSON.stringify(c),a.processForm(b,Data)},a.unsubscribeEmail=function(){var b,c={Email:a.form.email,ConfirmEmail:a.form.email};b="/BEDSite/Service/BEDService.svc/SetUnsubscribeDataEmail",Data=JSON.stringify(c),a.processForm(b,Data)},a.processForm=function(a,b){c.log(b),h({headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",url:a,data:b})},a.checkFormPresent=function(a){return a?a:null}}function b(a,b,c,e,f,g,h){a.states=d,a.invalidform=!1,a.professions=["*Profession","Eating Disorder Clinician","Internal Medicine","Primary Care Physician","Psychiatrist","Psychologist"],a.form={},a.form.state=a.states[0],a.form.profession=a.professions[0],a.optIn=function(){var b,c=$(document).height()-$(window).height(),d=$(window).scrollTop(),e=c-d,f={Specialty:convertSpecToCode(a.form.profession),CommunicationsOptIn:1,Email:{Email:a.form.email,ConfirmEmail:a.form.email},Address:{FName:a.form.fname,MName:a.checkFormPresent(a.form.MI),LName:a.form.lname,Address1:a.form.street,Address2:a.checkFormPresent(a.form.suite),City:a.form.city,State:convertStateToAbbr(a.form.state),Zip:a.form.zip}};return a.bed_form.$valid?(g(function(){var a=$(document).height()-$(window).height(),b=$(window).scrollTop(),c=a-b,f=c-e;$(window).scrollTop(d+f)},100),b="/BEDSite/Service/BEDService.svc/SetOptInData",Data=JSON.stringify(f),a.processOptIn(b,Data),void showSignUpThankYou()):void(a.invalidform=!0)},a.checkFormPresent=function(a){return a?a:null},a.processOptIn=function(a,b){c.log(b),h({headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",url:a,data:b,dataType:"json"})}}var c,d=["*State","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kanasas","Kentucky","Lousiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","American Samoa","Guam","Northern Mariana Islands","Puerto Rico","U.S. Minor Outlying Islands","U.S. Virgin Islands"];c=angular.module("BED.controllers",[]),c.controller("UnsubscribeController",["$scope","$window","$log","$location","$document","$timeout","$http",a]),c.controller("OptInController",["$scope","$window","$log","$location","$document","$timeout","$http",b])}).call(this),function(){var a=angular.module("BED.directives",[]);a.directive("stateselect",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return"*State"===a?(d.$setValidity("stateselect",!1),a):(d.$setValidity("stateselect",!0),a)})}}}),a.directive("profselect",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return"*Profession"===a?(d.$setValidity("profselect",!1),a):(d.$setValidity("profselect",!0),a)})}}}),a.directive("confirmemail",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(b){return angular.equals(a.form.email,b)?(d.$setValidity("confirmemail",!0),b):void d.$setValidity("confirmemail",!1)})}}})}.call(this),function(){var a;a=angular.module("BED",["BED.controllers","BED.directives"])}.call(this);