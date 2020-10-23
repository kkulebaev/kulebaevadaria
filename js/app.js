$(function () {
    /* Fixed Header */
    let header = $('#header')
    let intro = $('#intro')
    let introH = intro.innerHeight()
    let scrollPos = $(window).scrollTop()

    checkScroll(scrollPos, introH)

    $(window).on('scroll resize', function () {
        let introH = intro.innerHeight()
        scrollPos = $(this).scrollTop()

        checkScroll(scrollPos, introH)
    })

    function checkScroll(scrollPos, introH) {
        if (scrollPos > introH) {
            header.addClass('fixed')
        } else {
            header.removeClass('fixed')
        }
    }

    /* Smooth scroll */
    $('[data-scroll]').on('click', function (event) {
        event.preventDefault()

        let elementId = $(this).data('scroll')
        let elementOffset = $(elementId).offset().top

        console.log(elementOffset)
        $('html, body').animate(
            {
                scrollTop: elementOffset,
            },
            1000
        )
    })

    /* SVG-icon animations */
    // const instagramIcon = new Vivus('instagramIcon', {
    //     type: 'delayed',
    //     duration: 200,
    // })
    // const telegramIcon = new Vivus('telegramIcon', {
    //     type: 'delayed',
    //     duration: 200,
    // })
    // const vkIcon = new Vivus('vkIcon', {
    //     type: 'delayed',
    //     duration: 200,
    // })
    new Vivus('instagramIconHeader', { duration: 200 })
    new Vivus('telegramIconHeader', { duration: 200 })
    new Vivus('vkIconHeader', { duration: 200 })
    new Vivus('instagramIcon', { duration: 200 })
    new Vivus('telegramIcon', { duration: 200 })
    new Vivus('vkIcon', { duration: 200 })
})
