<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="cdmp" ng-controller="MainController" class="in-dev">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <title>Sign Up</title>
    <meta name="description" content="Find information on binge eating disorder in adults, including diagnostic criteria, distinctions from obesity, prevalence, and possible causes.">
    <meta name="format-detection" content="telephone=no">
    <meta id="viewport" name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimal-ui">
    <link rel="stylesheet" href="/hcp/css/styles.css?1438265987894"/>
    <script src="//fast.fonts.net/jsapi/632e2bdc-4739-4b24-904b-c0e880eac200.js"></script>
    <script src="js/inline/cloak.js?__inline=true"></script>
    <script src="js/inline/iev.js?__inline=true"></script>
    <script src="/hcp/js/head.js?1438265987894"></script>
  </head>
  <body ontouchstart="" prime-directive="" class="sign-up">
    <main class="content--main">
      <header class="header--global">
        <div class="title-bar">
          <div class="wrap--content"><a href="/hcp/index.aspx" class="title">
              Binge eating disorder in adults
              </a>
            <div class="hcp">
              This site is intended for US health care professionals only.
              
            </div><a href="/hcp/sign-up.aspx" class="signup hide--md hide--sm active">Get the full <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> <abbr title="Binge Eating Disorder">B.E.D.</abbr> criteria</a>
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
                <li class="hide--lg"><a href="/hcp/sign-up.aspx" class="active">Get the full <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> <br><abbr title="Binge Eating Disorder">B.E.D.</abbr> criteria</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <header class="header--page">
        <div class="wrap--content">
          <h1 class="heading--1">Sign up to instantly receive the DSM-5&reg; diagnostic criteria for binge eating disorder (B.E.D.) and future B.E.D. content from Shire.</h1>
        </div>
      </header>
      <section class="section--page">
        <div class="wrap--content">
          <form name="opt-in" ng-submit="optIn()" autocomplete="off" novalidate>
            <input type="text" placeholder="First Name" ng-model="firstName" ng-required="true" ng-class="{forminvalid: (opt-in.firstName.$invalid &amp;&amp; opt-in.firstName.$dirty) || (opt-in.firstName.$invalid &amp;&amp; invalidform)}">
            <input type="text" placeholder="Last Name" ng-model="lastname" ng-required="true" ng-class="{forminvalid: (opt-in.lastName.$invalid &amp;&amp; opt-in.firstName.$dirty) || (opt-in.lastName.$invalid &amp;&amp; invalidform)}">
            <input type="email" placeholder="E-mail" ng-model="email" ng-required="true" ng-class="{forminvalid: (opt-in.email.$invalid &amp;&amp; opt-in.email.$dirty) || (opt-in.email.$invalid &amp;&amp; invalidform)}">
            <input type="email" placeholder="Confirm E-mail" ng-model="confirmemail" ng-required="true" ng-class="{forminvalid: (opt-in.confirmEmail.$invalid &amp;&amp; opt-in.confirmEmail.$dirty) || (opt-in.confirmEmail.$invalid &amp;&amp; invalidform) || ($value!=opt-in.email.value)}">
            <h2 class="heading--2">Opt In for Communications</h2>
            <p class="info">
              <input type="checkbox" value="" ng-required="true"> By checking this box and clicking SUBMIT, you certify that you are a US health care professional and you are opting to receive information about binge eating disorder plus site updates, educational information, patient support resources, and other information from Shire. You will be able to opt out of these communications at any time.
            </p>
            <p class="info">
               
              Shire respects your personal information. All information you have provided will be kept confidential and will not be used or distributed to anyone for any purpose other than what is explained in our Privacy Policy Statement. We encourage you to read our Privacy Policy Statement by clicking on this link: <a href="/hcp/privacy-policy.aspx">Review Shire Privacy Policy Statement. </a>This consent will be in effect until such time as you opt out of the program.
            </p>
            <button type="submit" class="btn btn--yellow">SUBMIT</button>
          </form>
        </div>
      </section>
      <footer class="footer--page">
        <div class="wrap--content"></div>
      </footer>
      <footer class="footer--global">
        <div class="wrap--content full--sm">
          <nav class="bottom-bump">
            <ul>
              <li><a href="/hcp/unsubscribe.aspx">Unsubscribe</a>
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
    <script src="/hcp/js/vendor.js?1438265987896"></script>
    <script src="/hcp/js/templates.js?1438265987896"></script>
    <script src="/hcp/js/app.js?1438265987896"></script>
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