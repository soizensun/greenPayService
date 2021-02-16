const { route } = require("./userRouter")
const ProjectController = require ('../controller/project')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route project")
})


router.post('/register', ProjectController.register)

router.get('/weeklyProject', ProjectController.weeklyProject)

router.get('/', ProjectController.getAll)

router.post('/updateProject', ProjectController.updateProject)

router.delete('/deleteProject/:projectId', ProjectController.deleteProject)

router.post('/setWeeklyProject/:projectId', ProjectController.setWeeklyProject)

router.post('/switchIsActivateStatus/:projectId', ProjectController.switchIsActivateStatus)

module.exports = router
