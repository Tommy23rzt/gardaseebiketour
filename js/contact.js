$(function () {

    // init the validator (js/validator.min.js)
    $('#contact-form').validator();

    function showAlert(type, message) {
        var alertBox = '<div class="alert alert-' + type + ' alert-dismissable">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            message + '</div>';
        $('#contact-form').find('.messages').html(alertBox);
    }

    // endpoint AJAX di FormSubmit: nessun PHP, compatibile con GitHub Pages
    var formEndpoint = 'https://formsubmit.co/ajax/gardaseebiketour@gmail.com';

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (e.isDefaultPrevented()) {
            return false;
        }

        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('[type="submit"]').prop('disabled', true);

        $.ajax({
            type: "POST",
            url: formEndpoint,
            data: $form.serialize(),
            dataType: "json"
        }).done(function (data) {
            var ok = String(data.success) === 'true';
            showAlert(ok ? 'success' : 'danger', data.message || (ok ? 'Messaggio inviato, grazie!' : 'Errore durante l\'invio. Riprova piu tardi.'));
            if (ok) {
                $form[0].reset();
                $form.removeData('bootstrap.validator');
            }
        }).fail(function () {
            showAlert('danger', 'There was an error while submitting the form. Please try again later');
        }).always(function () {
            $btn.prop('disabled', false);
        });

        return false;
    });
});
