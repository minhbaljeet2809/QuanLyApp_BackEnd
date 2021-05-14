const db = require("../models");
const Op = db.Op;
const Project = db.project;
const ProjectLog = db.project_log;
const ProjectStageLog = db.project_stage_log;
const ProjectReviews = db.project_reviews;

//Project controller

exports.createProject = (req, res) =>{
    const data = req.body;

    const project = {
        name: data.name,
        projectRequest: data.projectRequest,
        projectContent: data.projectContent,
        majors: data.majors,
        idTeacher: data.idTeacher,
        nameTeacher: data.nameTeacher,
        state: data.state,
    };

    Project.create(project)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
};

exports.updateProject = (req, res) => {
    const id = req.params.id;

    Project.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneProject = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findByNameProject = (req, res) => {
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Project.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.deleteProject = (req, res) => {
    const id = req.params.id;

    Project.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};

//Project_log Controller

exports.createProjectLog = (req, res) => {
    const data = req.body;
    
    const project_log = {
        idProject: data.idProject,
        stage: data.stage,
        studentRate: data.studentRate,
        attitudeStudy: data.attitudeStudy,
        attWithTeacher: data.attWithTeacher,
        abilityRate: data.abilityRate,
    };

    ProjectLog.create(project_log)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.updateProjectLog = (req, res) => {
    const id = req.params.id;

    ProjectLog.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneProjectLog = (req, res) => {
    const id = req.params.id;

    ProjectLog.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};


exports.deleteProjectLog = (req, res) => {
    const id = req.params.id;

    ProjectLog.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};

//Project_Stage_log Controller
exports.createProjectStageLog = (req, res) => {
    const data = req.body;
    
    const project_stage_log = {
        idProjectLog: data.idProjectLog,
        content: data.content,
        percent: data.percent,
    };

    ProjectStageLog.create(project_stage_log)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.updateProjectStageLog = (req, res) => {
    const id = req.params.id;

    ProjectStageLog.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneProjectStageLog = (req, res) => {
    const id = req.params.id;

    ProjectStageLog.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};


exports.deleteProjectStageLog = (req, res) => {
    const id = req.params.id;

    ProjectStageLog.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};

//Project_reviews Controller
exports.createProjectReviews = (req, res) => {
    const data = req.body;
    
    const project_reviews = {
        name: data.name,
    };

    ProjectReviews.create(project_reviews)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.updateProjectReviews = (req, res) => {
    const id = req.params.id;

    ProjectReviews.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneProjectReviews = (req, res) => {
    const id = req.params.id;

    ProjectReviews.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findByNameProjectReviews = (req, res) => {
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    ProjectReviews.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.deleteProjectReviews = (req, res) => {
    const id = req.params.id;

    ProjectReviews.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};
