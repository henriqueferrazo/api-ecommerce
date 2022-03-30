const ClientesModels = require('../models/modelClientes.js')

class ClientesController {

    static async showAll(req, res) {
        try {
            const clientes = await ClientesModels.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            return res.status(200).json({ resultado: clientes })
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async showById(req, res) {
        const id = req.params.id

        try {
            const clientes = await ClientesModels.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!clientes) {
                return res.status(401).json({
                    status: 401,
                    message: 'Cliente não encontrado!'
                })
            }

            return res.status(200).json(clientes)
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async create(req, res) {
        const {
            nome,
            endereco,
            estado,
            cidade,
            cep
        } = req.body

        if (
            !nome ||
            !endereco ||
            !estado ||
            !cidade ||
            !cep 
            ) {
            return res.status(401).json({
                status: 401,
                message: 'Todos os campos precisam ser preenchidos!'
            })
        }
        const clientesExists = await ClientesModels.findOne({ where: { nome : nome } })

        if (clientesExists) {
            return res.status(401).json({
                status: 401,
                message: 'Endereço ja informado!'
            })
        }
        const newprodutos = {
            nome,
            endereco,
            estado,
            cidade,
            cep
        }
        try {
            await ClientesModels.create(newprodutos)
            res
                .status(201)
                .json({ status: 201, message: 'clientes cadastradas com sucesso!' })
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }
    static async deleteById(req, res) {
        const { id } = req.params

        const cliente = await ClientesModels.findOne({ where: { id: id }, raw: true })

        if (!cliente) {
            return res.status(401).json({
                status: 401,
                message: 'Cliente não encontrado!'
            })
        }

        try {
            await ClientesModels.destroy({ where: cliente })
            return res
                .status(200)
                .json({ status: 200, message: 'Cliente deletado com sucesso!' })
        } catch (error) {
            return res
                .status(401)
                .json({ status: 401, message: `Algo deu errado: ${error}` })
        }
    }

}
module.exports = ClientesController;