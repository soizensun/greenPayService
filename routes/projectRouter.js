const { route } = require("./userRouter")
const ProjectController = require ('../controller/project')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route project")
})


router.post('/register', ProjectController.register)

router.get('/weeklyProject', ProjectController.weeklyProject)

router.get('/', ProjectController.getAll)

module.exports = router
