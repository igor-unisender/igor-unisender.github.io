$(document).ready(function () {
    function setSplitTestCookie(variant, cookieName, page, startDate) {
        var analyticsCookie;
        if (getCookie('_uni_ab_tests')) {
            analyticsCookie = JSON.parse(getCookie('_uni_ab_tests'));
            analyticsCookie['new_homepage_design'] = {
                'page': page,
                'start_date': startDate,
                'variant': variant
            };
        } else {
            analyticsCookie = {
                'new_homepage_design': {
                    'page': page,
                    'start_date': startDate,
                    'variant': variant
                }
            };
        }

        var date = new Date();
        date.setDate(date.getDate() + 360);
        document.cookie = '_uni_ab_tests' + "=" + JSON.stringify(analyticsCookie) + ";domain=.unisender.com;path=/;expires=" + date;
    }

    function handlePageLoading() {
        var variant = getCookie('_uni_split_puEHIVp0TVaP7ebk09WypQ');

        if (!variant) return;

        setSplitTestCookie(variant, 'new_homepage_design', 'homepage', '20200717');
        setTimeout(function () {
            if (typeof ga !== 'undefined') {
                ga("set", "exp", 'puEHIVp0TVaP7ebk09WypQ.' + variant);
                ga("send", "pageview");
            } else {
                setTimeout(function () {
                    ga("set", "exp", 'puEHIVp0TVaP7ebk09WypQ.' + variant);
                    ga("send", "pageview");
                }, 5000);
            }
        }, 5000);
    }

    handlePageLoading();
})