var myElement = document.querySelector("header"),
    headroom  = new Headroom(myElement);

headroom.init();

// Обработка аккордионов
var accordions = document.querySelectorAll(".accordion-wrapper");

accordions.forEach(function (item, i) {
    var acc = item.querySelectorAll(".accordion");

    acc.forEach(function (item, i, array) {
        item.addEventListener("click", function () {
            var panel = this.nextElementSibling,
                wasOpened = this.classList.contains('open');

            acc.forEach(function (item, i) {
                item.nextElementSibling.style.display = "none";
                item.classList.add('close');
                item.classList.remove('open');
                item.classList.remove("active");
            });

            if (!wasOpened) {
                panel.style.display = "block";
                this.classList.add('open');
                this.classList.add("active");
                this.classList.remove('close');
            }
        });
    });
});



/**
 * Поиск существующих cookie
 * @param name
 * @returns {string}
 */
function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
}


/**
 * Устанавливаем куки
 *
 * @param cookieName
 * @param time
 * @param param
 */
function setCookie(cookieName, time, param) {
    if (param === undefined) param = false;

    var date = new Date(),
        domain = '.' + window.location.host;

    date.setDate(date.getDate() + time);
    document.cookie = cookieName + "=" + param + ";path=/;domain=" + domain + ";expires=" + date;
}





$(document).ready(function () {
    // Обработка попапов на уход со страницы
    var $popupWrapper = $("#uni-leave-popup"),
        $popupForm = $("#uni-leave-popup-form"),
        $closeBtn = $('.uni-leave-close');

    /**
     * @param variant
     */
    function setAnalyticsCpCookie(variant) {
        var analyticsCookie = null;
        if (getCookie('_uni_ab_tests')) {
            analyticsCookie = JSON.parse(getCookie('_uni_ab_tests'));
            analyticsCookie['popup_base_strategy'] = {
                'page': 'allNewPages',
                'start_date': '20200123',
                'variant': 'main'
            };
        } else {
            analyticsCookie = {
                'popup_base_strategy': {
                    'page': 'allNewPages',
                    'start_date': '20200123',
                    'variant': 'main'
                }
            };
        }

        var date = new Date();
        date.setDate(date.getDate() + 360);
        document.cookie = '_uni_ab_tests' + "=" + JSON.stringify(analyticsCookie) + ";domain=.unisender.com;path=/;expires=" + date;
    }

    // Обработка отображения попапов
    $(document).mouseleave(function () {
        if (getCookie('__uni_leave_popup') !== '1') {
            $popupWrapper.css('display', 'flex');
            setAnalyticsCpCookie(1);
        }
    });

    // Закрытие попапа
    $closeBtn.on('click', function (event) {
        event.preventDefault();
        $popupWrapper.hide();
        setCookie('__uni_leave_popup', 30, 1);
    });

    // Регистрация
    $popupForm.on("submit", function (event) {
        setCookie('__uni_leave_popup', 30, 1);
        var $email = $(this).find("input[type=email]").val(),
            $nonce = $(this).find("input[name=nonce]").val(),
            body = 'action=leavepopover&email=' + $email + '&_wpnonce=' + $nonce;

        $.post('/wp-admin/admin-ajax.php', body)
            .done(function () {
                window.location.replace("https://cp.unisender.com/ru/v5/registration/step/2?&target=createAccount" + "&email=" + window.btoa($email));
            });

        event.preventDefault();
    });

    $('footer .footer__list ul li a').wrap( "<div class='link-wrapper'></div>" );
    $('footer .mobile-footer >.row').each(function() {
        var heading = $(this).find('.footer__list .heading').text();
        $(this).find(".accordion").text(heading);
        $(this).find('.footer__list .heading').hide();
    });

    /**
     *
     * Split Test unisender.com VS new.unisender.com
     *
     */
    function setSplitTestCookie(variant, cookieName, page, startDate) {
        var analyticsCookie;
        if (getCookie('_uni_ab_tests')) {
            analyticsCookie = JSON.parse(getCookie('_uni_ab_tests'));
            analyticsCookie['new_design'] = {
                'page': page,
                'start_date': startDate,
                'variant': variant
            };
        } else {
            analyticsCookie = {
                'new_design': {
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
        var variant = getCookie('_uni_split_6qhC356LQK21TJYXDH4iJQ'),
            country = getCookie('_uni_user_country');

        if (country !== 'ru') return;

        setSplitTestCookie(variant, 'new_design', 'all_pages', '20200514');

        setTimeout(function () {
            if (typeof ga !== 'undefined') {
                ga("set", "exp", '6qhC356LQK21TJYXDH4iJQ.' + variant);
                ga("send", "pageview");
            } else {
                setTimeout(function () {
                    ga("set", "exp", '6qhC356LQK21TJYXDH4iJQ.' + variant);
                    ga("send", "pageview");
                }, 5000);
            }
        }, 5000);

    }

    handlePageLoading();
});

$('footer .footer__list ul li a').wrap( "<div class='link-wrapper'></div>" );
$('footer .mobile-footer >.row').each(function() {
    var heading = $(this).find('.footer__list .heading').text();
    $(this).find(".accordion").text(heading);
    $(this).find('.footer__list .heading').hide();
});

$('.desctop-footer .language_tab.language_tab_active').click(function () {
    $('.desctop-footer .language_tab:not(.language_tab_active)').stop().slideToggle();
});
if($('.desctop-footer .language_tab:first-child').hasClass('language_tab_active')) {
    $('.desctop-footer .language_tab:first-child').css('margin', "0");
    $('.desctop-footer .language_tab:nth-child(2)').css('margin-top', "26px");
}
if ($('header .language-toggle').length < 1) {
    $('header .right').css("padding", "0");
}
$('header .language_tab.language_tab_active').click(function () {
    $('header .language_tab:not(.language_tab_active)').stop().slideToggle();
    $('header .language-toggle').toggleClass('active');
});
if($('header .language_tab:first-child').hasClass('language_tab_active')) {
    $('header .language_tab:first-child').css('margin', "0");
    $('header .language_tab:nth-child(2)').css('margin-top', "26px");
}

$( "header .menu nav ul li a" ).hover(
  function() {
    if ($(this).next('ul').length > 0) {
        $('.breadcrumbs_section').css("z-index", "0");
    }
  }
);
$('body').on('mouseover', function() {
    if (!$('header').hasClass('submenu-visible')) {
        $('.breadcrumbs_section').css("z-index", "15");
    }   
});



//Cookies Popup
$('.cookie_popup .btn-close').click(function() {
  $('.cookie_popup').fadeOut();
  $('.leaveCookiePopup').fadeIn().css('display','flex');
  $('body').css('overflow', 'hidden');
});

$('.leaveCookiePopup_content .btn-agree').click(function() { 
    setCookie('cookiePopup', 365, 1);
    $('.leaveCookiePopup').fadeOut();
    $('body').css('overflow', 'auto');
});
$('.cookie_popup .btn-agree').click(function() {
    setCookie('cookiePopup', 365, 1);
    $('.cookie_popup').slideUp();
});