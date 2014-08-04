var BED = {

    whitelisted: [
        'www.shire.com',
        'shire.com'
    ],

    init: function() {

        BED.UI.init();

        BED.Skrollr.init();

        BED.VideoPlayer.init();

        BED.Analytics.init();

    }

};
