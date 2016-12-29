/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function (req, res) {
        User.find(function foundUser (err, users) {
            if(err) return res.redirect('/user/new');
            res.view({
                users: users
            });
        });
    },
    login: function (req, res) {
        return res.login({
            successRedirect: '/'
        });
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },
    create: function(req, res) {
        var params = req.params.all();
        params.isAdmin = false;
        console.log(params);
        User.create(params, function userCreated(err, user) {
            if (err) return res.negotiate(err);
            return res.redirect('/user');
        });
    },
    edit: function (req, res) {
        if(req.method == 'GET') {
            if(!req.param('id')) return res.render(404);
            User.findOne({ id: req.param('id') }, function(err, user) {
                if(err) return res.json({ err: err }, 500);
                if(!user) return res.render(404);            
                return res.view({
                    user: user
                });
            });
        } else if(req.method == 'POST') {
            User.update({ id: req.param('id') }, req.params.all(), function userUpdated(err, user) {
                if(err) return res.negotiate(err);
                if(!user) return res.negotiate('no User');
                return res.redirect('/user')
            });
        }
    },
    destroy: function (req, res) {
        User.destroy({ id: req.param('id') }, function userDestroyed(err, user) {
            if(err) return res.send({ err:err }, 500);
            if(!user) return res.send({ user: user }, 404)
            return res.redirect('/user')
        });
    }
};

