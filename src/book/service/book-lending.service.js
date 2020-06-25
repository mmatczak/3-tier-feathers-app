const {BadRequest} = require('@feathersjs/errors');

module.exports = class BookLendingRestService {
    bookLendingUc;

    constructor(serviceLocator) {
        this.bookLendingUc = serviceLocator.service('bookLendingUc');
    }

    async create({bookId, userId}) {
        if (bookId != null && userId != null) {
            try {
                return await this.bookLendingUc.lendBookToUser(bookId, userId);
            } catch (e) {
                throw new BadRequest(e.message);
            }
        }
        throw new BadRequest('Properties \'bookId\' and \'userId\' must be provided');
    }
};
