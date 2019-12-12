$(function () {

    const $message = $('#logOutMessage');

    $('.deleteButton').on('click', DeleteAccount);
    $('.returnUserPageButton').on('click', returnUserPage);
    $('.logOutButton').on('click', SignOut);

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
            window.location.href = "login.html";
        }, 1500);
    }

    function DeleteAccount(event) {
        event.preventDefault();
        let username = $('.username').val();
        console.log(username);
        axios.get('http://localhost:3000/account/status', {
            headers: {
                "Authorization": "Bearer " + jwt
            },
        }).then(response => {
            let name = response.data.user.name;
            console.log('response');
            axios.delete('http://localhost:3000/account/'+ name)
            .then(response => {
                console.log(response);
            })
        }).catch(error => console.log(error.response))

    }


    function RenderAccountInfo() {
        let jwt= window.localStorage.getItem('jwt');
        axios.get('http://localhost:3000/account/status', {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    },
                }).then(response => {
                    let name = response.data.user.name;
                    let country = response.data.user.data.country;
                    let birthdate = response.data.user.data.birthdate;
                    $('#root').html(`<p class="username"> Username: ${name} </p> 
                        <br> <p> Birth Date: ${birthdate} </p>
                        <br> <p> Country: ${country} </p>
                        <p> <button type="submit" class="button is-danger deleteButton">Delete Your Account</button></p> 
                        <br>
                        <p> <button type="submit" class="button is-primary updateButton">Update Your Info</button></p> 
                        `);

                }).catch(error => console.log(error.response))
       
    }

    RenderAccountInfo()

});