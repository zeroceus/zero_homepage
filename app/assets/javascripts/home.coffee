$(document).on 'turbolinks:load', ->
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on "click", ->
    if location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
      target = $(this.hash)
      unless target.length
        target = $('[name=' + this.hash.slice(1) + ']')
      if target.length
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "swing")
        return false

  $('.js-scroll-trigger').on "click", ->
    $('.navbar-collapse').collapse('hide')

  $('body').scrollspy
    target: '#mainNav'
