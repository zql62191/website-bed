<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profiles.aspx.cs" Inherits="profiles" %><!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" id="ng-app" ng-app="cdmp" ng-controller="MainController">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <title>Helping Adults with Binge Eating Disorder</title>
    <meta name="description" content="Find information on binge eating disorder in adults, including diagnostic criteria, distinctions from obesity, prevalence, and possible causes.">
    <meta name="format-detection" content="telephone=no">
    <meta id="viewport" name="viewport" content="target-densitydpi=device-dpi, width=device-width, user-scalable=0, minimal-ui">
    <link rel="stylesheet" href="./me/mediaelementplayer.min.css?1438721700000"/>
    <link rel="stylesheet" href="./css/styles.css?1438721700000"/>
    <script src="//fast.fonts.net/jsapi/632e2bdc-4739-4b24-904b-c0e880eac200.js"></script>
    <script>
!function(){document.documentElement.className+=" ng-cloak"}();
</script>
    <script>
!function(e){if(window.__ie=null,/msie|trident/i.test(e)){for(var t=function(){var t=e.match(/(?:msie |rv:)(\d+(\.\d+)?)/i),n=t&&t.length>1&&t[1]||"";return parseInt(n,10)}(),n="ie",i=6,s=12,u=["eq-ie"],r=i;s>=r;r++)t>r?u.push("gt-"+n+r):r>t?u.push("lt-"+n+r):t===r&&(u.push("lte-"+n+r),u.push("eq-"+n+r),u.push("gte-"+n+r));window.__ie=t,document.documentElement.className+=" "+u.join(" ")}}(navigator.userAgent||"");
</script>
    <script src="./js/head.js?1438721700000"></script>
  </head>
  <body ontouchstart="" prime-directive="" class="profiles">
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
                <li><a href="/hcp/identifying-patients.aspx" alt="/hcp/profiles.aspx" class="active">Patient Profiles</a>
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
      <div id="gradient-transition-bottom"></div>
      <section ng-controller="ProfilesController as ProfCtrl" class="section--carousel">
        <div class="wrap--content">
          <div class="carousel">
            <div class="slides">
              <div ng-class="{active: currentSlide == 'kimberly'}" class="slide kimberly">
                <picture class="hero"><!--[if IE 9]><video style="display: none;"><![endif]-->
                  <source media="only screen and (max-width: 640px)" srcset="img/sm/profiles/kimberly.png"/>
                  <source media="only screen and (min-width: 641px) and (max-width: 1024px)" srcset="img/md/profiles/kimberly.png"/>
                  <source media="only screen and (min-width: 1025px)" srcset="img/lg/profiles/kimberly.png"/><!--[if IE 9]></video><![endif]--><img srcset="img/lg/profiles/kimberly.png"/>
                </picture>
                <div class="shadow"></div>
                <blockquote>
                  <p>
                    I feel like I&rsquo;ve lost control while I&rsquo;m eating.
                    
                    
                  </p>
                </blockquote>
                <div class="profile">
                  <div class="name">Kimberly</div>
                  <div class="binge">Average of 4 binge-eating episodes per week</div>
                  <div class="text-line">
                    <div class="age">Age: 34</div>
                    <div class="bmi">Body mass index (BMI): 29</div>
                  </div>
                  <div class="text-line">
                    <div class="stat">Kimberly works as a high school librarian</div>
                    <div class="stat">She is single and lives alone</div>
                    <div class="stat">Kimberly&rsquo;s binges are usually the <br>result of boredom</div>
                  </div>
                  <p class="disclaimer">Diagnosis should be based on a complete evaluation of the patient that confirms the criteria for <abbr title="Binge Eating Disorder">B.E.D.</abbr> established in <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr>.<sup>1</sup></p>
                </div>
              </div>
              <div ng-class="{active : currentSlide == 'nikki'}" class="slide nikki">
                <picture class="hero"><!--[if IE 9]><video style="display: none;"><![endif]-->
                  <source media="only screen and (max-width: 640px)" srcset="img/sm/profiles/nikki.png"/>
                  <source media="only screen and (min-width: 641px) and (max-width: 1024px)" srcset="img/md/profiles/nikki.png"/>
                  <source media="only screen and (min-width: 1025px)" srcset="img/lg/profiles/nikki.png"/><!--[if IE 9]></video><![endif]--><img srcset="img/lg/profiles/nikki.png"/>
                </picture>
                <blockquote>
                  <p>
                    I&rsquo;m disgusted with myself after I binge.
                    
                  </p>
                </blockquote>
                <div class="profile">
                  <div class="name">Nikki</div>
                  <div class="binge">Average of 5 binge-eating episodes per week</div>
                  <div class="text-line">
                    <div class="age">Age: 27</div>
                    <div class="bmi">Body mass index (BMI): 28</div>
                  </div>
                  <div class="text-line">
                    <div class="stat">Nikki is a pediatric oncology nurse</div>
                    <div class="stat">Her binges are triggered by interpersonal stressors</div>
                    <div class="stat">
                      Nikki is distressed by her bingeing behavior
                      
                    </div>
                  </div>
                  <p class="disclaimer">Diagnosis should be based on a complete evaluation of the patient that confirms the criteria for <abbr title="Binge Eating Disorder">B.E.D.</abbr> established in <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr>.<sup>1</sup></p>
                </div>
              </div>
              <div ng-class="{active : currentSlide == 'julie'}" class="slide julie">
                <picture class="hero"><!--[if IE 9]><video style="display: none;"><![endif]-->
                  <source media="only screen and (max-width: 640px)" srcset="img/sm/profiles/julie.png"/>
                  <source media="only screen and (min-width: 641px) and (max-width: 1024px)" srcset="img/md/profiles/julie.png"/>
                  <source media="only screen and (min-width: 1025px)" srcset="img/lg/profiles/julie.png"/><!--[if IE 9]></video><![endif]--><img srcset="img/lg/profiles/julie.png"/>
                </picture>
                <blockquote>
                  <p>
                    When the binges are over, I feel guilty about my behavior.
                    
                  </p>
                </blockquote>
                <div class="profile">
                  <div class="name">Julie</div>
                  <div class="binge">Average of 6 binge-eating episodes per week</div>
                  <div class="text-line">
                    <div class="age">Age: 42</div>
                    <div class="bmi">Body mass index (BMI): 35</div>
                  </div>
                  <div class="text-line">
                    <div class="stat">Julie works as an advertising executive</div>
                    <div class="stat">Her binges are triggered by negative feelings about her body shape</div>
                    <div class="stat">
                      Julie has a coexisting psychiatric disorder—she struggles with anxiety
                      
                    </div>
                  </div>
                  <p class="disclaimer">Diagnosis should be based on a complete evaluation of the patient that confirms the criteria for <abbr title="Binge Eating Disorder">B.E.D.</abbr> established in <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr>.<sup>1</sup></p>
                </div>
              </div>
              <div ng-class="{active : currentSlide == 'diego'}" class="slide diego">
                <picture class="hero"><!--[if IE 9]><video style="display: none;"><![endif]-->
                  <source media="only screen and (max-width: 640px)" srcset="img/sm/profiles/diego.png"/>
                  <source media="only screen and (min-width: 641px) and (max-width: 1024px)" srcset="img/md/profiles/diego.png"/>
                  <source media="only screen and (min-width: 1025px)" srcset="img/lg/profiles/diego.png"/><!--[if IE 9]></video><![endif]--><img srcset="img/lg/profiles/diego.png"/>
                </picture>
                <div class="shadow"></div>
                <blockquote>
                  <p>I binge alone because I don&rsquo;t want anyone<br><span>to know how much I eat.</span></p>
                </blockquote>
                <div class="profile">
                  <div class="name">Diego</div>
                  <div class="binge">Average of 8 binge-eating episodes per week</div>
                  <div class="text-line">
                    <div class="age">Age: 30</div>
                    <div class="bmi">Body mass index (BMI): 32</div>
                  </div>
                  <div class="text-line">
                    <div class="stat">Diego works at night to support his family</div>
                    <div class="stat">
                      Following his binges, Diego tends to feel depressed
                      
                    </div>
                  </div>
                  <p class="disclaimer">Diagnosis should be based on a complete evaluation of the patient that confirms the criteria for <abbr title="Binge Eating Disorder">B.E.D.</abbr> established in <abbr title="Fifth Edition of the Diagnostic and Statistical Manual of Mental Disorders"><em>DSM-5</em><sup>&reg;</sup></abbr>.<sup>1</sup>
                    
                  </p>
                </div>
              </div>
            </div>
            <div class="controls">
              <div ng-click="clickControls('L')" class="prev"></div>
              <div ng-click="clickControls('R')" class="next"></div>
            </div>
            <ul class="pagination">
              <li ng-click="changeHero('kimberly')" class="kimberly">kimberly<span class="liner"></span></li>
              <li ng-click="changeHero('nikki')" class="nikki">nikki<span class="liner"></span></li>
              <li ng-click="changeHero('julie')" class="julie">julie<span class="liner"></span></li>
              <li ng-click="changeHero('diego')" class="diego">diego</li>
            </ul>
          </div>
          <p class="section-disclaimer-sm">
            Models and descriptions are fictional representations of how some adults with <abbr title="Binge Eating Disorder">B.E.D.</abbr> may present and do not constitute the totality of <abbr title="Binge Eating Disorder">B.E.D.</abbr> symptoms and criteria.
            
          </p>
          <div class="callouts">
            <div class="callout one">
              <h2 class="heading--2">Screening the patient</h2>
              <p>Use this validated screener to help evaluate adult patients you suspect may have <abbr title="Binge Eating Disorder">B.E.D.</abbr></p><a href="#needurl" class="btn btn--blue">DOWNLOAD THE ADULT <abbr title="Binge Eating Disorder">B.E.D.</abbr> PATIENT SCREENER</a>
            </div>
            <div class="callout two">
              <h2 class="heading--2">Conducting a conversation</h2>
              <p>Use this discussion guide to help begin a dialogue about <abbr title="Binge Eating Disorder">B.E.D.</abbr> with your adult patients.</p><a href="#needurl" class="btn btn--blue">
                DOWNLOAD THE DISCUSSION GUIDE FOR ADULT PATIENTS WITH <abbr title="Binge Eating Disorder">B.E.D.</abbr>
                </a>
            </div>
          </div>
          <p class="section-disclaimer">These tools were developed by Shire to assist health care professionals in identifying and accurately diagnosing <abbr title="Binge Eating Disorder">B.E.D.</abbr> in adults.</p>
          <div class="wrap--refs">
            <ol class="refs number">
              <li>American Psychiatric Association. Binge-eating disorder. In: <em>Diagnostic and Statistical Manual of Mental Disorders.</em>5th ed. Arlington, VA: American Psychiatric Association; 2013:350-353</li>
            </ol>
          </div>
        </div>
      </section>
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
    <script src="./js/vendor.js?1438721700000"></script>
    <script src="./js/templates.js?1438721700000"></script>
    <script src="./js/app.js?1438721700000"></script>
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