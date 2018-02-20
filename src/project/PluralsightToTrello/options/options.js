$(function () {
    $('#logOut').click(function (e) {
        e.preventDefault();
        Trello.deauthorize();
    });

    var popupOptions = {
        type: "redirect",
        name: "Pluralsight to Trello",
        expiration: "never",
        persist: true,
        scope: {
            read: 'true',
            write: 'true' },
        success: function() { console.log(Trello.token()) },
    };

    Trello.authorize(popupOptions);
});