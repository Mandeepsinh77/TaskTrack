//controller is the set of different actions

const { contact } = require("./contact_controller")

const Task = require("../models/task");
var taskList = [
    {
        description: "Annual report submission deadline",
        category: "work",
        date: '2004-03-04'
    },
    {

        description: "Add a task",
        category: "work",
        date: "2022-12-19"
    }
]
module.exports.home = function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("error occurs for feaching the data from database");
            return;
        }
        return res.render('home', {
            title: "Remember.com",
            task_list: tasks,
            header: " No Need to Remember !"
        });
    });

};

module.exports.task = function (req, res) {
    // console.log(req.body);
    // console.log(req.body.description);
    // console.log(req.body.category);
    // console.log(req.body.date);


    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newTask) {
        if (err) {
            console.log("error in creating task list", err);
            return;
        }
        // console.log("****", newTask);
        return res.redirect('back');
    })

}

module.exports.delete = function (req, res) {
    let id = req.query.id;

    Task.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("Error in deleting an object from the database");
            return;
        }
        return res.redirect("back");
    })
}

