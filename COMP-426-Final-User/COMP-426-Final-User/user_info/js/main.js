(function($) {

    $('#meal_preference').parent().append('<ul class="list-item" id="newmeal_preference" name="meal_preference"></ul>');
    $('#meal_preference option').each(function() {
        $('#newmeal_preference').append('<li value="' + $(this).val() + '">' + $(this).text() + '</li>');
    });
    $('#meal_preference').remove();
    $('#newmeal_preference').attr('id', 'meal_preference');
    $('#meal_preference li').first().addClass('init');
    $("#meal_preference").on("click", ".init", function() {
        $(this).closest("#meal_preference").children('li:not(.init)').toggle();
    });

    var allOptions = $("#meal_preference").children('li:not(.init)');
    $("#meal_preference").on("click", "li:not(.init)", function() {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#meal_preference").children('.init').html($(this).html());
        allOptions.toggle();
    });

    // var marginSlider = document.getElementById('slider-margin');
    // if (marginSlider != undefined) {
    //     noUiSlider.create(marginSlider, {
    //         start: [0],
    //         step: 1,
    //         connect: [true, false],
    //         tooltips: [true],
    //         range: {
    //             'min': 0,
    //             'max': 100
    //         },
    //         format: wNumb({
    //             decimals: 0,
    //             thousand: ','

    //         })
    //     });
    // }
    $('#reset').on('click', function() {
        // $('#register-form').trigger('reset');
        $("#display_name").attr("value", "")
        $("#zodi_sign").attr("value", "")
        $("#country").attr("value", "")
        $("#email").attr("value", "")
        $("#gender").attr("value", "")
        $(".noUi-tooltip").attr("value", "")
        $("#fav-horoscope").attr("value", "")
        console.log("Reset all attrs");
    });

    $('#cancel').on('click', function() {
        // $('#register-form').trigger('reset');
        console.log("cancel");
 
        window.location.href = "../index.html"
    });

    $('#register-form').validate({
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            company: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone_number: {
                required: true,
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);