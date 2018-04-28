const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const {
    TodolistController,
    UserController
} = require('../controllers');

const isAuthenticated = require('../auth/isAuthenticated');

//todolist routes
router.post('/todolist', isAuthenticated, TodolistController.create)
router.get('/todolist', isAuthenticated, TodolistController.findAll)
router.get('/todolistbyuser/:userId', isAuthenticated, TodolistController.findAllByUser)
router.get('/todolist/:id', isAuthenticated, TodolistController.findOne)
router.put('/todolist/:id', isAuthenticated, TodolistController.update)
router.delete('/todolist/:id', isAuthenticated, TodolistController.delete)

//user route
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;