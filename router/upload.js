import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({          //devuelve un obj de almacenamiento
    destination: function(req,file, cb) {     //destination, lugar donde van a parar las uploads
        cb(null, 'public/uploads')
    },
    filename: function(req,file, cb){         //filename, nombre que va a tener el archivo
        cb(null, `${Date.now()}-${file.originalname}`)
    }

})

const upload = multer({storage: storage})

/* ------------------------- CRUD ----------------------------- */
router.post('/',  upload.single('foto'), (req, res, next) => {             //single procesa lo que venga del input file, con el identificador que le pasemos
    const file = req.file

    if(!file){
        const error = new Error('Error subiendo el archivo')
        error.httpStatuscode = 400
        return next(error)
    }

    res.json({nombre : file.filename})
}) 

/* ------------------------- CRUD ----------------------------- */

export default router