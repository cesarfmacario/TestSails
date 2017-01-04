/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res) {
        res.redirect("/api/user");
    },
    readUsers: function (req, res) {
        User.find(function foundUser (err, users) {
            if(err) return res.send(err);
            if(!users) return res.send(404);
            res.send(users);
        });
    },
    readUser: function (req, res) {
        if(!req.param('username')) return res.send('username is required')
        User.findOne({ username: req.param('username') }, function foundUser (err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404);
            res.send(user);
        });
    },
    create: function(req, res) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) return res.send(err);
            return res.send('success');
        });
    },
    edit: function (req, res) {
        if(!req.param('username')) return res.send('username is required');
        User.update({ username: req.param('username') }, req.params.all(), function userUpdated(err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404);
            return res.send('success')
        });
    },
    destroy: function (req, res) {
        if(!req.param('username')) return res.send('username is required');
        User.destroy({ username: req.param('username') }, function userDestroyed(err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404)
            return res.send('success')
        });
    }

    /*,
    login: function (req, res) {
        return res.login({
            successRedirect: '/'
        });
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },*/
};

