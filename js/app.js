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

    /* ScrollSpy 
    ==================*/
    const navLinks = $('.nav__link')
    const section = $('[data-section-spy]')
    const headerH = $('header').innerHeight()

    $(window).on('scroll reload', function () {
        section.each(function () {
            const self = $(this)
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200) {
                navLinks.removeClass('nav__link--active')
                $('#nav__link--contacts').addClass('nav__link--active')
            } else if (self.offset().top < scrollPos + headerH && scrollPos + headerH < self.offset().top + self.outerHeight()) {
                let targetId = '#nav__link--' + self.attr('class')
                navLinks.removeClass('nav__link--active')
                $(targetId).addClass('nav__link--active')
            }
        })
    })

    /* Animation sections 
    ======================*/
    AOS.init({
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 100,
        delay: 0,
        duration: 1500,
        easing: 'ease',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
    })

    /* Modal windows / Sweet Alert 
    ===============================*/
    const form = document.querySelector('#form')
    $('#form').submit(function (event) {
        event.preventDefault()

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
                form.reset()
            })
            .catch((error) => {
                Swal.fire('Уупс...', 'Что-то пошло не так! Попробуйте еще раз', 'error')
            })
    })

    /* PHPMailer / Sweet Alert */

    // // Отправка данных на сервер
    // function send(event, php) {
    //     console.log('Отправка запроса')
    //     event.preventDefault ? event.preventDefault() : (event.returnValue = false)
    //     var req = new XMLHttpRequest()
    //     req.open('POST', php, true)
    //     req.onload = function () {
    //         if (req.status >= 200 && req.status < 400) {
    //             json = JSON.parse(this.response) // Ебанный internet explorer 11
    //             console.log(json)

    //             // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
    //             if (json.result == 'success') {
    //                 Swal.fire('Сообщение отправлено!', 'Я отвечу Вам в ближайшее время', 'success')
    //                 form.reset()
    //             } else {
    //                 // Если произошла ошибка
    //                 Swal.fire('Уупс...', 'Что-то пошло не так! Попробуйте еще раз', 'error')
    //             }
    //             // Если не удалось связаться с php файлом
    //         } else {
    //             alert('Ошибка сервера. Номер: ' + req.status)
    //         }
    //     }

    //     // Если не удалось отправить запрос. Стоит блок на хостинге
    //     req.onerror = function () {
    //         alert('Ошибка отправки запроса')
    //     }
    //     req.send(new FormData(event.target))
    // }

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
