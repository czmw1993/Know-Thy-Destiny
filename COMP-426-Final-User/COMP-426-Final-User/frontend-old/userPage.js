$(function () {

    const $message = $('#message');

    $('.logOutButton').on('click', SignOut);
    $('.profileButton').on('click', moveProfile);


    function SignOut(event) {
        event.preventDefault();
        localStorage.removeItem('jwt');
        $message.html('<span class="has-text-danger">Successfully logged out.</span>');
        setTimeout(() => {
            window.location.href = "login.html";
        }, 5000);
    }

    function moveProfile(event) {
        event.preventDefault();
        window.location.href = "profile.html";
    }



});