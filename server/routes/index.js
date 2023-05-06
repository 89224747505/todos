const router = new require('express')();
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/registration', UserController.registration);
router.post('/login',  UserController.login);
router.post('/logout',authMiddleware, UserController.logout);
router.get('/refresh', UserController.refresh);

router.get('/users', UserController.getUsers);
router.get('/executors', authMiddleware, UserController.getExecutors);

router.post('/gettasks', authMiddleware, TaskController.getTasksForAuthUser);
router.post('/deletetask', authMiddleware, TaskController.deleteTask);
router.post('/createtask', authMiddleware, TaskController.createTask);
router.post('/gettask', authMiddleware, TaskController.getTask);
router.post('/update', authMiddleware, TaskController.updateTask);
router.post('/updatestatus', authMiddleware, TaskController.updateStatus);

module.exports = router;