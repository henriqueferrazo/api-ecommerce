const ProdutosModels = require('../models/modelProdutos.js')

class ProdutosController {

    static async showAll(req, res) {
        try {
            const produtos = await ProdutosModels.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            return res.status(200).json({ resultado: produtos })
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async showById(req, res) {
        const id = req.params.id

        try {
            const produtos = await ProdutosModels.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!produtos) {
                return res.status(401).json({
                    status: 401,
                    message: 'Produto não encontrado!'
                })
            }

            return res.status(200).json(produtos)
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message })
        }
    }

    static async create(req, res) {
        const {
            imagem,
            nome,
            descricao,
            preco,
        } = req.body

        if (
            !imagem ||
            !nome ||
            !descricao ||
            !preco
        ) {
            return res.status(401).json({
                status: 401,
                message: 'Todos os campos precisam ser preenchidos!'
            })
        }
        const produtosExists = await ProdutosModels.findOne({ where: { nome : nome } })

        if (produtosExists) {
            return res.status(401).json({
                status: 401,
                message: 'Endereço ja informado!'
            })
        }
        const newprodutos = {
            imagem,
            nome,
            descricao,
            preco,
        }
        try {
            await ProdutosModels.create(newprodutos)
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
            imagem,
            nome,
            descricao,
            preco,
        } = req.body

        const produtos = await ProdutosModels.findOne({ where: { id: id }, raw: true })

        if (!produtos) {
            return res.status(401).json({
                status: 401,
                message: 'Produto não encontrado'
            })
        }
        const novosDados = {
            imagem,
            nome,
            descricao,
            preco,
        }

        try {
            await ProdutosModels.update(novosDados, { where: produtos })
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

        const produtos = await ProdutosModels.findOne({ where: { id: id }, raw: true })

        if (!produtos) {
            return res.status(401).json({
                status: 401,
                message: 'Produto não encontrado!'
            })
        }

        try {
            await ProdutosModels.destroy({ where: produtos })
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
module.exports = ProdutosController;