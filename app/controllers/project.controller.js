const db = require("../models");
const Op = db.Op;
const Project = db.project;
const ProjectProgress = db.project_progress;
const ProjectProgressLog = db.project_progress_log;
const ProjectReviews = db.project_reviews;
const Student = db.student;
const Teacher = db.teacher;

//Project controller

exports.createProject = (req, res) => {
    const data = req.body;

    const project = {
        name: data.name,
        projectRequest: data.projectRequest,
        projectContent: data.projectContent,
        majors: data.majors,
        idTeacher: data.idTeacher,
        nameTeacher: data.nameTeacher,
        idStudent: "",
        nameStudent: "",
        state: false,
    };

    Project.create(project)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Có lỗi khi tạo."
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
                    message: "Cập nhật dữ liệu thành công",
                });
            } else {
                res.send({
                    message: `Không thể cập nhật với id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Có lỗi khi cập nhật với id=" + id,
            });
        });
};

exports.findOneProject = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await Project.findByPk(id);
        if (!project.id) {
            res.status(203).send({
                message: "khong tim thay id=" + id,
            });
        }
        // const idTeacher = project.idTeacher ? project.idTeacher : "null";
        // const idStudent = project.idStudent ? project.idStudent : "null";

        // const teacher = await Teacher.findByPk(idTeacher);
        // const student = await Student.findByPk(idStudent);
        res.status(200).send({
            name: project.name,
            idTeacher: project.idTeacher,
            idStudent: project.idStudent,
            // nameTeacher: project.nameTeacher,
            // phoneTeacher: teacher ? teacher.phone : "",
            // emailTeacher: teacher ? teacher.email : "",
            // workspaceTeacher: teacher.workspace ? teacher.workspace : "",
            majors: project.majors,
            // nameStudent: student ? student.name : "",
            // phoneStudent: student ? student.phone : "",
            // emailStudent: student ? student.email : "",
            projectContent: project.projectContent,
            projectRequest: project.projectRequest,
            state: project.state,
        });
    } catch (err) {
        res.status(500).send({
            message: "có lỗi khi tìm kiếm với id=" + id,
        });
    };

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
                    err.message || "Có lỗi trong khi tìm kiếm.",
            });
        });
};

exports.findAllProject = async (req, res) => {
    try {
        const projectList = await Project.findAll();
        res.send(projectList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Có lỗi trong khi tìm kiếm.",
        });
    }
}

exports.deleteProject = async (req, res) => {
    const id = req.params.id;

    const deleProject = await Project.destroy({ where: { id: id}});
    if(deleProject){
        return res.status(200).send({ message : "Xoá đề tài thành công" });
    }
    res.status(500).send({ message : "Xoá đề tài thất bại"});
};

//Project_Progress Controller

exports.createProjectProgress = (req, res) => {
    const data = req.body;

    const project_progress = {
        idProject: data.idProject,
        stage: data.stage,
        studentRate: data.studentRate,
        teacherRate: data.teacherRate,
        attitudeStudy: data.attitudeStudy,
        attWithTeacher: data.attWithTeacher,
        abilityRate: data.abilityRate,
        planState: data.planState,
    };

    ProjectProgress.create(project_progress)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

exports.updateProjectProgress = (req, res) => {
    const id = req.params.id;

    ProjectProgress.update(req.body, {
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

exports.findOneProjectProgress = (req, res) => {
    const id = req.params.id;

    ProjectProgress.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findProjectProgress = async (req, res) => {
    const idProject = req.params.idProject;
    const stage = req.params.stage;
    try {
        const projectProgress = await ProjectProgress.findOne({
            where: {
                idProject: idProject,
                stage: stage
            }
        });
        if (!projectProgress) {
            return res.status(205).send({
                message: "khong co dữ liệu"
            });
        }
        res.status(200).send(projectProgress);

    } catch {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + idProject,
        });
    }
};

//Project_Progress_log Controller
exports.createProjectProgressLog = (req, res) => {
    const data = req.body;

    const project_progress_log = {
        idProjectProgress: data.idProjectProgress,
        content: data.content,
        percent: data.percent,
        worker: data.worker
    };

    ProjectProgressLog.create(project_progress_log)
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

exports.updateProjectProgressLog = (req, res) => {
    const id = req.params.idProjectProgressLog;

    ProjectProgressLog.update(req.body, {
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

exports.findOneProjectProgressLog = (req, res) => {
    const id = req.params.idProjectProgressLog;
    ProjectProgressLog.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findAllProjectProgressLog = (req, res) => {
    const idProjectProgress = req.params.idProjectProgress;

    ProjectProgressLog.findAll({
        where: {
            idProjectProgress: idProjectProgress
        }
    })
        .then((data) => {
            if (data.length === 0) {
                res.status(205).send({
                    message: "khong co duw lieu vs " + idProjectProgress,
                });
            } else {
                res.status(200).send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + idProjectProgress,
            });
        });
};

// new api get projectProgress 
exports.getProjectProgress = async (req, res) => {
    const idProject = req.params.idProject;
    const stage = req.params.stage;
    try {
        const projectProgress = await ProjectProgress.findOne({
            where: {
                idProject: idProject,
                stage: stage
            }
        });
        if (!projectProgress) {
            return res.status(205).send({
                message: "khong co dữ liệu"
            });
        }
        const listProgressLog = await ProjectProgressLog.findAll({
            where: {
                idProjectProgress: projectProgress.id
            }
        });
        let listLog = [];
        if (listProgressLog.length != 0) {
            listLog = listProgressLog.map((value, key) => {
                return value.dataValues
            })
        }
        const data = {
            ...projectProgress.dataValues,
            listProgressLog: listLog
        }
        res.status(200).send(data);

    } catch {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + idProject,
        });
    }
}

// thống kê danh sách đồ án đã được đăng ký
exports.tkProject = async (req, res) => {
    const listProjects = await Project.findAll();
    const listProjectRegis = await Project.findAll({ where: { state: true } });
    let countProject = listProjects.length
    let countProjectRegis = listProjectRegis.length

    res.status(200).send({
        countProject: countProject,
        countProjectRegis: countProjectRegis
    });
}

// thống kê danh sách đồ án đã được đăng ký
exports.tkStudent = async (req, res) => {
    const tkStudent = await Student.findAll();
    const listProjectRegis = await Project.findAll({ where: { state: true } });
    let countStudent = tkStudent.length
    let countProjectRegis = listProjectRegis.length

    res.status(200).send({
        countStudent: countStudent,
        countProjectRegis: countProjectRegis
    });
}

exports.tkProjectProgress = async (req, res) => {
    const stage = req.params.stage;
    const listProjectProgresses = await ProjectProgress.findAll({
        where: {
            stage: stage
        }
    });
    const listProgresses = listProjectProgresses.map((value) => {
        return value.dataValues;
    });

    const countProgress = listProgresses.length;
    const tkPlanState = {
        CHT: 0,
        HT: 0,
        VM: 0,
    };
    const tkAbilityRate = {
        KNC: 0,
        CKN: 0,
        KNT: 0,
    };
    const tkAttitudeStudy = {
        TC: 0,
        VP: 0,
        RTD: 0,
    };
    const tkAttWithTeacher = {
        TX: 0,
        KTX: 0,
        KG: 0,
    };
    if (countProgress > 0) {
        listProgresses.forEach(element => {
            if (element.planState == "Chưa hoàn thành") {
                tkPlanState.CHT = tkPlanState.CHT + 1;
            };
            if (element.planState == "Hoàn thành") {
                tkPlanState.HT = tkPlanState.HT + 1;
            };
            if (element.planState == "Hoàn thành vượt mức") {
                tkPlanState.VM = tkPlanState.VM + 1;
            };
            if (element.abilityRate == "Khả năng cao") {
                tkAbilityRate.KNC = tkAbilityRate.KNC + 1;
            };
            if (element.abilityRate == "Có khả năng") {
                tkAbilityRate.CKN = tkAbilityRate.CKN + 1;
            };
            if (element.abilityRate == "Khả năng thấp") {
                tkAbilityRate.KNT = tkAbilityRate.KNT + 1;
            };
            if (element.attitudeStudy == "Tích cực") {
                tkAttitudeStudy.TC = tkAttitudeStudy.TC + 1;
            };
            if (element.attitudeStudy == "Vừa phải") {
                tkAttitudeStudy.VP = tkAttitudeStudy.VP + 1;
            };
            if (element.attitudeStudy == "Rất thụ động") {
                tkAttitudeStudy.RTD = tkAttitudeStudy.RTD + 1;
            };
            if (element.attWithTeacher == "Thường xuyên") {
                tkAttWithTeacher.TX = tkAttWithTeacher.TX + 1;
            };
            if (element.attWithTeacher == "Không thường xuyên") {
                tkAttWithTeacher.KTX = tkAttWithTeacher.TX + 1;
            };
            if (element.attWithTeacher == "Không gặp") {
                tkAttWithTeacher.KG = tkAttWithTeacher.KG + 1;
            };
        });
    }
    const result = {
        total: countProgress,
        listProgresses: listProgresses,
        tkPlanState: tkPlanState,
        tkAttitudeStudy: tkAttitudeStudy,
        tkAttWithTeacher: tkAttWithTeacher,
        tkAbilityRate: tkAbilityRate,
    }
    res.status(200).send(result);
}