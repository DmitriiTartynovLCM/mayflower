import focusTrapping from "../helpers/focusTrapping.js";
export default (function (window, document, $, undefined) {


  $('.ma__organization-navigation').each(function () {
    // Toggle classname
    const classMainNavOpen = "menu-open";
    const classSubNavOpen = "item-open";

    // Org Nav Wrapper.
    const $orgNav = $(this);
    const $menuWrapper = $orgNav.find('.ma__organization-navigation--inner-wrapper');
    const $orgNavItems = $orgNav.find('.ma__organization-navigation__items');

    // Page wrapper and fillers.
    const $pageWrapper = $orgNav.parent().next();
    let $newsLink = $pageWrapper.find('.ma__press-listing');
    let $eventsLink = $pageWrapper.find('.ma__event-listing');
    let $locationsLink = $pageWrapper.find('.ma__mapped-locations');
    let $relatedOrgs = $pageWrapper.find('.ma__our-organizations');

    const feedbackButton = $('body').find('.ma__fixed-feedback-button');

    $orgNav.find('svg').each(function () {
      $(this).attr('focusable', 'false');
    });

    // Mobile Menu vars.
    const $mobileToggle = $orgNav.find('.ma__organization-navigation__mobile-toggle');
    const mobileBreak = 910;

    // Search Wrapper vars.
    const $orgNavSearch = $orgNav.find('.ma__organization-navigation__search');
    const $orgNavSearchForm = $orgNav.find('.js-organization-navigation__search');
    const $orgNavSearchInput = $orgNav.find('#organization-navigation-search');
    const $searchToggle = $orgNav.find('.ma__organization-navigation__search .js-search-toggle');

    // Subnav buttons.
    let $menuButton = $orgNav.find('.subnav-toggle');

    // I want to section.
    let $sectionIWantTo= $orgNav.find('.ma__org-nav-i-want-to-section');
    let $sectionButton = $sectionIWantTo.find('.ma__comp-heading--mobile > button');

    // Sticky on scroll.
    const bannerBottom = $('.ma__page-banner').offset().top + $('.ma__page-banner').height();
    const menuHeight = $orgNav.height();

    function stickyOnScroll() {
      const orgWindowTop = $(window).scrollTop();

      // Active Sticky TOC when on page TOC scrolls past.
      if (bannerBottom > orgWindowTop) {
        $('.pre-content').removeAttr('style');
        $orgNav.removeClass('stuck');
      }
      else {
        $('.pre-content').css('padding-top', menuHeight);
        $orgNav.addClass('stuck');
      }
    }

    if ($('.pre-content').length) {
      $(window).scroll(function () {
        stickyOnScroll();
      });
    }

    // Mobile toggle.
    function mobileToggleClick() {

      if (!$orgNav.hasClass('stuck')) {
        $orgNav.addClass('stuck');
      }

      $mobileToggle.add($menuWrapper).toggleClass(classMainNavOpen);
      // Close items when closing menu.
      $('.classSubNavOpen').removeClass(classSubNavOpen);
      // Remove cloned button if present.
      $('.section-toggle').remove();

      // Lock body scroll on mobile open/close.
      $('body').toggleClass('scroll-disabled');

      feedbackButton.toggle();

      if($mobileToggle.hasClass(classMainNavOpen)) {
        $orgNavSearch.prependTo($menuWrapper);
      } else {
        $orgNavSearch.appendTo($menuWrapper);
      stickyOnScroll();

      }
    }

      // Keyboard focus trapping.
      $(document).keydown(function(e) {
        // check if main menu open
        if ($mobileToggle.hasClass(classMainNavOpen)) {
          const $subNavOpen = $orgNavItems.find(`.${classSubNavOpen}`)
          const hasSubNavOpen = $subNavOpen.length > 0;
          if (hasSubNavOpen) {
            focusTrapping({
              focusableSelectors: '.ma__organization-navigation__mobile-toggle, .ma__organization-navigation__item.item-open button, .ma__organization-navigation__item.item-open a',
              modalSelector: '.ma__organization-navigation',
              keyEvent: e
            });
          } else {
            focusTrapping({
              focusableSelectors: '.ma__organization-navigation__mobile-toggle, button.ma__organization-navigation__search--toggle, .ma__organization-navigation__items > li > button, .ma__organization-navigation__items > li > a',
              modalSelector: '.ma__organization-navigation',
              keyEvent: e
            });
          }
        }

      });


    // Capture click, spacebar and enter keys.
    $mobileToggle.keypress(function(keyboardEvent) {
      if (keyboardEvent.code == "Enter" || keyboardEvent.code == "Space") {
        mobileToggleClick();
      }
    });

    $mobileToggle.on('click', function () {
      mobileToggleClick();
    });

    // Search form swing open/closed.
    $searchToggle.on('click', function () {
      $menuWrapper.toggleClass('form-open');

      let $buttonLabel = $searchToggle.find('.search-label');
      $buttonLabel.text($buttonLabel.text() == "Close" ? "Search this organization" : "Close");
    });

    $orgNavSearchForm.on('submit', function () {
      let searchAction = $(this).attr('action') + "&q=";
      let searchParams = $orgNavSearchInput.val();
      $(this).attr('action', searchAction + searchParams);
    });

    // Open the dropdowns.
    $menuButton.each(function () {
      let $button = $(this);
      let $buttonParent = $button.parent('.has-subnav');
      let $thisMenu = $buttonParent.find('.ma__organization-navigation__subitems');
      let $otherMenus = $('.ma__organization-navigation__subitems').not($thisMenu);
      let menuHeight = $menuWrapper.outerHeight();

      $buttonParent.on('mouseenter mouseleave', function () {
        let windowWidth = $(window).width();

        if (windowWidth > mobileBreak) {
          $('.section-toggle').remove();
          $buttonParent.toggleClass(classSubNavOpen);
          $thisMenu.css('top', menuHeight);
        }
        else {
          return false;
        };
      });

      // $button.on('focus', function () {
      //   $thisMenu.find("a[href]").attr("tabindex", -1);
      //   $otherMenus.find("a[href]").attr("tabindex", -1);

      //   $button.keyup(function (e) {

      //     $('.classSubNavOpen').removeClass(classSubNavOpen);

      //     if (e.keyCode == 13 || e.keyCode == 32) {
      //       $('.section-toggle').remove();

      //       $thisMenu.find("a[href]").attr("tabindex", 0);
      //       $buttonParent.toggleClass(classSubNavOpen);
      //       $thisMenu.css('top', menuHeight);

      //       $buttonParent.add($thisMenu).on('mouseenter mouseleave', function () {
      //         return false;
      //       });
      //     }
      //   });
      // });

      $button.on('click', function () {
        let windowWidth = $(window).width();

        if (windowWidth < mobileBreak) {
          $buttonParent.toggleClass(classSubNavOpen);
          let $buttonClone = $button.clone(true);

          // Copy the link as a close button inside the menu section.
          if (!$('.section-toggle').length) {
            $buttonClone.addClass('section-toggle').prependTo($thisMenu);
          }
        }
        else {
          return false;
        };
      });

    });

    $('body').on('click', '.section-toggle', function () {
      $('.section-toggle').remove();
    });

    // Mobile view open the "I want to sections".
    $sectionButton.each(function () {

      let $button = $(this);
      $button.on('click', function () {
        let windowWidth = $(window).width();
        if (windowWidth < mobileBreak) {
          const $heading = $button.parent();
          const $wrapper = $heading.parent();
          $heading.toggleClass(classSubNavOpen);
          $wrapper.find('.ma__link-list__container').toggleClass(classSubNavOpen);
          $wrapper.find('.ma__link-list__see-all').toggleClass(classSubNavOpen);
        }
      });

    });

    if ($relatedOrgs.length) {
      $relatedOrgs.attr('id', 'organizations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#organizations">Our organizations</a></li>');
    }

    if ($newsLink.length) {
      $newsLink.attr('id', 'news');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#news">News</a></li>');
    }

    if ($eventsLink.length) {
      $eventsLink.attr('id', 'events');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#events">Events</a></li>');
    }

    if ($locationsLink.length) {
      $locationsLink.attr('id', 'locations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#locations">Locations</a></li>');
    }

    $('.ma__organization-navigation__item.mobileLogin').appendTo($orgNavItems);

    $(".internal-link").on('focus', function (e) {
      $('.classSubNavOpen').removeClass(classSubNavOpen);
    });

    $(".internal-link").on('click', function (e) {
      // Close open menus and reset markup.
      $(`.${classMainNavOpen}`).removeClass(classMainNavOpen);
      $(`.${classSubNavOpen}`).removeClass(classSubNavOpen);
      $('.form-open').removeClass('form-open');
      $('.section-toggle').remove();

      e.preventDefault();
      let location = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(location).offset().top - 120 }, 1000);

      if (feedbackButton.is(":hidden")) {
        feedbackButton.show();
      }
    });

    $(window).on("resize", function () {
      let windowWidth = $(window).width();
      let $contactGroups = $orgNav.find('.ma__org-nav-contact-us .ma__contact-group');

      if (windowWidth > mobileBreak) {
        // Check if already wrapped.
        if ($('.wrappedGroup').length === 0) {

          if (!$('.ma__contact-group__seeAll').length) {
            // If no 'see all link', wrap address separately.
            $('.ma__contact-group:first-child').addClass('wrappedGroup');
            $contactGroups = $contactGroups.not(':first');
          }
          else {
            $contactGroups.slice(0, 2).wrapAll("<div class='wrappedGroup' />");
            $contactGroups = $contactGroups.slice(2);
          }

          if ($contactGroups.length < 3) {
            $contactGroups.wrap("<div class='wrappedGroup' />");
          }
          else {
            // Wrap contact groups in sets of 2 for layout.
            for (let i = 0; i < $contactGroups.length; i += 2) {
              $contactGroups.slice(i, i + 2).wrapAll("<div class='wrappedGroup' />");
            }
          }
        }
      }
      else {
        $('.wrappedGroup').find($contactGroups).unwrap();
        $('body').removeClass('scroll-disabled');
      }

    }).resize();
  });
})(window, document, jQuery);
