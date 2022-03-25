const PedidosModels = require('../models/modelsPedidos.js')

class PedidosController {

    static async showAll(req, res) {
        try {
            const pedidos = await PedidosModels.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            return res.status(200).json({ resultado: pedidos })
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async showById(req, res) {
        const id = req.params.id

        try {
            const pedidos = await PedidosModels.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!pedidos) {
                return res.status(401).json({
                    status: 401,
                    message: 'Produto não encontrado!'
                })
            }

            return res.status(200).json(pedidos)
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async create(req, res) {
        const {
            data
        } = req.body

        if (
            !data
        ) {
            return res.status(401).json({
                status: 401,
                message: 'Todos os campos precisam ser preenchidos!'
            })
        }
        const pedidosExists = await PedidosModels.findOne({ where: { id : id } })

        if (pedidosExists) {
            return res.status(401).json({
                status: 401,
                message: 'Endereço ja informado!'
            })
        }
        const newprodutos = {
            data
        }
        try {
            await PedidosModels.create(newprodutos)
            res
                .status(201)
                .json({ status: 201, message: 'Produto cadastradas com sucesso!' })
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }
    static async updateById(req, res) {
        const { id } = req.params
        const {
            data
        } = req.body

        const pedidos = await PedidosModels.findOne({ where: { id: id }, raw: true })

        if (!pedidos) {
            return res.status(401).json({
                status: 401,
                message: 'Produto não encontrado'
            })
        }
        const novosDados = {
            data
        }

        try {
            await PedidosModels.update(novosDados, { where: pedidos })
            return res
                .status(200)
                .json({ status: 200, message: 'Atualizado com sucesso!' })
        } catch (error) {
            return res
                .status(400)
                .json({ status: 400, message: `Algo deu errado: ${error}` })
        }
    }

    static async deleteById(req, res) {
        const { id } = req.params

        const pedidos = await PedidosModels.findOne({ where: { id: id }, raw: true })

        if (!pedidos) {
            return res.status(401).json({
                status: 401,
                message: 'Produto não encontrado!'
            })
        }

        try {
            await PedidosModels.destroy({ where: pedidos })
            return res
                .status(200)
                .json({ status: 200, message: 'Produto deletado com sucesso!' })
        } catch (error) {
            return res
                .status(401)
                .json({ status: 401, message: `Algo deu errado: ${error}` })
        }
    }

}
module.exports = PedidosController;