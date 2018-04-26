const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const {
    CompanyController,
    TodolistController
} = require('../controllers');

//todolist routes
router.post('/todolist', TodolistController.create)
router.get('/todolist', TodolistController.findAll)
router.get('/todolist/:id', TodolistController.findOne)
router.put('/todolist/:id', TodolistController.update)
router.delete('/todolist/:id', TodolistController.delete)

module.exports = router;