const Developer=require("../models/developer.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Secret = process.env.SECRET_KEY;

module.exports={
    register: (req, res) => {
        Developer.create(req.body)
          .then(Developer => {
              const DeveloperToken = jwt.sign({id: Developer._id}, process.env.SECRET_KEY);
              res.cookie("Developertoken", DeveloperToken, {httpOnly: true })
                  .json({ msg: "success!", Developer: Developer });
          })
          .catch(err => res.status(400).json(err))
      },


      login: async(req, res) => {
        const developer = await Developer.findOne({ email: req.body.email });
            if(developer === null) {
            // email not found in Developers collection
            return res.sendStatus(400);
        }
          const correctPassword = await bcrypt.compare(req.body.password, developer.password);
             if(!correctPassword) {
            return res.sendStatus(400);
        }
        const developerToken = jwt.sign({
            id: developer._id
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("Developertoken", developerToken, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },
  
    logout: (req, res) => {
        res.clearCookie('Developertoken');
        res.sendStatus(200);
    },
    
    getLoggedDeveloper: async(req, res) => {
        const DeveloperToken = jwt.sign({id: Developer._id}, process.env.SECRET_KEY);
        const Developer = jwt.verify(req.cookie.Developertoken, process.env.SECRET_KEY)


        // //const Developer = jwt.verify(req.cookies.Developertoken, process.env.SECRET_KEY)
        // console.log('Developer1    :',Developer)
        // Developer.findOne({ _id:Developer.id })
        //     .then((Developer) => {
        //     res.json(Developer );
        // })
        // .catch((err )=> {console.log(err)});
        //}   
}
}



module.exports.getAllDevelopers = (request, response) => {
    Developer.find({})
        .then(Developers => {
            response.json(Developers);
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getOneDeveloper=(request,response)=>{
    Developer.findOne({email:request.params.email})
    .then(Developer=>{
        response.json(Developer)
    })
    .catch(err => {
        response.json(err)
    })
}

module.exports.updateDeveloper = (request, response) => {
    Developer.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedDeveloper => response.json(updatedDeveloper))
        .catch(err => response.json(err))
}

module.exports.deleteDeveloper = (request, response) => {
    Developer.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.getAllDevelopersWithSkills = (request, response) => {
    Developer.aggregate([
      {
        $lookup: {
          from: 'skills',
          localField: '_id',
          foreignField: 'devId',
          as: 'developerskills',
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          bio: '$developerskills.bio',
          languages: '$developerskills.languages',
        },
      },
    ])
      .then((data) => {
        response.json(data);
      })
      .catch((err) => {
        console.error(err);
        response.json(err);
      });
  };


