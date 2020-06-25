module.exports = class BookLendingUc {
    bookRepo;
    userBcFacade;

    constructor(serviceLocator) {
        this.bookRepo = serviceLocator.service('bookRepo');
        this.userBcFacade = serviceLocator.service('userBcFacade');
    }

    async lendBookToUser(bookId, userId) {
        const book = await this.bookRepo.get(bookId);
        if (!book) {
            throw new Error(`Book with id ${bookId} does not exist`)
        }
        const user = await this.userBcFacade.getUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} does not exist`)
        }
        return this.bookRepo.update(bookId, {...book, borrowedBy: user.login});
    }
};
