const express = require("express");
const { employeeModel } = require("../model/employeeModel");
const employeeRoute = express.Router();

employeeRoute.get("/", async (req, res) => {
  try {
    let data = await employeeModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

employeeRoute.post("/", async (req, res) => {
  try {
    let data = await employeeModel.find({ email: req.body.email });

    if (data.length == 0) {
      let new_employee = new employeeModel(req.body);
      await new_employee.save();
      res.status(201).send("Employee added");
    } else {
      res.status(400).send("Employee already exist");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

employeeRoute.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await employeeModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(201).send("Updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

employeeRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await employeeModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  employeeRoute,
};
