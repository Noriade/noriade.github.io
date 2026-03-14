$(function() {
    var contactEndpoint = window.NORIADE_CONTACT_ENDPOINT || "";
    var contactMessages = window.NORIADE_CONTACT_MESSAGES || {};
    var successMessage = contactMessages.success || "Your message has been sent.";
    var errorMessage = contactMessages.error || "Sorry, it seems that my mail server is not responding. Please try again later!";

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault();

            $.ajax({
                url: contactEndpoint || "https://formspree.io/contact@noriade.com",
                type: "POST",
                data: {
                    name: $("input#name").val(),
                    _replyto: $("input#email").val(),
                    _subject: "Website contact form",
                    message: $("textarea#message").val()
                },
                cache: false,
                success: function() {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success').append("<strong>" + successMessage + "</strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>" + errorMessage + "</strong>");
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
            });
        },

        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on the name field hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
