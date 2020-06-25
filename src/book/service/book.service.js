const {BadRequest} = require('@feathersjs/errors');

module.exports = class BookRestService {
    bookRepo;

    constructor(serviceLocator) {
        this.bookRepo = serviceLocator.service('bookRepo');
    }

    async find() {
        return this.bookRepo.find();
    }

    async create(book) {
        if (book && book.author && book.title) {
            return this.bookRepo.create(book);
        }
        throw new BadRequest('Property \'login\' not provided');
    }
};
