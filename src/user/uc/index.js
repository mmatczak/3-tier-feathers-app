const UserUc = require('./user.uc');

module.exports = function setUpUserUCs (serviceLocator) {
    serviceLocator.use('userUc', new UserUc(serviceLocator));
};
