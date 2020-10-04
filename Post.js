const NodeRSA = require('node-rsa')

let Post = function(data) {
    this.data = data
    this.errors = []
}

Post.prototype.cleanUp = function() {
    if(typeof(this.data.name) != "string") {this.data.name = ''}
    if(typeof(this.data.paragraph) != "string") {this.data.paragraph = ''}

    this.data = {
        name: this.data.name.trim(),
        paragraph: this.data.paragraph.trim()
    }
}

Post.prototype.validate = function() {
    if(this.data.name == '') {this.errors.push('not valid title')}
    if(this.data.paragraph == '') {this.errors.push('not valid content')}
}

Post.prototype.create = function() {
    return new Promise((resolve, reject) => {
        this.validate()
        if(!this.errors.length) {
            // encrypt the data for sending using node-rsa lib
            let key = new NodeRSA({b: 1024})
            let encryptedTitle = key.encrypt(this.data.name, 'base64')
            let encryptedContent = key.encrypt(this.data.paragraph, 'base64')
            this.data = {
                name: encryptedTitle,
                paragraph: encryptedContent
            }
            resolve(this.data)
        } else {
            reject(this.errors)
        }
    })
}


module.exports = Post

