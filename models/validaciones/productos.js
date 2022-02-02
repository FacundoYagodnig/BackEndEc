import Joi from 'joi'

class ProductoValidation {
    static validar(producto){

        const productoSchema = Joi.object({
            name: Joi.string().min(4).max(40).required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            brand: Joi.string().required(),
            category: Joi.string().required(),
            details: Joi.string().required(),
            photo: Joi.string().empty(''),
            send: Joi.boolean().required(),
            cantidad: Joi.number().required(),
            total: Joi.number().required() 
        })

    //const error = productoSchema.validar(producto).error same as
    const {error} = productoSchema.validate(producto)
    return error

    }
}



export default ProductoValidation  