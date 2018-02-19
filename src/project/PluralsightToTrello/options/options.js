$(function () {
    $('#loginTrello').click(function (e) {
        e.preventDefault();

        var popupOptions = {
            type: "redirect",
            name: "Pluralsight to Trello",
            expiration: "1hour",
            persist: true,
            scope: {
                read: 'true',
                write: 'true' },
            success: function() { console.log("Success") },
        };

        Trello.authorize(popupOptions);
    });
});