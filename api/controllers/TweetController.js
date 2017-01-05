/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
        res.redirect("/api/tweet");
    },
    readTweets: function (req, res) {
        Tweet.find(function foundTweets (err, tweets) {
            if(err) return res.send(err);
            if(!tweets) return res.send(404); 
            res.send(tweets);
        });
    },
    readTweet: function (req, res) {
        if(!req.param('id')) return res.send('id is required')
        Tweet.findOne({ id: req.param('id') }, function foundTweet (err, tweet) {
            if(err) return res.send(err);
            if(!tweet) return res.send(404);
            res.send(tweet);
        });
    },
    create: function(req, res) {
        Tweet.create(req.params.all(), function tweetCreated(err, tweet) {
            if (err) return res.send(err);
            sails.io.sockets.emit('tweetCreated', { data: true });
            return res.send('success');
        });
    },

};

