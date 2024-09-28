const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Add a new course
router.post('/', async (req, res) => {
    const { title, description, teacher, fees } = req.body;
  
    try {
      const newCourse = new Course({
        title,
        description,
        teacher,
        fees,
      });
  
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update a course
  router.put('/:id', async (req, res) => {
    const { title, description, teacher, fees } = req.body;
  
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { title, description, teacher, fees },
        { new: true, runValidators: true }
      );
  
      if (!updatedCourse) return res.status(404).send('Course not found');
      res.json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  
  // Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
});



// Delete a specific course (optional)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;
