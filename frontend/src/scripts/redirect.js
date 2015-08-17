//This is for link conversion from old BED 2.0 links such that they forward users to the right BED 3.0 pages

function pageLoading() {
    var reqPageWithParams = window.location.hash,
        whitelist = ['#kimberly', '#nikki', '#julie', '#diego', '#downloads'];

    var concatWL = whitelist.join('|'), 
        whitelistRegex = new RegExp('(?:' + concatWL.substring(0, concatWL.length) + ')$');

    if (reqPageWithParams.length == 0 || whitelistRegex.test(reqPageWithParams))
        return;

    var req = reqPageWithParams.split("?");
    var reqPage = req[0];
    var params = req[1];

    //alert(reqPage);
    //alert(params);

    var goToPage;

    switch (reqPage) {
        case "#/home":
            goToPage = "/hcp/index.aspx";
            break;

        case "#/prevalence":
            goToPage = "/hcp/patient-statistics.aspx";
            break;

        case "#/dsm-5":
            goToPage = "/hcp/dsm5-criteria.aspx";
            break;

        case "#/clinical-characteristics":
            goToPage = "/hcp/patient-statistics.aspx";
            break;

        case "#/functional-consequences":
            goToPage = "/hcp/effects-of-BED.aspx";
            break;

        case "#/potential-causes":
            goToPage = "/hcp/potential-causes.aspx";
            break;

        case "#/diagnosis":
            goToPage = "/hcp/recognizing-BED.aspx";
            break;

        case "#/starting-the-conversation":
            goToPage = "/hcp/patient-profiles.aspx";
            break;

        case "#/one-patients-story":
            goToPage = "/hcp/effects-of-BED.aspx";
            break;

        case "#/videos":
            goToPage = "/hcp/support-and-resources.aspx";
            break;

        case "#/helpful-links":
            goToPage = "/hcp/support-and-resources.aspx";
            break;

        default:
            goToPage = "/hcp/index.aspx";
            break;
    }

    if(params)
        if (params.length > 0)
            goToPage = goToPage + "?" + params;

    // alert(goToPage);
    window.location.href = goToPage;

}
