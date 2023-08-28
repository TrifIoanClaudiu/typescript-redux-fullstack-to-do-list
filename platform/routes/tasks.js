const router = require("express").Router();
const Task = require("../models/Task");
const { verifyTokenAndAuthorization } = require("./tokenMiddleware");

//Create task
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      userId,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get tasks
router.get("/tasks/:id", verifyTokenAndAuthorization, async (req, res) => {
  const user_id = req.params.id;
  const { title } = req.query;

  try {
    let query = { userId: user_id };

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive regex
    }

    const tasks = await Task.find(query).sort({ updatedAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json(err);
  }
});


//Delete task

router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json("Task succesfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update task

router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updates = {};
    for (const key in req.body) {
      if (req.body[key] !== "") {
        updates[key] = req.body[key];
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
