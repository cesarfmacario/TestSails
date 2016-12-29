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
    create: function(req, res) {
        User.create(req.params.all(), function userCreated(err, user) {
			if (err) {
                console.log(err)
				return res.redirect('/user/new');
			}
			return res.redirect('/user');
        });
    },
    edit: function (req, res) {
    	if(!req.param('id')) return res.render(404);
        User.findOne({ id: req.param('id') }, function(err, user) {
            if(err) return res.json({ err: err }, 500);
            if(!user) return res.render(404);            
            return res.view({
                user: user
            });
        })
    },
    saveedit: function (req, res) {
        User.update({ id: req.param('id') }, req.params.all(), function userUpdated(err, user) {
            console.log(req.params.all());
            console.log(err);
            console.log(user);
            if(err) return res.send({ err:err }, 500);
            if(!user) return res.send({ user: user }, 404)
            return res.redirect('/user')
        });
    },
    destroy: function (req, res) {
        User.destroy({ id: req.param('id') }, function userDestroyed(err, user) {
            if(err) return res.send({ err:err }, 500);
            if(!user) return res.send({ user: user }, 404)
            return res.redirect('/user')
        });
    }

};

