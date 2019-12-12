$(function () {

    const $message = $('#logOutMessage');


    $('#signout').on('click', SignOut);

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
            window.location.href = "../index.html";
        }, 1500);
    }

});