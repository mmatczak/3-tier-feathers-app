module.exports = function setUpBookRepos(serviceLocator) {
    const feathers = require('@feathersjs/feathers');
    const memory = require('feathers-memory');
    const bookRepos = feathers();
    bookRepos.use('bookRepo', memory());

    serviceLocator.useExternalContext(bookRepos);
};
