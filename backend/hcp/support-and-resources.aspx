<%@ Page Language="C#" AutoEventWireup="true" CodeFile="support-and-resources.aspx.cs" Inherits="supportandresources" %><!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="cdmp" ng-controller="MainController">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <title>More Information on Binge Eating Disorder in Adults</title>
    <meta name="description" content="Find info on binge eating disorder in adults, including diagnostic criteria, distinction from other eating disorders, prevalence, and possible causes.">
    <meta name="format-detection" content="telephone=no">
    <meta id="viewport" name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimal-ui">
    <link rel="stylesheet" href="./css/styles.css?1440180300000"/>
    <script src="//fast.fonts.net/jsapi/632e2bdc-4739-4b24-904b-c0e880eac200.js"></script>
    <script src="js/inline/cloak.js?__inline=true"></script>
    <script src="js/inline/iev.js?__inline=true"></script>
    <script src="./js/head.js?1440180300000"></script>
    <script src="./js/redirect.js?1440180300000"></script>
<script>
    pageLoading();
</script>


  </head>
  <body ontouchstart="" prime-directive="" class="support-and-resources">
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
                <li><a href="/hcp/patient-demographics.aspx">Patient Demographics</a>
                </li>
                <li><a href="/hcp/potential-effects.aspx">Potential Effects</a>
                </li>
                <li><a href="/hcp/patient-profiles.aspx" alt="/hcp/profiles.aspx">Patient Profiles</a>
                </li>
                <li><a href="/hcp/support-and-resources.aspx" class="active">Support &amp; Resources</a>
                </li>
                <li class="hide--lg"><a href="/hcp/sign-up.aspx">Get the full <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr> <br><abbr title="Binge Eating Disorder">B.E.D.</abbr> criteria</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div ng-controller="ResourcesController as ResCtrl">
        <section class="section--video-player-title">
          <div class="wrap--content">
            <h1 class="heading--1">
              VIDEOS: Experts discuss <abbr title="Binge Eating Disorder">B.E.D.</abbr> in adults
              
            </h1>
          </div>
        </section>
        <section class="section--video-player">
          <div class="wrap--content">
            <video id="videoPlayer" controls="controls" reload="none">
              <source type="video/mp4" ng-src="{{currentVideo}}">
            </video>
          </div>
        </section>
        <section class="section--video-boxes">
          <div class="wrap--content">
            <div class="tabs">
              <div ng-repeat="tab in tabbedVideos" ng-click="changeTab($index+1)" ng-class="{ active: tab.tabclass === currentTab }" class="tab {{tab.tabclass}}">{{tab.tabtitle}}</div>
            </div>
            <div ng-click="toggleMobileDropdown()" class="mobile-dropdown">
              <div ng-repeat="tab in tabbedVideos" ng-click="changeTabMobile($index+1, $event)" ng-class="{ active: tab.tabclass === currentTab, open: mdOpen }" class="option {{tab.tabclass}}">{{tab.tabtitle}}
                <div ng-class="{ visible: tab.tabclass !== currentTab }" class="sprite--arrow-gray arrow"></div>
                <div ng-class="{ visible: tab.tabclass === currentTab }" class="sprite--arrow-yellow arrow"></div>
              </div>
            </div>
            <div class="boxes">
              <div ng-repeat="tab in tabbedVideos" ng-class="{ active: tab.tabclass === currentTab}" class="boxes-tab {{tab.tabclass}}">
                <div ng-switch on="$index % 3" class="boxes-row">
                  <div ng-repeat="vid in tab.videos" ng-click="updateVideo(vid.id)" ng-class="{ playing: vid.id === currentVideo}" class="box">
                    <div class="yellow">{{vid.title}}</div>
                    <div class="video-length">{{vid.length}}</div>
                    <div class="play-btn"></div>
                    <div class="subtitle">{{vid.featuring.length > 0 ? "Featuring " : ""}}{{vid.featuring}}</div>
                    <div ng-show="vid.newFrom" class="new"></div>
                    <div ng-show="vid.viewed" class="viewed"> </div>
                  </div>
                </div>
                <div class="consult-disclaimer">{{tab.disclaimer}}<a id="downloads" name="downloads" class="anchor"></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section class="section--shire-resources">
        <div class="wrap--content">
          <div class="box-wrap">
            <h2 class="heading--1">
              Downloadable Resources from Shire
              
            </h2>
            <div class="split-box sb-1">
              <h2 class="heading--2">A validated screener that can help in evaluating adult patients you suspect may have <abbr title="Binge Eating Disorder">B.E.D.</abbr></h2><a href="media/BingeEatingDisorder_Screener.pdf" target="_blank" class="btn btn--yellow">
                DOWNLOAD THE ADULT <abbr title="Binge Eating Disorder">B.E.D.</abbr> PATIENT SCREENER
                </a>
            </div>
            <div class="split-box sb-2">
              <h2 class="heading--2">A discussion guide to help you begin a dialogue about <abbr title="Binge Eating Disorder">B.E.D.</abbr> with your adult patients</h2><a href="media/BingeEatingDisorderDiscussionGuide.pdf" target="_blank" class="btn btn--yellow">
                DOWNLOAD THE DISCUSSION GUIDE FOR ADULT PATIENTS WITH <abbr title="Binge Eating Disorder">B.E.D.</abbr>
                </a>
            </div>
          </div>
        </div>
      </section>
      <section class="section--information">
        <div class="wrap--content">
          <h2 class="heading--1">
            If you or your adult patients would like more information about <abbr title="Binge Eating Disorder">B.E.D.</abbr>, these organizations may be able to help:
            
          </h2>
          <div class="link-box-grid hide--md">
            <div class="link-box-row">
              <div class="link-box">Alliance for Eating Disorders Awareness<br><a href="http://www.allianceforeatingdisorders.com" target="_blank" class="yellow">www.allianceforeatingdisorders.com</a><br><span class="yellow"> <a href="tel:+18666621235">1-866-662-1235</a></span></div>
              <div class="link-box">American Psychiatric Association<br><a href="http://www.psychiatry.org" target="_blank" class="yellow">www.psychiatry.org</a><br><span class="yellow"><a href="tel:+18883577924">1-888-357-7924</a></span></div>
              <div class="link-box">American Psychological Association<br><a href="http://www.apa.org" target="_blank" class="yellow">www.apa.org</a><br><span class="yellow"><a href="tel:+18003742721">1-800-374-2721</a></span></div>
            </div>
            <div class="link-box-row">
              <div class="link-box">Binge Eating Disorder Association<br><a href="http://www.bedaonline.com" target="_blank" class="yellow">bedaonline.com</a><br><span class="yellow"> <a href="tel:+18558552332">1-855-855-2332</a></span></div>
              <div class="link-box">National Alliance for Mental Illness<br><a href="http://www.nami.org" target="_blank" class="yellow">www.nami.org</a><br><span class="yellow"><a href="tel:+18009506264">1-800-950-6264        </a></span></div>
              <div class="link-box">National Eating Disorders Association<br><a href="http://www.nationaleatingdisorders.org" target="_blank" class="yellow">www.nationaleatingdisorders.org</a><br><span class="yellow"> <a href="tel:+18009312237">1-800-931-2237</a></span></div>
            </div>
          </div>
          <div class="link-boxes-tablet show--md hide--lg hide--sm">
            <div class="link-box">Alliance for Eating Disorders Awareness<br><a href="http://www.allianceforeatingdisorders.com" target="_blank" class="yellow">www.allianceforeatingdisorders.com</a><br><span class="yellow"> <a href="tel:+18666621235">1-866-662-1235</a></span></div>
            <div class="link-box">American Psychiatric Association<br><a href="http://www.psychiatry.org" target="_blank" class="yellow">www.psychiatry.org</a><br><span class="yellow"><a href="tel:+18883577924">1-888-357-7924</a></span></div>
            <div class="link-box">American Psychological Association<br><a href="http://www.apa.org" target="_blank" class="yellow">www.apa.org</a><br><span class="yellow"><a href="tel:+18003742721">1-800-374-2721</a></span></div>
            <div class="link-box">Binge Eating Disorder Association<br><a href="http://www.bedaonline.com" target="_blank" class="yellow">bedaonline.com</a><br><span class="yellow"> <a href="tel:+18558552332">1-855-855-2332</a></span></div>
            <div class="link-box">National Alliance for Mental Illness<br><a href="http://www.nami.org" target="_blank" class="yellow">www.nami.org</a><br><span class="yellow"><a href="tel:+18009506264">1-800-950-6264        </a></span></div>
            <div class="link-box">National Eating Disorders Association<br><a href="http://www.nationaleatingdisorders.org" target="_blank" class="yellow">www.nationaleatingdisorders.org</a><br><span class="yellow"> <a href="tel:+18009312237">1-800-931-2237</a></span></div>
          </div>
        </div>
      </section>
      <footer class="footer--global">
        <div class="wrap--content full--sm">
          <nav class="bottom-bump">
            <ul>
              <li><a href="/hcpUnsubscribe/index.aspx">Unsubscribe</a>
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
          <p class="legal"><span class="line">&copy;2015 <a href="http://www.shire.com/" target="_blank">Shire US Inc.</a>, [Waltham, MA 02451]&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">1&ndash;800&ndash;828&ndash;2088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">All rights reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="line">S05144&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;08/15</span></p>
          <p>
            Unless otherwise noted, all content of this website, including text, images, graphics, sound files, and their arrangement, belongs to Shire and is protected by international copyright laws. All other intellectual property rights are reserved.  The content may not be copied for commercial use or distribution, nor may these objects be downloaded, modified, or posted to other sites.
            
          </p>
          <p>This site is intended solely for US residents and is governed solely by US laws and government regulations. Please see our <a href="/hcp/privacy-policy.aspx">privacy policy</a> for more information. While Shire US Inc. makes reasonable efforts to include accurate, up&ndash;to&ndash;date information on the site, Shire US Inc. makes no warranties or representations as to its accuracy. Shire US Inc. assumes no liability for any errors or omissions in the content of the site.</p>
        </div>
      </footer>
      <div class="injector--modal"></div>
    </main>
    <script src="./js/vendor.js?1440180300000"></script>
    <script src="./js/templates.js?1440180300000"></script>
    <script src="./js/app.js?1440180300000"></script>
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