﻿<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="Default2" %>
<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="BED">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta name="google" content="notranslate">
    <title></title>
    <script>
        (function (a) { if (/msie|trident/i.test(a)) { a = a.match(/(?:msie |rv:)(\d+(\.\d+)?)/i); a = parseInt(a && 1 < a.length && a[1] || '', 10); for (var c = ['eq-ie'], b = 6; 12 >= b; b++) a > b ? c.push('gt-ie' + b) : a < b ? c.push('lt-ie' + b) : a === b && (c.push('lte-ie' + b), c.push('eq-ie' + b), c.push('gte-ie' + b)); document.documentElement.className += ' ' + c.join(' ') } })(navigator.userAgent || '');
      
    </script>
    <link rel="stylesheet" href="content/css/styles.css">
    <script src="//fast.fonts.net/jsapi/352bad9a-496a-416d-b9cf-171842848303.js"></script><!--[if (gte IE 6)&(lte IE 8)]>
    <script src="content/js/ie.js"></script><![endif]-->
    <script src="content/js/libs.js"></script><!--[if (gte IE 6)&(lte IE 8)]>
    <script src="//cdn.jsdelivr.net/skrollr/0.6.26/skrollr.ie.min.js"></script><![endif]-->
    <script src="content/js/main.js"></script>
    <script src="content/js/forms.js"></script>
    <script>
        $(BED.init);
      
    </script>
  </head>
  <body>
    <div class="page-wrapper">
      <div class="page-header">
        <div class="content-wrap"><a class="btn btn--menu">Menu</a><a class="btn btn--dsm5"><em>DSM-5</em><sup>&reg;</sup><br class="hide--desktop"> Criteria</a><a class="btn btn--signup">SIGN <br class="hide--desktop">UP</a></div>
      </div>
      <div class="page-nav _is_fixed_left _slideout">
        <nav>
                <ul class="primary-nav">
                  <li class="primary-nav__item _1_liner"><a href="/#home">Home</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#prevalence">Prevalence</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#dsm5"><em>DSM-5<sup>&reg;</sup></em> Criteria</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#course">Clinical Characteristics</a></li>
                  <li class="primary-nav__item _2_liner"><a href="/#effects"><em>DSM-5<sup>&reg;</sup></em> Functional <br/>Consequences</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#neurobiology">Neurobiology</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#diagnosis">Recognizing BED in Adults</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#resources">Resources/Expert Videos</a></li>
                </ul>
        </nav>
      </div>
      <div ng-controller="OptInController" class="signup-container _is_fixed_right _slideout">
        <div class="close"></div>
        <h2>
          Sign up to receive informative BED content and updates from Shire.
          
        </h2>
        <p class="required-fields"><span class="red">*</span>Required Fields
          
        </p>
        <form name="bed_form" ng-submit="optIn()" novalidate>
          <input type="text" name="firstName" placeholder="*First Name" ng-model="form.fname" ng-required="true" class="first-name">
          <input type="text" name="middleInitial" placeholder="MI" ng-model="form.MI" ng-required="false" class="middle-initial">
          <input type="text" name="lastName" placeholder="*Last Name" ng-model="form.lname" ng-required="true" class="last-name">
          <input type="text" name="email" placeholder="*Email" ng-model="form.email" ng-required="true" ng-pattern="/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/" class="email">
          <input type="text" name="email2" ng-model="form.confirmemail" ng-required="true" confirmemail placeholder="*Re-enter Email" class="email2">
          <input type="text" name="streetAddress" placeholder="*Street Address" ng-model="form.street" ng-required="true" class="street-address">
          <input type="text" name="suiteOffice" placeholder="Suite/Office" ng-model="form.suite" ng-required="false" class="suite-office">
          <input type="text" name="city" placeholder="*City" ng-model="form.city" ng-required="true" class="city">
          <select name="state" ng-model="form.state" ng-options="state for state in states" stateselect class="state"></select>
          <input type="text" name="zip" placeholder="*Zip" ng-model="form.zip" ng-pattern="/^[0-9]{5}$/" required class="zip">
          <select name="profession" ng-model="form.profession" ng-options="prof for prof in professions" profselect class="profession"></select>
          <h3>
            Opt In for Communications
            
            
          </h3>
          <input type="checkbox" name="optin" ng-model="form.checkbox" ng-required="true" id="optin" class="optin">
          <label for="optin" class="optin-label">
            <p>By checking this box and clicking submit, you certify that you are a US health care professional and you are opting to receive information about binge eating disorder plus product information, site updates, educational information, patient support resources, and other information from Shire. You will be able to opt out of these communications at any time.</p>
            <p>
              Shire respects your personal information. All information you have provided will be kept confidential and will not be used or distributed to anyone for any purpose other than what is explained in our Privacy Policy Statement. We encourage you to read our Privacy Policy Statement by clicking on this link: Review Shire Privacy Policy Statement. This consent will be in effect until such time as you opt out of the program.
              
            </p>
          </label>
          <input type="submit" name="submit" value="SUBMIT" class="submit">
        </form>
      </div>
      <div class="dsm5-container _is_fixed_right _slideout">
        <div class="close"></div>
        <h2>
          What is binge eating disorder (BED)?
          
        </h2>
        <p>Binge eating disorder, now a distinct diagnosis in DSM-5<sup>®</sup>, is characterized by<sup>1</sup>:
          
        </p>
        <ul class="bullet">
          <li>Recurring episodes (at least once weekly for 3 months) of consuming a large amount of food in a short period of time, compared with others</li>
          <li>A feeling of a lack of control over eating during an episode</li>
          <li>
            Marked distress regarding binge eating
            
          </li>
        </ul>
        <p>
          During a binge, adults with BED may eat much more rapidly than normal, eat until they are uncomfortably full, eat large amounts of food when not feeling physically hungry, and/or eat alone out of embarrassment. They may feel disgusted with themselves, depressed, or very guilty afterward.
          
        </p>
        <p><em>These are not the complete diagnostic criteria, but instead a brief summary. Please view the full diagnostic criteria by selecting the link below. Diagnosis should be based on a complete evaluation of the patient.</em> 
          
        </p><a target="_blank" href="#" class="pdf-link"><span><em>DSM-5<sup>&reg;</sup></em> Criteria</span></a>
      </div>
      <div class="page-content">
        <div ng-controller="UnsubscribeController" class="unsubscribe">
          <div class="content-wrap">
            <form id="bed_form" name="bed_form" ng-submit="unsubscribe()" autocomplete="offs" novalidate>
              <h1>Unsubscribe</h1>
              <p>
                To unsubscribe from future communications, please select an option below, fill in the required fields, and click Submit.
                
              </p>
              <div class="opt-out-choice">
                <p class="form-line">
                  <input type="radio" name="unsubscribe" value="email" ng-model="form.optoutchoice" id="emailRadio">
                  <label for="emailRadio">I would like to opt out of future BED email communication.</label>
                </p>
                <p class="form-line">
                  <input type="radio" name="unsubscribe" value="direct" ng-model="form.optoutchoice" id="directRadio">
                  <label for="directRadio">
                    I would like to opt out of future BED direct mail communication.
                    
                  </label>
                </p>
                <p class="form-line">
                  <input type="radio" name="unsubscribe" value="both" ng-model="form.optoutchoice" id="bothRadio">
                  <label for="bothRadio">
                    I would like to opt out of all future Shire communication.
                    
                    
                  </label>
                </p>
              </div>
              <div class="required-fields">
                <p ng-if="form.optoutchoice != &quot;none&quot;"><span class="red">*</span>Required Fields
                  
                </p>
                <div ng-if="form.optoutchoice == &quot;email&quot; || form.optoutchoice == &quot;both&quot;" class="email">
                  <input type="text" name="email" placeholder="*Email" ng-model="form.email" ng-pattern="/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/" ng-required="true" class="email">
                </div>
                <div ng-if="form.optoutchoice == &quot;direct&quot; || form.optoutchoice == &quot;both&quot;" class="address">
                  <input type="text" name="firstName" placeholder="*First Name" ng-model="form.fname" ng-required="true" class="first-name">
                  <input type="text" name="middleInitial" placeholder="MI" ng-model="form.MI" ng-pattern="/^[a-zA-Z]$/" size="1" max-length="1" class="middle-initial">
                  <input type="text" name="lastName" placeholder="*Last Name" ng-model="form.lname" ng-required="true" class="last-name">
                  <input type="text" name="streetAddress" placeholder="*Street Address" ng-model="form.street" ng-required="true" class="street-address">
                  <input type="text" name="suiteOffice" placeholder="Suite/Office" ng-model="form.suite" ng-required="false" class="suite-office">
                  <input type="text" name="city" placeholder="*City" ng-model="form.city" ng-required="true" class=".city">
                  <select name="state" ng-model="form.state" ng-options="state for state in states" stateselect ng-required="true" class="state"></select>
                  <input type="text" name="zip" placeholder="*Zip" ng-model="form.zip" ng-pattern="/^[0-9]{5}$/" ng-required="true" class="zip">
                </div>
                <input type="submit" name="submit" value="SUBMIT" ng-if="form.optoutchoice != &quot;none&quot;" class="submit">
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="page-footer">
        <div class="content-wrap">
          <nav>
                  <ul class="secondary-nav">
                    <li class="secondary-nav__item _1_liner"><a href="unsubscribe.aspx">Unsubscribe</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="contact-us.aspx">Contact Us</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="privacy-policy.aspx">Privacy Policy</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="#">Shire US</a></li>
                  </ul>
          </nav>
          <p class="prc">S02592 08/14</p><img src="content/img/footer-logo.png" class="footer-logo">
          <p>&copy;2014 <a href="#" target="_blank">Shire US Inc.,</a> Wayne, PA 19087 1‐800‐828‐2088 All rights reserved.</p>
          <p>All content of this website including text, images, graphics, sound files, and their arrangement, belongs to Shire and is protected by international copyright laws. All other intellectual property rights are reserved. The content may not be copied for commercial use or distribution, nor may these objects be downloaded, modified, or posted to other sites.</p>
          <p>This site is intended solely for US residents and is governed solely by US laws and government regulations. Please see <a href="privacy-policy.aspx">our privacy policy</a> for more information. While Shire US Inc. makes reasonable efforts to include accurate, up‐to‐date information on the site, Shire US Inc. makes no warranties or representations as to its accuracy. Shire US Inc. assumes no liability for any errors or omissions in the content of the site.</p>
        </div>
      </div>
      <div class="mask mask--slideout"></div>
      <div class="modal-overlay">
        <div class="modal-container">
          <div class="modal-close"></div>
          <div class="modal-box">
            <section class="variable-content">
              <h3>You are about to leave BingeEatingDisorder.com.</h3>
              <p>This link will take you to a website maintained by a third party, that is responsible for its content and privacy policy. Shire provides this link as a service to you. Our privacy policy does not apply to the website you are about to visit. We encourage you to read the privacy policy of every website you visit. Click "OK" to continue or "CANCEL" to return to BingeEatingDisorder.com.</p>
              <div class="controls"><a class="button">ok</a><a class="button">cancel</a></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>