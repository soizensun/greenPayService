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
        const allProject = await Project.find({ isWeeklyProject: false })
        return res.json(allProject)

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}