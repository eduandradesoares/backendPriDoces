const Produto = require('../models/produtos.js');
const status = require('http-status');

exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const valor = req.body.valor;
    const dataFabricacao = req.body.dataFabricacao;
    const dataValidade = req.body.dataValidade;

    Produto.create({
        nome: nome,
        valor: valor,
        dataFabricacao: dataFabricacao,
        dataValidade: dataValidade

    })
    .then(produto =>{
        if(produto){
            res.status(status.OK).send(produto);
        } else {
            res.status(status.NOT_FOUND).send("Erro produto não cadastrado");
        }
    })
    .catch(error => next(error));    
}

exports.SearchAll = (req, res, next) => {
    Produto.findAll()
    .then(produto => {
        if(produto){
            res.status(status.OK).send(produto);
        }
    })
    .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Produto.findByPk(id)
    .then(produto =>{
        if(produto){
            res.status(status.OK).send(produto);
        }else {
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
}

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const {nome, valor, dataFabricacao, dataValidade} = req.body

    Produto.findByPk(id)
    .then(produto => {
        if(produto){
            produto.update({
                nome: nome,
                valor: valor,
                dataFabricacao: dataFabricacao,
                dataValidade: dataValidade
            },
                {
                    where: { id: id }
                })
                .then( () => {
                    res.status(status.OK).send(produto);
                })
                .catch(error => next(error));
        }else {
            res.status(status.NOT_FOUND).send("Erro ao atualizar produto");
        }
    })
    .catch(error => next(error));
}

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Produto.findByPk(id)
    .then(produto => {
        if(produto){
            produto.destroy({
                where: { id: id }
            })
            .then( ()=> {
                res.status(status.OK).send("Produto excluído");
            })
            .catch(error => next(error));
        }else {
            res.status(status.NOT_FOUND).send("Produto não excluído");
        }
    })
    .catch(error => next(error));
}