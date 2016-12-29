/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    _config: {
        rest: false
    },
    attributes: {
        txt: {
            type: 'string',
            maxLength: 140
        },
        owner: {
            model: 'user'
        }
    }
};

