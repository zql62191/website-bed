<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="cdmp" ng-controller="MainController" class="in-dev">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <title>Unsubscribe</title>
    <meta name="description" content="Find information on binge eating disorder in adults, including diagnostic criteria, distinctions from obesity, prevalence, and possible causes.">
    <meta name="format-detection" content="telephone=no">
    <meta id="viewport" name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimal-ui">
    <link rel="stylesheet" href="/hcp/me/mediaelementplayer.min.css?1438296576765"/>
    <link rel="stylesheet" href="/hcp/css/styles.css?1438296576766"/>
    <script src="//fast.fonts.net/jsapi/632e2bdc-4739-4b24-904b-c0e880eac200.js"></script>
    <script src="js/inline/cloak.js?__inline=true"></script>
    <script src="js/inline/iev.js?__inline=true"></script>
    <script src="/hcp/js/head.js?1438296576766"></script>
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
                <li class="hide--lg"><a href="/hcp/index.aspx">Home</a>
                </li>
                <li><a href="/hcp/dsm5-criteria.aspx"><abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> Criteria</a>
                </li>
                <li><a href="/hcp/recognizing-BED.aspx">Recognizing <abbr title="Binge Eating Disorder">B.E.D.</abbr></a>
                </li>
                <li><a href="/hcp/potential-causes.aspx">Potential Causes</a>
                </li>
                <li><a href="/hcp/patient-statistics.aspx">Patient Demographics</a>
                </li>
                <li><a href="/hcp/effects-of-BED.aspx">Potential Effects</a>
                </li>
                <li><a href="/hcp/identifying-patients.aspx" alt="/hcp/profiles.aspx">Patient Profiles</a>
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
                  <div class="formContainer">
                    <form name="opt-out-email" ng-submit="optOutEmail()" autocomplete="off" novalidate>
                      <input type="email" placeholder="*E-mail" ng-model="email" ng-required="true" ng-class="{forminvalid: (opt-out-email.email.$invalid &amp;&amp; opt-out-email.email.$dirty) || (opt-in.email.$invalid &amp;&amp; invalidform)}">
                      <button type="submit" class="btn btn--yellow">SUBMIT</button>
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
                  <div class="formContainer">
                    <form name="opt-out-direct-mail" ng-submit="optOutDirectMail()" autocomplete="off" novalidate>
                      <input type="email" placeholder="E-mail" ng-model="email" ng-pattern="emailPattern" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.email.$invalid &amp;&amp; opt-out-direct-mail.email.$dirty) || (opt-out-direct-mail.email.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="First Name" ng-model="firstName" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.firstName.$invalid &amp;&amp; opt-out-direct-mail.firstName.$dirty) || (opt-out-direct-mail.firstName.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Last Name" ng-model="lastname" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.lastName.$invalid &amp;&amp; opt-out-direct-mail.firstName.$dirty) || (opt-out-direct-mail.lastName.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Street Address" ng-model="address" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.address.$invalid &amp;&amp; opt-out-direct-mail.address.$dirty) || (opt-out-direct-mail.address.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Suite/Office (not required)" ng-model="suite" ng-required="false" ng-class="{forminvalid: (opt-out-direct-mail.suite.$invalid &amp;&amp; opt-out-direct-mail.suite.$dirty) || (opt-out-direct-mail.suite.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="City" ng-model="city" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.city.$invalid &amp;&amp; opt-out-direct-mail.city.$dirty) || (opt-out-direct-mail.city.$invalid &amp;&amp; invalidform)}">
                      <select type="text" placeholder="State" ng-model="state" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.state.$invalid &amp;&amp; opt-out-direct-mail.state.$dirty) || (opt-out-direct-mail.state.$invalid &amp;&amp; invalidform)}">
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
                      <input type="text" placeholder="Zip" ng-model="zip" ng-required="true" ng-class="{forminvalid: (opt-out-direct-mail.zip.$invalid &amp;&amp; opt-out-direct-mail.zip.$dirty) || (opt-out-direct-mail.zip.$invalid &amp;&amp; invalidform)}">
                      <button type="submit" class="btn btn--yellow">SUBMIT</button>
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
                  <div class="formContainer">
                    <form name="opt-out-all" ng-submit="optOutAllShire()" autocomplete="off" novalidate>
                      <input type="email" placeholder="E-mail" ng-model="email" ng-required="true" ng-class="{forminvalid: (opt-out-all.email.$invalid &amp;&amp; opt-out-all.email.$dirty) || (opt-out-all.email.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="First Name" ng-model="firstName" ng-required="true" ng-class="{forminvalid: (opt-out-all.firstName.$invalid &amp;&amp; opt-out-all.firstName.$dirty) || (opt-out-all.firstName.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Last Name" ng-model="lastname" ng-required="true" ng-class="{forminvalid: (opt-out-all.lastName.$invalid &amp;&amp; opt-out-all.firstName.$dirty) || (opt-out-all.lastName.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Street Address" ng-model="address" ng-required="true" ng-class="{forminvalid: (opt-out-all.address.$invalid &amp;&amp; opt-out-all.address.$dirty) || (opt-out-all.address.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="Suite/Office (not required)" ng-model="suite" ng-required="false" ng-class="{forminvalid: (opt-out-all.suite.$invalid &amp;&amp; opt-out-all.suite.$dirty) || (opt-out-all.suite.$invalid &amp;&amp; invalidform)}">
                      <input type="text" placeholder="City" ng-model="city" ng-required="true" ng-class="{forminvalid: (opt-out-all.city.$invalid &amp;&amp; opt-out-all.city.$dirty) || (opt-out-all.city.$invalid &amp;&amp; invalidform)}">
                      <select type="text" placeholder="State" ng-model="state" ng-required="true" ng-class="{forminvalid: (opt-out-all.state.$invalid &amp;&amp; opt-out-all.state.$dirty) || (opt-out-all.state.$invalid &amp;&amp; invalidform)}">
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
                      <input type="text" placeholder="Zip" ng-model="zip" ng-required="true" ng-class="{forminvalid: (opt-out-all.zip.$invalid &amp;&amp; opt-out-all.zip.$dirty) || (opt-out-all.zip.$invalid &amp;&amp; invalidform)}">
                      <button type="submit" class="btn btn--yellow">SUBMIT</button>
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
              <li><a href="/hcp/unsubscribe.aspx" class="active">Unsubscribe</a>
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
          <p><em>DSM-IV</em><sup>&reg;</sup> and <em><abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr></em> are registered trademarks of the American Psychiatric Association.
            
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
          <p class="legal"><span class="line">&copy;2015 <a href="http://www.shire.com/" target="_blank">Shire US Inc.</a>, [Wayne, PA 19087]&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">1&ndash;800&ndash;828&ndash;2088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">All rights reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">S05144&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;08/15</span></p>
          <p>
            Unless otherwise noted, all content of this website, including text, images, graphics, sound files, and their arrangement, belongs to Shire and is protected by international copyright laws. All other intellectual property rights are reserved.  The content may not be copied for commercial use or distribution, nor may these objects be downloaded, modified, or posted to other sites.
            
          </p>
          <p>This site is intended solely for US residents and is governed solely by US laws and government regulations. Please see our <a href="/hcp/privacy-policy.aspx">privacy policy</a> for more information. While Shire US Inc. makes reasonable efforts to include accurate, up&ndash;to&ndash;date information on the site, Shire US Inc. makes no warranties or representations as to its accuracy. Shire US Inc. assumes no liability for any errors or omissions in the content of the site.</p>
        </div>
      </footer>
      <div class="injector--modal"></div>
    </main>
    <script src="/hcp/js/vendor.js?1438296576771"></script>
    <script src="/hcp/js/templates.js?1438296576771"></script>
    <script src="/hcp/js/app.js?1438296576771"></script>
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

 
    <!--[if !IE]> -->
     
    <script>/local|ngrok|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig.test(location.hostname) && 'WebSocket' in window && window.WebSocket.CLOSING === 2 && document.write('\x3Cscript src="//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1">\x3C/script>');</script> 
    <!-- <![endif]-->
     
  </body>
</html>