﻿<%@ Page Title="Privacy Policy" Language="C#"  AutoEventWireup="true"
    CodeFile="privacy-policy.aspx.cs" Inherits="privacypolicy" Debug="true" %>
<!DOCTYPE html>

<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="BED">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimum-ui">
    <meta name="format-detection" content="telephone=no">
    <meta name="google" content="notranslate">
    <title></title>
    <%-- <script type="text/javascript">
         function pageLoad() {
             alert("load");
             var config = '<%=ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None)%>';
             config.AppSettings.Settings["CommonConfigPath"].Value = "/common/config/";
             alert(config.AppSettings.Settings["CommonConfigPath"].Value);
             config.Save(ConfigurationSaveMode.Modified);

             ConfigurationManager.RefreshSection("appSettings");
         }
         
      
    </script>--%>
    <script>
        (function (a) { if (/msie|trident/i.test(a)) { a = a.match(/(?:msie |rv:)(\d+(\.\d+)?)/i); a = parseInt(a && 1 < a.length && a[1] || '', 10); for (var c = ['eq-ie'], b = 6; 12 >= b; b++) a > b ? c.push('gt-ie' + b) : a < b ? c.push('lt-ie' + b) : a === b && (c.push('lte-ie' + b), c.push('eq-ie' + b), c.push('gte-ie' + b)); document.documentElement.className += ' ' + c.join(' ') } })(navigator.userAgent || '');
      
    </script>
    <link rel="stylesheet" href="content/css/styles.css">
    <link rel="stylesheet" href="content/me/mediaelementplayer.min.css">
    <script src="//fast.fonts.net/jsapi/352bad9a-496a-416d-b9cf-171842848303.js"></script><!--[if (gte IE 6)&(lte IE 8)]>
    <script src="content/js/ie.js"></script><![endif]-->
    <script src="content/js/libs.js"></script>
    <script src="content/me/mediaelement-and-player.min.js"></script><!--[if (gte IE 6)&(lte IE 8)]>
    <script src="content/js/skrollr.ie.js"></script><![endif]-->
    <script src="content/js/main.js"></script>
    <script src="content/js/forms.js"></script>
    <script>
        $(BED.init);
      
    </script>
   
  </head>
  <body>
    <div class="page-wrapper">
      <div class="page-header-bg">
        <div class="content-wrap"></div>
      </div>
      <div class="page-header">
        <div class="content-wrap"><a data-slideout="menu" class="page-header__btn page-header__btn--menu">Menu</a><a data-slideout="dsm5" class="page-header__btn page-header__btn--dsm5"><em>DSM-5</em><sup>&reg;</sup><br class="hide--desktop"> Criteria</a><a data-slideout="signup" class="page-header__btn page-header__btn--signup">SIGN <br class="hide--desktop">UP</a></div>
      </div>
      <div data-direction="left" class="page-nav slideout slideout--menu">
        <nav class="slideout__inner">
                <ul class="primary-nav">
                  <li class="primary-nav__item _1_liner"><a href="/#home" target="_self">Home</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#prevalence" target="_self">Prevalence</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#dsm5" target="_self"><em>DSM-5<sup>&reg;</sup></em> Criteria</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#course" target="_self">Clinical Characteristics</a></li>
                  <li class="primary-nav__item _2_liner"><a href="/#effects" target="_self"><em>DSM-5<sup>&reg;</sup></em> Functional <br/>Consequences</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#neurobiology" target="_self">Neurobiology</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#diagnosis" target="_self">Recognizing BED in Adults</a></li>
                  <li class="primary-nav__item _1_liner"><a href="/#resources" target="_self">Resources/Expert Videos</a></li>
                </ul>
        </nav>
      </div>
      <div data-direction="right" ng-controller="OptInController" class="signup-container slideout slideout--signup">
        <div class="slideout__inner">
          <div class="close"></div>
          <h2>Sign up to receive the full <em>DSM-5</em><sup>®</sup> diagnostic criteria and other <br class="hide--mobile">BED content from Shire.
            
          </h2>
          <p class="required-fields"><span class="red">*</span>Required Fields
            
          </p>
          <form name="bed_form" id="bed_form" ng-submit="optIn()" novalidate>
            <input type="text" name="firstName" placeholder="*First Name" ng-model="form.fname" ng-required="true" ng-class="{forminvalid: (bed_form.firstName.$invalid &amp;&amp; bed_form.firstName.$dirty) || (bed_form.firstName.$invalid &amp;&amp; invalidform)}" class="first-name">
            <input type="text" name="middleInitial" placeholder="MI" ng-model="form.MI" ng-required="false" class="middle-initial">
            <input type="text" name="lastName" placeholder="*Last Name" ng-model="form.lname" ng-required="true" ng-class="{forminvalid: (bed_form.lastName.$invalid &amp;&amp; bed_form.lastName.$dirty) || (bed_form.lastName.$invalid &amp;&amp; invalidform)}" class="last-name">
            <input type="text" name="email" placeholder="*E-mail" ng-model="form.email" ng-required="true" ng-pattern="/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/" ng-class="{forminvalid: (bed_form.email.$invalid &amp;&amp; bed_form.email.$dirty) || (bed_form.email.$invalid &amp;&amp; invalidform)}" class="email">
            <input type="text" name="email2" ng-model="form.confirmemail" ng-required="true" confirmemail placeholder="*Re-enter E-mail" ng-class="{forminvalid: (bed_form.email2.$invalid &amp;&amp; bed_form.email2.$dirty) || (bed_form.email2.$invalid &amp;&amp; invalidform)}" class="email2">
            <input type="text" name="streetAddress" placeholder="*Street Address" ng-model="form.street" ng-required="true" ng-class="{forminvalid: (bed_form.streetAddress.$invalid &amp;&amp; bed_form.streetAddress.$dirty) || (bed_form.streetAddress.$invalid &amp;&amp; invalidform)}" class="street-address">
            <input type="text" name="suiteOffice" placeholder="Suite/Office" ng-model="form.suite" ng-required="false" class="suite-office">
            <input type="text" name="city" placeholder="*City" ng-model="form.city" ng-required="true" ng-class="{forminvalid: (bed_form.city.$invalid &amp;&amp; bed_form.city.$dirty) || (bed_form.city.$invalid &amp;&amp; invalidform)}" class="city">
            <select name="state" ng-model="form.state" ng-required="true" ng-class="{forminvalid: (bed_form.state.$invalid &amp;&amp; bed_form.state.$dirty) || (bed_form.state.$pristine &amp;&amp; invalidform)}" ng-options="state for state in states" class="state">
              <option value="" ng-selected="true">
                *State
                
                
              </option>
            </select>
            <input type="text" name="zip" placeholder="*Zip" ng-model="form.zip" ng-pattern="/^[0-9]{5}$/" maxlength="5" ng-required="true" ng-class="{forminvalid: (bed_form.zip.$invalid &amp;&amp; bed_form.zip.$dirty) || (bed_form.zip.$invalid &amp;&amp; invalidform)}" class="zip">
            <select name="profession" ng-model="form.profession" ng-required="true" ng-class="{forminvalid: (bed_form.profession.$invalid &amp;&amp; bed_form.profession.$dirty) || (bed_form.profession.$pristine &amp;&amp; invalidform)}" ng-options="prof for prof in professions" class="profession">
              <option value="" ng-selected="true">
                *Profession
                
                
                
              </option>
            </select>
            <h3>
              Opt In for Communications
              
            </h3>
            <div ng-class="{forminvaliddiv: (bed_form.optin.$invalid &amp;&amp; bed_form.optin.$dirty) || (bed_form.optin.$pristine &amp;&amp; invalidform)}">
              <input type="checkbox" name="optin" ng-model="form.checkbox" ng-required="true" id="optin" class="optin">
            </div>
            <label for="optin" class="optin-label">
              <p>By checking this box and clicking submit, you certify that you are a US health care professional and you are opting to receive information about binge eating disorder plus site updates, educational information, patient support resources, and other information from Shire. You will be able to opt out of these communications at any time.</p>
              <p>
                Shire respects your personal information. All information you have provided will be kept confidential and will not be used or distributed to anyone for any purpose other than what is explained in our Privacy Policy Statement. We encourage you to read our Privacy Policy Statement by clicking on this link: Review Shire Privacy Policy Statement. This consent will be in effect until such time as you opt out of the program.
                
              </p>
            </label>
            <input type="submit" name="submit" value="SUBMIT" class="submit">
          </form>
        </div>
      </div>
      <div data-direction="right" class="dsm5-container slideout slideout--dsm5">
        <div class="slideout__inner">
          <div class="close"></div>
          <h2>
            What is binge eating disorder (BED)?
            
          </h2>
          <p>Binge eating disorder, now a distinct diagnosis in <em>DSM-5</em><sup>®</sup>, is characterized by<sup>1</sup>:
            
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
          <p><em>Diagnosis should be based on a complete evaluation of the patient. These are not the complete diagnostic criteria, but instead a brief summary.</em> 
            
          </p><a data-slideout="signup" class="button signup">Register for additional information on BED including the full <em>DSM-5</em><sup>®</sup> diagnostic criteria</a>
        </div>
      </div>
      <div class="page-content">
        <div class="privacy-policy">
          <div class="content-wrap">
            <asp:Literal ID="litPrivacyPolicy" runat="server"></asp:Literal>
          </div>
        </div>
      </div>
      <div class="page-footer">
        <div class="content-wrap">
          <nav>
                  <ul class="secondary-nav">
                    <li class="secondary-nav__item _1_liner"><a href="unsubscribe.aspx" target="_self">Unsubscribe</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="contact-us.aspx" target="_self">Contact Us</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="privacy-policy.aspx" target="_self">Privacy Policy</a></li>
                    <li class="secondary-nav__item _1_liner"><a href="http://www.shire.com/" target="_blank">Shire US</a></li>
                  </ul>
          </nav><img src="content/img/footer-logo.png" class="footer-logo">
          <p>&copy;2014 <a href="http://www.shire.com/" target="_blank">Shire US Inc.,</a> Wayne, PA 19087 1‐800‐828‐2088 All rights reserved. S02592 08/14</p>
          <p>All content of this website including text, images, graphics, sound files, and their arrangement, belongs to Shire and is protected by international copyright laws. All other intellectual property rights are reserved. The content may not be copied for commercial use or distribution, nor may these objects be downloaded, modified, or posted to other sites.</p>
          <p>This site is intended solely for US residents and is governed solely by US laws and government regulations. Please see <a href="privacy-policy.aspx">our privacy policy</a> for more information. While Shire US Inc. makes reasonable efforts to include accurate, up‐to‐date information on the site, Shire US Inc. makes no warranties or representations as to its accuracy. Shire US Inc. assumes no liability for any errors or omissions in the content of the site.</p>
        </div>
      </div>
      <div class="modal modal--interstitial">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>You are about to leave BingeEatingDisorder.com.</h3>
            <p>This link will take you to a website maintained by a third party that is responsible for its content and privacy policy. Shire provides this link as a service to you. Our privacy policy does not apply to the website you are about to visit. We encourage you to read the privacy policy of every website you visit. Click "OK" to continue or "CANCEL" to return to BingeEatingDisorder.com.</p>
            <div class="controls"><a href="#" target="_blank" class="button button--ok">ok</a><a href class="button button--cancel">
                cancel
                </a></div>
          </div>
        </div>
      </div>
      <div class="modal modal--signup">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>Thank you!</h3>
            <p>Your registration is complete.</p>
            <p>
              We appreciate your interest in staying up to date on binge eating disorder (BED) in adults. You can expect to receive additional information from Shire on how to help your adult patients with BED.
              
            </p>
          </div>
        </div>
      </div>
      <div class="modal modal--signup_error">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>Network Error</h3>
            <p>
              There was an error processing your request. Please try again later.
              
            </p>
          </div>
        </div>
      </div>
      <div class="modal modal--video">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>Video title</h3>
            <div class="fpo">
              FPO
              
            </div>
          </div>
        </div>
      </div>
      <div class="modal modal--unsubscribe">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>Thank you for your request.</h3>
            <p>Your request has been received, and we will update your contact preferences. Please be aware that it may take up to 10 business days before your preferences are reflected in our system. You may still receive communications during this time.</p>
            <p>Please feel free to register with us again should you wish to recieve information about BED and other information from Shire in the future.</p>
            <div class="controls"><a href class="button button--close">
                CLOSE
                </a></div>
          </div>
        </div>
      </div>
      <div class="modal modal--unsubscribe_error">
        <div class="modal__outer">
          <div class="modal__inner">
            <div class="modal__close"></div>
            <h3>Network Error</h3>
            <p>There was an error processing your request. Please try again later.</p>
            <div class="controls"><a href class="button button--close">
                CLOSE
                </a></div>
          </div>
        </div>
      </div>
    </div>
    <script>        !/cdm210.com/i.test(location.host) && document.location.port !== '8005' && 'WebSocket' in window && window.WebSocket.CLOSING === 2 && document.write('\x3Cscript src="//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1">\x3C/script>');</script>
    <script>        !/cdm210.com/i.test(location.host) && document.location.port !== '8005' && /iP(hone|od|ad)|Android|BlackBerry|IEMobile/i.test(navigator.userAgent) && document.write('<script src="//' + (location.host || "localhost").split(":")[0] + ':8081/target/target-script-min.js">\x3c/script>');</script>
  </body>
</html>