const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/dashboard', orderController.getDashboard);
router.patch('/:id', orderController.updateStatus);

module.exports = router;