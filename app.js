const mongoose = require("mongoose");
const express = require("express");
require("./src/db/conn");
const Student = require("./src/models/students")




const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hell");
});



// create student detail using mongo
// app.post("/students", (req, res) => {
//  console.log(req.body);
//  const user = new Student(req.body)

//  //using promises
// user.save().then(() => {
//       res.status(200).send(user)
// }).catch((err) =>{
//       res.status(400).send(err)
// })

// //  res.send("welcome");
// });





//using async and await
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);

    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});


//read the data of registered Students
app.get('/students', async (req, res) => {
      try{
            const studentsData = await Student.find();
            res.status(200).send(studentsData);
      }catch(err){
            res.status(401).send(err);
      }
})



//get the indivisual Student data using id
app.get('/students/:id', async (req, res) => {
      try{
           // const _id = req.params;
           const _id = req.params.id;
           const studentData = await Student.findById(_id);
           console.log(studentData);

           if(!studentData){
           return res.status(404).send();
           }else{
                 res.send(studentData)
           }
           
      }catch(err) {
            res.send(err)
      }

})


//patch or put(update) students by id
app.put('/students/:id', async (req, res) =>{
      try{
            const _id = req.params.id;
            const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
                  new : true
            });
            res.status(200).send(updateStudents);

      }catch(err){
            res.status(400).send(err);
      }
})


// delete student data by id

app.delete('/students/:id', async (req, res) =>{
      try {
        const _id = req.params.id;
        const deleteStudents = await Student.findByIdAndDelete(_id);
        if (!_id)
        {
            return res.status(400).send();
        } 
            res.status(200).send(deleteStudents);

      } catch (err) {
            res.status(500).send(err);
      }
})



// server running port 
app.listen(port, () => {
  console.log("server running on ${port:3000}");
});
