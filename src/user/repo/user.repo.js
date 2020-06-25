const {Service} = require('feathers-memory');

module.exports = class UserRepo extends Service {
    async userExists(login) {
        const users = await super.find({query: {login}});
        return !!(users && users.length);
    }
};
