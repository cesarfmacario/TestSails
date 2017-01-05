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
        User.find(function foundUsers (err, users) {
            if(err) return res.send(err);
            if(!users) return res.send(404);
            res.send(users);
        });
    },
    readUser: function (req, res) {
        if(!req.param('id')) return res.send('id is required')
        User.findOne({ id: req.param('id') }, function foundUser (err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404);
            res.send(user);
        });
    },
    create: function(req, res) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) return res.send(err);
            sails.io.sockets.emit('userCreated', { data: true });
            return res.send('success');
        });
    },
    edit: function (req, res) {
        if(!req.param('id')) return res.send('id is required');
        User.update({ id: req.param('id') }, req.params.all(), function userUpdated(err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404);
            sails.io.sockets.emit('userEditted', { data: true });
            return res.send('success')
        });
    },
    destroy: function (req, res) {
        if(!req.param('id')) return res.send('id is required');
        User.destroy({ id: req.param('id') }, function userDestroyed(err, user) {
            if(err) return res.send(err);
            if(!user) return res.send(404)
            sails.io.sockets.emit('userDestroyed', { data: true });
            return res.send('success')
        });
    }

};

