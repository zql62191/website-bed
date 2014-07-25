<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="Default2" %>
<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="BED">
<head>
    <script src="http://cdn.jsdelivr.net/g/lodash@2.4.1(lodash.compat.js),jquery@1.11.0(jquery.js),angularjs@1.2.15(angular.js+angular-route.min.js)"></script>
    <script src="Scripts/unsubscribe.js"></script>
</head>
<body ng-controller="UnsubscribeController">
    <div>
    <form name="UnsubscribeForm" novalidate>
        <input type="radio" name="optoutchoice" ng-model="form.optoutchoice" value="email" >Opt-Out Email</input><br />
        <input type="radio" name="optoutchoice" ng-model="form.optoutchoice" value="direct" >Opt-Out Direct Mail</input><br />
        <input type="radio" name="optoutchoice" ng-model="form.optoutchoice" value="all" >Opt-Out All</input><br />
        <p ng-show='form.optoutchoice == "email"'>Please enter your E-mail</p>
        <p ng-show='form.optoutchoice == "direct"'>Please enter your Street Address</p>
        <p ng-show='form.optoutchoice == "all"'>Please enter your E-mail and Street Address</p>

         <div ng-if='form.optoutchoice == "email" || form.optoutchoice == "all"'>
            E-Mail <input type="e-mail" name="form_email" ng-model="form.email" required /><br />
        </div>
        <div ng-if='form.optoutchoice == "direct" || form.optoutchoice == "all"'>
            First Name <input type="text" name="form_fname" ng-model="form.fname" required /><br />
			Middle Initial <input type="text" size="1" maxlength="1" name="form_mi" ng-model="form.MI" ng-pattern="/^[a-zA-Z]$/" /><br />
			Last Name <input type="text" name="form_lname" ng-model="form.lname" required /><br />
			Street Address<input type="text" name="form_street" ng-model="form.street" required /><br />
			Suite Office<input type="text" name="form_suite" ng-model="form.suite" /><br />
			City<input type="text" name="form_city" ng-model="form.city" required /><br />
			State<select name="form_state" ng-model="form.state" ng-options="state for state in states" required></select> <br />
			Zip<input type="text" name="form_zip" ng-model="form.zip" ng-pattern="/^\d{5}$/" required /><br />
			Profession<select name="form_zip" ng-model="form.profession" ng-options="profession for profession in professions" required></select><br />
        </div>


        <pre>{{form.fname}}</pre>
        <pre>{{form.email}}</pre>
    </form>
    </div>
</body>
</html>
