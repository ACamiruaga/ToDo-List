const express = require('express');
const router = express.Router();
const Task = require('../models/task');

//Consultar task
router.get('/api/tasks', async (req,res) =>
{
    //res.end("pagina contacto");
    const task = await Task.find();
    res.json(task);
});
//Almacenar task
router.post('/api/tasks', async (req,res)=>
{
    const task = new Task(req.body);
    await task.save();
    res.json(
        {
            status: "task saved"
        });
});
//Actualizar task
router.put('/api/tasks/:id', async (req,res)=>
{
    await Task.findByIdAndUpdate(req.params.id, req.body);//recibe el id y el objeto con los datos actualizados
    res.json(
        {
            status: "task updated"
        });
});
//Delete task
router.delete('/api/tasks/:id', async (req,res)=>
{
    await Task.findByIdAndRemove(req.params.id);
    res.json(
    {
        status: 'Task deleted'
    });
});

router.get('*', (req,res)=>
{
    res.end("Not found ");
});

module.exports = router;