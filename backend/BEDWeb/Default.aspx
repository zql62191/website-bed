<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="_Default" %>
<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="BED">
<head>
	  <%--<script src="//cdn.jsdelivr.net/g/lodash@2.4.1(lodash.compat.min.js),jquery@1.11.0,jquery.maskedinput@1.3.1,angularjs@1.2.15(angular.min.js+angular-route.min.js)"></script>--%>
      <script src="http://cdn.jsdelivr.net/g/lodash@2.4.1(lodash.compat.js),jquery@1.11.0(jquery.js),angularjs@1.2.15(angular.js+angular-route.min.js)"></script>
      
    <%--<script type="text/javascript" src="Scripts/angular.js"></script>--%>
	<%--<script type="text/javascript" src="Scripts/script.js"></script>--%>
   <%--<script type="text/javascript">
       var app = angular.module('BED', ['ngRoute']);
   </script>--%>
   <script src="Scripts/app.js"></script>
   
 </head>
<body ng-controller="BedController">
	<div>
		<h2>Sign Up</h2>
		<form name="BEDForm" novalidate>
			First Name: <input type="text" name="uFname" ng-model="form_data.fname" required /><br />
			Middle Initial: <input type="text" name="uMI" ng-model="form_data.MI" ng-pattern="/^[a-zA-Z]$/" /><br />
			Last Name: <input type="text" name="uLname" ng-model="form_data.lname" required /><br />
			E-Mail: <input type="email" name="uEmail" ng-model="form_data.email" required /><br />
			Confirm E-Mail:<input type="text" ng-model="form_data.confirmemail" name="uConfirmemail" confirmemail /><br />
			Street Address:<input type="text" name="uStreet" ng-model="form_data.street" required /><br />
			Suite Office: <input type="text" name="uSuite" ng-model="form_data.suite" /><br />
			City:<input type="text" name="uCity" ng-model="form_data.city" required /><br />
			State:<select name="uState" ng-model="form_data.state" ng-options="state for state in states" required></select> <br />
			Zip:<input type="text" name="uZip" ng-model="form_data.zip" ng-pattern="/^\d{5}$/" required /><br />
			Profession:<select name="uProfession" ng-model="form_data.profession" ng-options="profession for profession in professions" required></select><br />
			CheckBox:<input type="checkbox" name="uCheckbox" ng-model="form_data.checkbox" required /><br />

			<button ng-click="submitForm()" ng-disabled="BEDForm.$invalid" >Submit</button>
		</form>
		<%--<h3>Submitted Info</h3>
		<pre>First Name: {{form_data.fname}}</pre>	
		<pre>Middle Initial: {{master.MI}}</pre>	
		<pre>Last Name: {{master.lname}}</pre>	
		<pre>Email: {{master.email}}</pre>	
		<pre>Address: {{master.street}}</pre>	
		<pre>Suite/Office: {{master.suite}}</pre>	
		<pre>City: {{master.city}}</pre>	
		<pre>Zip: {{master.zip}}</pre>	
		<pre>State: {{master.state}}</pre>	
		<pre>Profession: {{master.profession}}</pre>	--%>
	</div>

</body>
</html>

