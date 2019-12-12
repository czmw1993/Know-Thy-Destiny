

$(function () {

    const $loginForm = $('#loginForm');
    const $signupForm = $('#signupForm');

    const $signUpMessage = $('#signUpMessage');
    const $loginMessage = $('#loginMessage');
    

    $('.signUpButton').on('click', SignUp);

    $('.signInButton').on('click', SignIn);




    function SignUp(event) {
        event.preventDefault();

        let username = $('#username').val();
        let password = $('#password').val();
        let country = $('#country').val();
        let birthday = $('#birthday').val();

        axios.post('http://localhost:3000/account/create',{
          name: username,
          pass: password, 
          data: {
            country: country,
            birthdate: birthday
          },
        })
        .then(response => {
            if(response.status === 200){
                console.log(response)
                console.log(response.data)

                $signUpMessage.html('<span class="has-text-success">Success! You are now signed up!</span>');

            }
        }).catch(error => {
            $signUpMessage.html('<span class="has-text-danger">Something went wrong and you cannot sign up. Check your input and your internet connection.</span>');
            console.log(error.response)

        });
    }
    
    function SignIn(event) {
        event.preventDefault();

        let username = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/login', {
            name: username,
            pass: password

        }).then(response => {
            console.log(response.status);
            if(response.status === 200) {
                localStorage.setItem('jwt', response.data.jwt);
                $loginMessage.html('<span class="has-text-success">Success! You are now logged in!</span>');
                axios.get('http://localhost:3000/account/status', {
                    headers: {
                        "Authorization": "Bearer " + response.data.jwt
                    },
                }).then(response => console.log(response))
                  .catch(error => console.log(error.response))
                  setTimeout(() => {
                    window.location.href = "userPage.html";
                  }, 3000);
            }
        }).catch(error => {
            console.log(error.response);
            $signInMessage.html('<span class="has-text-danger">Something went wrong and you cannot log in. Check your input and your internet connection.</span>');
            setTimeout(() => {
                window.location.href = "login.html";
            }, 6000);
            
        })
    }

});