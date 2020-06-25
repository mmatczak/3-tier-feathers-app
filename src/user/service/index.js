const UserRestService = require('./user.service');

module.exports = function setUpUserServices(serviceLocator, app) {
    app.use('/users', new UserRestService(serviceLocator));
};
