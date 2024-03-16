const Problem = require('../models/problemModel')

const addProblem = async (req,res)=>{
    try{
        const{name,category,description,difficulty,testCases,grade,initialCode,programmingLanguage} = req.body;
        const problem = await Problem.create({
            name,
            category,
            description,
            difficulty,
            testCases,
            grade,
            initialCode,
            programmingLanguage
        })

        return res.status(201).json({problem})


    }

    catch(err){
        console.log(err)
        return res.status(400).json({msg : 'Error Occured',error : err.message})
    }

}

const getProblems = async (req,res)=>{
    console.log("get problems")
    try{
        const problems = await Problem.find()
        return res.status(200).json({problems})
    }
    catch(err){
        return res.status(400).json({msg : 'Error Occured'})
    }
}

module.exports = {addProblem,getProblems}