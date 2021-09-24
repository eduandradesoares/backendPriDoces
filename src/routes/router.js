const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

router.post('/produtos', ProdutoController.Insert);
router.get('/produtos', ProdutoController.SearchAll);
router.get('/produtos/:id', ProdutoController.SearchOne);
router.put('/produtos/:id', ProdutoController.Update);
router.delete('/produtos/:id', ProdutoController.Delete);

module.exports = router;