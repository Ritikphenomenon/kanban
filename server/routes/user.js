
const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { User, Task } = require("../db/index");
const jwt=require('jsonwebtoken')
const router = express.Router();



router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne({ username });
  
      if (user) {
        return res.json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '20d' });
      res.json({ message: 'User created successfully', token });
    } catch (error) {
      console.error('Error during user signup:', error.message);
      res.status(500).json({ message: 'Server error during user signup' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user =  await User.findOne({ username, password });
  
      if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '20d' });
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during user login:', error.message);
      res.status(500).json({ message: 'Server error during user login' });
    }
  });

  router.get('/tasks', async (req, res) => {
    try {
      const taskses = await Task.find({ published: true });
      res.json({ taskses });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });


  
  router.post('/create', authenticateJwt, async (req, res) => {
    try {
      const { title, 
        description, 
        status,
         published } = req.body;
      const Id=req.user.username;
  
      const tasks = new Task({
        title,
        description,
        status,
        published,
        Id
      });
  
      await tasks.save();
      res.json({ message: 'taskses created successfully', tasksId: tasks.id });
    } catch (error) {
      console.error('Error creating taskes:', error.message);
      res.status(500).json({ message: 'Server error during course creation' });
    }
  });
  

  router.delete('/delete/:id', async (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(deletedDocument => {
      res.send('Document deleted successfully');
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).send('An error occurred');
    });
  
  });


  

  module.exports = router
