import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskstorage({
    destination(req, file, callback){
        callback(null, 'uploads/')
    },
    filename(req, file, callback){
        callback(null, `${filename.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, callback){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return callback(null, true)
    }
    else {
        callback('Only Image can Upload !')
    }
}

const upload = multer({
    storage, 
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router