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

            var formData = $form.serializeArray();
            var hasSubject = false;

            $.each(formData, function(_, field) {
                hasSubject = hasSubject || field.name === "_subject";
            });

            if (!hasSubject) {
                formData.push({ name: "_subject", value: "Website contact form" });
            }

            $.ajax({
                url: contactEndpoint || $form.attr("action") || "https://formspree.io/contact@noriade.com",
                type: "POST",
                data: formData,
                cache: false,
                success: function() {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').append($('<button>', {
                        type: 'button', class: 'close', 'data-dismiss': 'alert',
                        'aria-hidden': 'true', text: '×'
                    }));
                    $('#success > .alert-success').append($('<strong>').text(successMessage));
                    $('#contactForm').trigger("reset");
                    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
                        var analyticsEvent = window.document.createEvent("Event");
                        analyticsEvent.initEvent("noriade:contact-success", false, false);
                        window.dispatchEvent(analyticsEvent);
                    }
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').append($('<button>', {
                        type: 'button', class: 'close', 'data-dismiss': 'alert',
                        'aria-hidden': 'true', text: '×'
                    }));
                    $('#success > .alert-danger').append($('<strong>').text(errorMessage));
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
