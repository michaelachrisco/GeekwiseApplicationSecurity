class Post {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Username: ${this.username}, Description: ${this.description}`;
    }
}

module.exports = Post;
