var $ = require("jquery")

var headerHeight = $('.header').innerHeight();
$('.content').css('padding-top', headerHeight+'px');

io.socket.on('userEdit', function onUserEditted(response) {
    console.log(response);
});
