<%@ Page Language="C#" AutoEventWireup="true" CodeFile="unsubscribe.aspx.cs" Inherits="unsubscribe" %><!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="cdmp" ng-controller="MainController">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <title>Unsubscribe</title>
    <meta name="description" content="Find info on binge eating disorder in adults, including diagnostic criteria, distinction from other eating disorders, prevalence, and possible causes.">
    <meta name="format-detection" content="telephone=no">
    <meta id="viewport" name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimal-ui">
    <meta name="google-site-verification" content="J54-RSNLJc8L0u3mx8m2Ie3Fb5zXiF5w1x4JQRIPBg8">
    <link rel="stylesheet" href="./css/styles.css?1440777300000"/>
    <script src="//fast.fonts.net/jsapi/632e2bdc-4739-4b24-904b-c0e880eac200.js"></script>
    <script src="js/inline/cloak.js?__inline=true"></script>
    <script src="js/inline/iev.js?__inline=true"></script>
    <script src="./js/head.js?1440777300000"></script>
    <script src="./js/redirect.js?1440777300000"></script>
<script>
    pageLoading();
</script>


  </head>
  <body ontouchstart="" prime-directive="" class="unsubscribe">
    <main class="content--main">
      <header class="header--global">
        <div class="title-bar">
          <div class="wrap--content"><a href="/hcp/index.aspx" class="title">
              Binge eating disorder in adults
              </a>
            <div class="hcp">
              This site is intended for US health care professionals only.
              
            </div><a href="/hcp/sign-up.aspx" class="signup hide--md hide--sm">Get the full <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> <abbr title="Binge Eating Disorder">B.E.D.</abbr> criteria</a>
            <div class="menu-tile hide--lg"></div>
            <div mobile-nav="" class="menu-btn hide--lg">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="primary-nav">
          <div class="wrap--content">
            <nav>
              <ul>
                <li class="hide--lg"><a href="/hcp/index.aspx">B.E.D. in Adults</a>
                </li>
                <li><a href="/hcp/dsm5-criteria.aspx"><abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> Criteria</a>
                </li>
                <li><a href="/hcp/recognizing-BED.aspx">Recognizing <abbr title="Binge Eating Disorder">B.E.D.</abbr></a>
                </li>
                <li><a href="/hcp/potential-causes.aspx">Potential Causes</a>
                </li>
                <li><a href="/hcp/patient-demographics.aspx">Patient Demographics</a>
                </li>
                <li><a href="/hcp/potential-effects.aspx">Potential Effects</a>
                </li>
                <li><a href="/hcp/patient-profiles.aspx" alt="/hcp/profiles.aspx">Patient Profiles</a>
                </li>
                <li><a href="/hcp/support-and-resources.aspx">Support &amp; Resources</a>
                </li>
                <li class="hide--lg"><a href="/hcp/sign-up.aspx">Get the full <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> <br><abbr title="Binge Eating Disorder">B.E.D.</abbr> criteria</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div class="gradient"></div>
      <header class="header--unsubscribe">
        <div class="wrap--content"></div>
      </header>
      <section class="section--unsubscribe">
        <div class="wrap--content">
          <div class="subcontainer">
            <h1 class="heading--1">Unsubscribe</h1>
            <h2 class="heading--2">To unsubscribe from future communications, please select an option below, fill in the required fields, and click SUBMIT.</h2>
            <div accordion="" accordian-query="" accordian-autoclose="true" class="accordion">
              <div class="accordion__header">
                <div class="accordion__controls">
                  <div class="icon sprite--plus is--vc"></div>
                  <div class="icon sprite--minus is--vc"></div>
                  <div class="icon sprite--question--white is--vc"></div>
                  <div class="icon sprite--question--blue is--vc"></div>
                </div>
                <div class="accordion-title">I would like to opt out of future <abbr title="Binge Eating Disorder">B.E.D.</abbr> e-mail communications
                  <div class="arrow closed"></div>
                </div>
              </div>
              <div class="accordion__wrap">
                <div class="accordion__content">
                  <div ng-controller="emailController" class="formContainer">
                    <form name="optOutEmail" autocomplete="off" novalidate show-errors="{showSuccess:true}" ng-submit="submitForm()" class="emailForm">
                      <input type="email" id="Email" name="email" placeholder="E-mail" ng-model="optOutEmail.Email" required ng-class="{forminvalid: (optOutEmail.email.$invalid &amp;&amp; optOutEmail.email.$dirty &amp;&amp; submitted) || (optOutEmail.email.$invalid &amp;&amp; optOutEmail.email.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)" class="form-control">
                      <p ng-if="submitted &amp;&amp; (optOutEmail.email.$error.email || optOutEmail.email.$error.required)" class="help-block spe">Please enter e-mail address</p>
                      <button type="button" ng-click="submitForm(); optOutEmailForm()" class="btn btn--yellow">SUBMIT</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div accordion="" accordian-query="" accordian-autoclose="true" class="accordion">
              <div class="accordion__header">
                <div class="accordion__controls">
                  <div class="icon sprite--plus is--vc"></div>
                  <div class="icon sprite--minus is--vc"></div>
                  <div class="icon sprite--question--white is--vc"></div>
                  <div class="icon sprite--question--blue is--vc"></div>
                </div>
                <div class="accordion-title">I would like to opt out of future <abbr title="Binge Eating Disorder">B.E.D.</abbr> direct mail communications
                  <div class="arrow closed"></div>
                </div>
              </div>
              <div class="accordion__wrap">
                <div class="accordion__content">
                  <div ng-controller="directmailController" class="formContainer">
                    <form name="optoutdirectmail" autocomplete="off" novalidate show-errors="{showSuccess:true}" ng-submit="submitForm()" class="directMail form-group">
                      <input type="email" id="Email" name="email" placeholder="E-mail" ng-model="optoutdirectmail.Email" required ng-class="{forminvalid: (optoutdirectmail.email.$invalid &amp;&amp; optoutdirectmail.email.$dirty &amp;&amp; submitted) || (optoutdirectmail.email.$invalid &amp;&amp; optoutdirectmail.email.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)" class="form-control">
                      <p ng-if="submitted &amp;&amp; (optoutdirectmail.email.$error.email || optoutdirectmail.email.$error.required)" class="help-block">Please enter a vaild email address</p>
                      <input type="text" id="FName" name="firstName" placeholder="First Name" ng-model="optoutdirectmail.FName" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.firstName.$invalid &amp;&amp; optoutdirectmail.firstName.$dirty &amp;&amp; submitted) || (optoutdirectmail.firstName.$invalid &amp;&amp; optoutdirectmail.firstName.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optoutdirectmail.firstName.$error.required" class="help-block"></p>
                      <input type="text" id="LName" name="lastName" placeholder="Last Name" ng-model="optoutdirectmail.LName" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.lastName.$invalid &amp;&amp; optoutdirectmail.firstName.$dirty &amp;&amp; submitted) || (optoutdirectmail.lastName.$invalid &amp;&amp; optoutdirectmail.lastName.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optoutdirectmail.lastName.$error.required" class="help-block"></p>
                      <input type="text" id="Address1" name="address" placeholder="Street Address" ng-model="optoutdirectmail.Address1" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.address.$invalid &amp;&amp; optoutdirectmail.address.$dirty &amp;&amp; submitted) || (optoutdirectmail.address.$invalid &amp;&amp; optoutdirectmail.address.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optoutdirectmail.address.$error.required" class="help-block"></p>
                      <input type="text" id="Address2" name="suite" placeholder="Suite/Office (not required)" ng-model="optoutdirectmail.Address2" ng-required="false" ng-class="{forminvalid: (optoutdirectmail.suite.$invalid &amp;&amp; optoutdirectmail.suite.$dirty &amp;&amp; submitted) || (optoutdirectmail.suite.$invalid &amp;&amp; invalidform &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <input type="text" id="City" name="city" placeholder="City" ng-model="optoutdirectmail.City" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.city.$invalid &amp;&amp; optoutdirectmail.city.$dirty &amp;&amp; submitted) || (optoutdirectmail.city.$invalid &amp;&amp; optoutdirectmail.city.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optoutdirectmail.city.$error.required" class="help-block"></p>
                      <select type="text" id="State" name="state" placeholder="State" ng-model="optoutdirectmail.State" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.state.$invalid &amp;&amp; optoutdirectmail.state.$dirty &amp;&amp; submitted) || (optoutdirectmail.state.$invalid &amp;&amp; optoutdirectmail.state.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                              <option value="">State</option>
                              <option value="AL">AL</option>
                              <option value="AK">AK</option>
                              <option value="AZ">AZ</option>
                              <option value="AR">AR</option>
                              <option value="CA">CA</option>
                              <option value="CO">CO</option>
                              <option value="CT">CT</option>
                              <option value="DC">DC</option>
                              <option value="DE">DE</option>
                              <option value="FL">FL</option>
                              <option value="GA">GA</option>
                              <option value="HI">HI</option>
                              <option value="ID">ID</option>
                              <option value="IL">IL</option>
                              <option value="IN">IN</option>
                              <option value="IA">IA</option>
                              <option value="KS">KS</option>
                              <option value="KY">KY</option>
                              <option value="LA">LA</option>
                              <option value="ME">ME</option>
                              <option value="MD">MD</option>
                              <option value="MA">MA</option>
                              <option value="MI">MI</option>
                              <option value="MN">MN</option>
                              <option value="MS">MS</option>
                              <option value="MO">MO</option>
                              <option value="MT">MT</option>
                              <option value="NE">NE</option>
                              <option value="NV">NV</option>
                              <option value="NH">NH</option>
                              <option value="NJ">NJ</option>
                              <option value="NM">NM</option>
                              <option value="NY">NY</option>
                              <option value="NC">NC</option>
                              <option value="ND">ND</option>
                              <option value="OH">OH</option>
                              <option value="OK">OK</option>
                              <option value="OR">OR</option>
                              <option value="PA">PA</option>
                              <option value="PR">PR</option>
                              <option value="RI">RI</option>
                              <option value="SC">SC</option>
                              <option value="SD">SD</option>
                              <option value="TN">TN</option>
                              <option value="TX">TX</option>
                              <option value="UT">UT</option>
                              <option value="VT">VT</option>
                              <option value="VA">VA</option>
                              <option value="WA">WA</option>
                              <option value="WV">WV</option>
                              <option value="WI">WI</option>
                              <option value="WY">WY</option>
                      </select>
                      <input type="text" id="Zip" name="zip" placeholder="Zip" ng-model="optoutdirectmail.Zip" ng-required="true" ng-class="{forminvalid: (optoutdirectmail.$invalid &amp;&amp; optoutdirectmail.zip.$dirty &amp;&amp; submitted) || (optoutdirectmail.zip.$invalid &amp;&amp; optoutdirectmail.zip.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optoutdirectmail.zip.$error.required" class="help-block"></p>
                      <button type="submit" ng-click="submitForm(); optoutdirectmailForm()" class="btn btn--yellow">SUBMIT</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div accordion="" accordian-query="" accordian-autoclose="true" class="accordion">
              <div class="accordion__header">
                <div class="accordion__controls">
                  <div class="icon sprite--plus is--vc"></div>
                  <div class="icon sprite--minus is--vc"></div>
                  <div class="icon sprite--question--white is--vc"></div>
                  <div class="icon sprite--question--blue is--vc"></div>
                </div>
                <div class="accordion-title">I would like to opt out of all future Shire communications
                  <div class="arrow closed"></div>
                </div>
              </div>
              <div class="accordion__wrap">
                <div class="accordion__content">
                  <div ng-controller="allmailController" class="formContainer">
                    <form name="optinall" autocomplete="off" novalidate show-errors="{showSuccess:true}" ng-submit="submitForm()" class="form-group">
                      <input type="email" id="Email" name="email" placeholder="E-mail" ng-model="optinall.Email" required ng-class="{forminvalid: (optinall.email.$invalid &amp;&amp; optinall.email.$dirty &amp;&amp; submitted) || (optinall.email.$invalid &amp;&amp; optinall.email.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)" class="form-control">
                      <p ng-if="submitted &amp;&amp; (optinall.email.$error.email || optinall.email.$error.required)" class="help-block">Please enter a vaild email address</p>
                      <input type="text" id="FName" name="firstName" placeholder="First Name" ng-model="optinall.FName" ng-required="true" ng-class="{forminvalid: (optinall.firstName.$invalid &amp;&amp; optinall.firstName.$dirty &amp;&amp; submitted) || (optinall.firstName.$invalid &amp;&amp; optinall.firstName.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optinall.firstName.$error.required" class="help-block"></p>
                      <input type="text" id="LName" name="lastName" placeholder="Last Name" ng-model="optinall.LName" ng-required="true" ng-class="{forminvalid: (optinall.lastName.$invalid &amp;&amp; optinall.firstName.$dirty &amp;&amp; submitted) || (optinall.lastName.$invalid &amp;&amp; optinall.lastName.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optinall.lastName.$error.required" class="help-block"></p>
                      <input type="text" id="Address1" name="address" placeholder="Street Address" ng-model="optinall.Address1" ng-required="true" ng-class="{forminvalid: (optinall.address.$invalid &amp;&amp; optinall.address.$dirty &amp;&amp; submitted) || (optinall.address.$invalid &amp;&amp; optinall.addresss.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optinall.address.$error.required" class="help-block"></p>
                      <input type="text" id="Address2" name="suite" placeholder="Suite/Office (not required)" ng-model="optinall.Address2" ng-required="false" ng-class="{forminvalid: (optinall.suite.$invalid &amp;&amp; optinall.suite.$dirty &amp;&amp; submitted) || (optinall.suite.$invalid &amp;&amp; invalidform &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <input type="text" id="City" name="city" placeholder="City" ng-model="optinall.City" ng-required="true" ng-class="{forminvalid: (optinall.city.$invalid &amp;&amp; optinall.city.$dirty &amp;&amp; submitted) || (optinall.city.$invalid &amp;&amp; optinall.city.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <div ng-if="submitted &amp;&amp; optinall.city.$error.required" class="help-block"></div>
                      <select type="text" id="State" name="state" placeholder="State" ng-model="optinall.State" ng-required="true" ng-class="{forminvalid: (optinall.state.$invalid &amp;&amp; optinall.state.$dirty &amp;&amp; submitted) || (optinall.state.$invalid &amp;&amp; optinall.state.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                              <option value="">State</option>
                              <option value="AL">AL</option>
                              <option value="AK">AK</option>
                              <option value="AZ">AZ</option>
                              <option value="AR">AR</option>
                              <option value="CA">CA</option>
                              <option value="CO">CO</option>
                              <option value="CT">CT</option>
                              <option value="DC">DC</option>
                              <option value="DE">DE</option>
                              <option value="FL">FL</option>
                              <option value="GA">GA</option>
                              <option value="HI">HI</option>
                              <option value="ID">ID</option>
                              <option value="IL">IL</option>
                              <option value="IN">IN</option>
                              <option value="IA">IA</option>
                              <option value="KS">KS</option>
                              <option value="KY">KY</option>
                              <option value="LA">LA</option>
                              <option value="ME">ME</option>
                              <option value="MD">MD</option>
                              <option value="MA">MA</option>
                              <option value="MI">MI</option>
                              <option value="MN">MN</option>
                              <option value="MS">MS</option>
                              <option value="MO">MO</option>
                              <option value="MT">MT</option>
                              <option value="NE">NE</option>
                              <option value="NV">NV</option>
                              <option value="NH">NH</option>
                              <option value="NJ">NJ</option>
                              <option value="NM">NM</option>
                              <option value="NY">NY</option>
                              <option value="NC">NC</option>
                              <option value="ND">ND</option>
                              <option value="OH">OH</option>
                              <option value="OK">OK</option>
                              <option value="OR">OR</option>
                              <option value="PA">PA</option>
                              <option value="PR">PR</option>
                              <option value="RI">RI</option>
                              <option value="SC">SC</option>
                              <option value="SD">SD</option>
                              <option value="TN">TN</option>
                              <option value="TX">TX</option>
                              <option value="UT">UT</option>
                              <option value="VT">VT</option>
                              <option value="VA">VA</option>
                              <option value="WA">WA</option>
                              <option value="WV">WV</option>
                              <option value="WI">WI</option>
                              <option value="WY">WY</option>
                      </select>
                      <input type="text" id="Zip" name="zip" placeholder="Zip" ng-model="optinall.Zip" ng-required="true" ng-class="{forminvalid: (optinall.zip.$invalid &amp;&amp; optinall.zip.$dirty &amp;&amp; submitted) || (optinall.zip.$invalid &amp;&amp; optinall.zip.$pristine &amp;&amp; submitted)}" ng-blur="syncFields($event)">
                      <p ng-if="submitted &amp;&amp; optinall.zip.$error.required" class="help-block"></p>
                      <button type="submit" ng-click="submitForm(); optinallForm()" class="btn btn--yellow">SUBMIT</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer--unsubscribe">
        <div class="wrap--content"></div>
      </footer>
      <footer class="footer--global">
        <div class="wrap--content full--sm">
          <nav class="bottom-bump">
            <ul>
              <li><a href="/hcp/unsubscribe/index.aspx" class="active">Unsubscribe</a>
              </li>
              <li><a href="/hcp/contact-us.aspx">Contact Us</a>
              </li>
              <li><a href="/hcp/privacy-policy.aspx">Privacy Policy</a>
              </li>
              <li><a href="http://www.shire.com/" target="_blank">
                  Shire US
                  </a></li>
            </ul>
          </nav>
        </div>
        <div class="wrap--content last">
          <p><em>DSM-IV-Text Revision</em><sup>&reg;</sup> and <em><abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr></em> are registered trademarks of the American Psychiatric Association.
            
          </p>
          <p class="bottom-bump"><a href="http://www.shire.com/" target="_blank">
              <picture><!--[if IE 9]><video style="display: none;"><![endif]-->
                <source media="only screen and (max-width: 640px) and (-webkit-min-device-pixel-ratio: 2)" srcset="img/smr/shire-logo.png 2x"/>
                <source media="only screen and (max-width: 640px)" srcset="img/sm/shire-logo.png 1x"/>
                <source media="only screen and (min-width: 641px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)" srcset="img/mdr/shire-logo.png 2x"/>
                <source media="only screen and (min-width: 641px) and (max-width: 1024px)" srcset="img/md/shire-logo.png 1x"/>
                <source media="only screen and (min-width: 1025px) and (-webkit-min-device-pixel-ratio: 2)" srcset="img/lgr/shire-logo.png 2x"/>
                <source media="only screen and (min-width: 1025px)" srcset="img/lg/shire-logo.png 1x"/><!--[if IE 9]></video><![endif]--><img srcset="img/lg/shire-logo.png" alt="Shire"/>
              </picture></a></p>
          <p class="legal"><span class="line">&copy;2015 <a href="http://www.shire.com/" target="_blank">Shire US Inc.</a>, [Waltham, MA 02451]&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">1&ndash;800&ndash;828&ndash;2088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">All rights reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">S05144&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;08/15</span></p>
          <p>
            Unless otherwise noted, all content of this website, including text, images, graphics, sound files, and their arrangement, belongs to Shire and is protected by international copyright laws. All other intellectual property rights are reserved.  The content may not be copied for commercial use or distribution, nor may these objects be downloaded, modified, or posted to other sites.
            
          </p>
          <p>This site is intended solely for US residents and is governed solely by US laws and government regulations. Please see our <a href="/hcp/privacy-policy.aspx">privacy policy</a> for more information. While Shire US Inc. makes reasonable efforts to include accurate, up&ndash;to&ndash;date information on the site, Shire US Inc. makes no warranties or representations as to its accuracy. Shire US Inc. assumes no liability for any errors or omissions in the content of the site.</p>
        </div>
      </footer>
      <div class="injector--modal"></div>
    </main>
    <script src="./js/vendor.js?1440777300000"></script>
    <script src="./js/templates.js?1440777300000"></script>
    <script src="./js/app.js?1440777300000"></script>
<script type="text/javascript">
  (function () {
    var tagjs = document.createElement("script");
    var s = document.getElementsByTagName("script")[0];
    tagjs.async = true;
    tagjs.src = "//s.btstatic.com/tag.js#site=BYgLeqO";
    s.parentNode.insertBefore(tagjs, s);
  }());
</script>
<noscript>
  <iframe src="//s.thebrighttag.com/iframe?c=BYgLeqO" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
</noscript>


  </body>
</html>