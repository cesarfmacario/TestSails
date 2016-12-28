/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    mainpage: function(req, res) {
        if (!req.isAuthenticated) return res.render('main/mainpage', 
            { title: 'Sails', user: null })
        return res.render('main/mainpage', 
            { title: 'Sails', user: req.user})
    }
};

