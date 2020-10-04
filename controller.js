const Post = require('./Post')

exports.loader = function(req, res) {
    res.render('template')
}

exports.create = function(req, res) {
    let post = new Post(req.body)
    post.create().then((result) => {
        res.render('success', {result: result})
    }).catch((errors) => {
        res.render('404', {errors: errors})
    })
}

exports.upload = function(req, res) {
    if(!req.files) {
        res.send('no file')
    } else {
        let file = req.files.myFile
        // file size limitation
        const limitedSize = 100000000000

        if(file.size > limitedSize) {
            res.send("file size too large")
        } else {
            file.mv('./public/filesuploaded'+file.name, (err) => {
                if(err) {
                    res.send('some error occured!')
                } else {
                    res.send("file successfully uploaded!")
                }
            })
        }
    }
}