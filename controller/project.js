const Project = require('../models/Project')

exports.register = async (req, res) => {
    try {
        let { name, location, mainPicture, description, budget, targetBudget } = req.body

        if (!name || !location || !mainPicture || !description || !budget || !targetBudget)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        const project = await Project.findOne({ name })
        if (project)
            return res
                .status(400)
                .json({ msg: "Duplicate project name." })

        const newProject = new Project({
            name,
            location,
            mainPicture,
            description,
            budget,
            targetBudget,
        });
        const savedProject = await newProject.save();
        res.json(savedProject);

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.weeklyProject = async (req, res) => {
    try {
        const weeklyProject = await Project.findOne({ isWeeklyProject: true })
        if (weeklyProject)
            return res.json(weeklyProject)

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.getAll = async (req, res) => {
    try {
        const allProject = await Project.find()
        return res.json(allProject)

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.updateProject = async (req, res) => {
    try {
        let { _id, name, location, mainPicture, description, budget, targetBudget } = req.body

        let updateProject = await Project.updateOne({ _id },
            {
                name,
                location,
                budget,
                targetBudget,
                description,
                mainPicture
            })

        const allProject = await Project.find()
        return res.json(allProject)

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }

}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId)

        const allProject = await Project.find()
        return res.json(allProject)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.setWeeklyProject = async (req, res) => {
    try {

        await Project.updateOne({ isWeeklyProject: true }, { isWeeklyProject: false })
        await Project.updateOne({ _id: req.params.projectId }, { isWeeklyProject: true })

        const allProject = await Project.find()
        return res.json(allProject)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.switchIsActivateStatus = async (req, res) => {
    try {
        const targetProject = await Project.findById(req.params.projectId)
        const newStatus = !targetProject.isActivate

        await Project.updateOne({ _id: req.params.projectId }, { isActivate: newStatus })

        
        const allProject = await Project.find()
        return res.json(allProject)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.switchIsCloseProject = async (req, res) => {
    try {
        const targetProject = await Project.findById(req.params.projectId)
        const newStatus = !targetProject.isClose

        await Project.updateOne({ _id: req.params.projectId }, { isClose: newStatus })

        
        const allProject = await Project.find()
        return res.json(allProject)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
