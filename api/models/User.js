/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {    
    attributes: {
        firstName: {
            type: 'string',
            maxLength: 100
        },
        lastName: {
            type: 'string',
            maxLength: 100
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            maxLength: 32
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },                       
        tweets: {
            collection: 'tweet',
            via: 'owner'
        },
        isAdmin: {
            type: 'boolean'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    /*beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }*/
};
