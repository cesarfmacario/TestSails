'use strict'
var $ = require('jquery')

var headerHeight = $('.header').innerHeight();
$('.body-container').css('padding-top', headerHeight+'px');