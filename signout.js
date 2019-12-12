$(function() {

    const $message = $('.cd-main-nav__item--logout');


    $('.cd-main-nav__item--logout').on('click', SignOut);
    console.log(localStorage)
    let jwt = localStorage.getItem('jwt');

    function returnUserPage(event) {
        event.preventDefault();
        window.location.href = "userPage.html";
    }

    function SignOut(event) {
        event.preventDefault();
        localStorage.removeItem('jwt');
        $message.html('<span class="has-text-danger">Successfully logged out.</span>');
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);
    }

});