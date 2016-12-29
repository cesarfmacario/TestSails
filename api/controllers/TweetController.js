/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	mainpage: function(req, res) {
        if (!req.isAuthenticated) return res.render('tweet/index', { title: 'SailsTwitter', user: null });
        return res.render('tweet/index', { title: 'SailsTwitter', user: req.user});
    }
};

