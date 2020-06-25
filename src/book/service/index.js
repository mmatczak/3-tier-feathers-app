const BookRestService = require('./book.service');
const BookLendingRestService = require('./book-lending.service');

module.exports = function setUpBookServices(serviceLocator, app) {
    app.use('/books', new BookRestService(serviceLocator));
    app.use('/book-lending', new BookLendingRestService(serviceLocator));
};
