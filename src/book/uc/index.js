const BookLendingUc = require('./book-lending.uc');

module.exports = function setUpBookUCs (serviceLocator) {
    serviceLocator.use('bookLendingUc', new BookLendingUc(serviceLocator));
};
