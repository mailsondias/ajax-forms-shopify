/*================================================
JS: Ajax form shopify
===================================================*/

function ajaxRegisterShopify(){
    $('#create_customer').submit(function(e){
        e.preventDefault();

        var data = $(this).serialize();
        var dataForm = {
            email:      $('input[name="customer[email]"]').val(),
            password:   $('input[name="customer[password]"]').val(),
            first_name: $('input[name="customer[first_name]"]').val(),
            last_name:  $('input[name="customer[last_name]"]').val()
        };

        if ( (dataForm.email != '') && (dataForm.password != '') && (dataForm.first_name != '') ) {
            if (checkEmail( dataForm.email ) == true) {

                $.post('/account', data)
                    .done(function(data){
                        var logErrors = $(data).find('.errors').text();

                        if ((logErrors != "") && (logErrors != 'undefined')){

                            showAlert(logErrors);

                        } else {
                            console.log('success');
                            document.location.href = '/checkout';
                        }
                    }).fail(function(){
                        showAlert('Error no servidor.');
                    });
                    
                    return false;
            } else {
                showAlert('E-mail inválido.');
            }
        } else {
            showAlert('Campos obrigatórios.');
        }

        return false;
    });

    function showAlert(error){
        $('#create_customer').append('<div class="error">'+error+'</div>');
        $('#create_customer .error').fadeIn('slow');
        setTimeout(function(){
            $('#create_customer .error').fadeOut('slow')
        }, 5000);
        setTimeout(function(){
            $('#create_customer .error').remove();
        }, 6000);
    }
}

function ajaxNewsletterShopify(){
    $('form.contact-form').submit(function(e){
        e.preventDefault();

        $('p.error, p.success').remove();

        var field_email = $('.mailing-list-email').val(),
            data = $(this).serialize();

        if ( (field_email != '') && (checkEmail( field_email ) === true) ) {
            $.ajax({
                type: "POST",
                url: "/contact",
                data: data,
                success: function() {
                    $('#contact_form').fadeOut();
                    $('.mailing-list-signup').find('p').fadeOut();
                    setTimeout(function(){
                        $('.mailing-list-signup').append('<p class="success" style="display: none;">Thanks for signing up!</p>');
                        $('.mailing-list-signup .success').fadeIn();
                    }, 900);
                    console.log('Thanks for signing up!');
                },
                error: function() {
                    $('.contact-form').append('<p class="success">There was an error in submitting the form.</p>');
                }
            }); 
        }
        return false;
    });
}