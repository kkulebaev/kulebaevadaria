$(function () {
    /* Fixed Header 
    ================*/
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
        if (scrollPos > introH / 2) {
            header.addClass('fixed')
        } else {
            header.removeClass('fixed')
        }
    }

    /* Smooth scroll 
    ==================*/
    $('[data-scroll]').on('click', function (event) {
        event.preventDefault()

        let elementId = $(this).data('scroll')
        let elementOffset = $(elementId).offset().top

        $('html, body').animate(
            {
                scrollTop: elementOffset,
            },
            1000
        )

        $(burger).toggleClass('burger--active')
        $(nav).toggleClass('nav--active')
    })

    /* SVG-icon animations 
    =======================*/
    new Vivus('instagramIconHeader', { duration: 200 })
    new Vivus('telegramIconHeader', { duration: 200 })
    new Vivus('vkIconHeader', { duration: 200 })
    new Vivus('instagramIcon', { duration: 200 })
    new Vivus('telegramIcon', { duration: 200 })
    new Vivus('vkIcon', { duration: 200 })

    /* Animation sections 
    ======================*/
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 100, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1500, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    })

    /* Modal windows / Sweet Alert 
    ===============================*/
    let form = document.querySelector('form')
    form.addEventListener('submit', function (formResponse) {
        formResponse.preventDefault()
        let data = new FormData(this) // Сборка формы
        let url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: data,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Ошибка сервера')
                }
            })
            .then((json) => {
                Swal.fire('Сообщение отправлено!', 'Я отвечу Вам в ближайшее время', 'success')
            })
            .catch((error) => {
                Swal.fire('Уупс...', 'Что-то пошло не так! Попробуйте еще раз', 'error')
            })
    })

    /* Burger menu 
    ========================*/
    let nav = document.querySelector('#nav')
    let burger = document.querySelector('#burger')

    $(burger).on('click', function (event) {
        event.preventDefault()
        $(burger).toggleClass('burger--active')
        $(nav).toggleClass('nav--active')
    })

    /* Modal windows 
    ========================*/
    const modalCall = $('[data-modal')
    const modalClose = $('[data-close')

    modalCall.on('click', function (event) {
        event.preventDefault()

        let $this = $(this)
        let modalId = $this.data('modal')

        $(modalId).addClass('show')
        $('body').addClass('no-scroll')

        setTimeout(function () {
            $(modalId).find('.modal__window').css({
                transform: 'scale(1)',
            })
        }, 200)
    })

    modalClose.on('click', function (event) {
        event.preventDefault()

        let $this = $(this)
        let modalParent = $this.parents('.modal')

        modalParent.find('.modal__window').css({
            transform: 'scale(0)',
        })

        setTimeout(function () {
            modalParent.removeClass('show')
            $('body').removeClass('no-scroll')
        }, 200)
    })

    $('.modal').on('click', function (event) {
        let $this = $(this)

        $this.find('.modal__window').css({
            transform: 'scale(0)',
        })

        setTimeout(function () {
            $this.removeClass('show')
            $('body').removeClass('no-scroll')
        }, 200)
    })

    $('.modal__window').on('click', function (event) {
        event.stopPropagation()
    })
})
