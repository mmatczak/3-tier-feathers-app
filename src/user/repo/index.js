const UserRepo = require('./user.repo');

module.exports = function setUpUserRepos(serviceLocator) {
    const feathers = require('@feathersjs/feathers');
    const userRepos = feathers();
    userRepos.use('userRepo', new UserRepo());

    serviceLocator.useExternalContext(userRepos);
};
