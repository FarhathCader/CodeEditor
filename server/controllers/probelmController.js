const Problem = require('../models/problemModel')
const { Types } = require('mongoose').mongo;

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
        return res.status(400).json({msg : err.message})
    }
}

const getProblem = async (req,res)=>{
    try{
        const problem = await Problem.findById(req.params.id.toString())
    console.log("getting problem",problem.name)

        return res.status(200).json({problem})
    }
    catch(err){
        return res.status(400).json({msg : err.message})
    }
}

const updateInitialCode = async (req, res) => {
    
    try {
        // Find the problem by ID
        const problem = await Problem.findById(req.params.id);

        console.log("updateing",problem.name," problem")

        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        // Update initialCode and programmingLanguage if provided in the request body
        if (req.body.initialCode) {
            problem.initialCode = req.body.initialCode;
        }
        if (req.body.programmingLanguage) {
            problem.programmingLanguage = req.body.programmingLanguage;
        }

        // Save the updated problem
        await problem.save();

        // Return the updated problem in the response
        return res.status(200).json({ problem });
    } catch (err) {
        // Handle errors
        return res.status(400).json({ msg: err.message });
    }
};

module.exports = {addProblem,getProblems,getProblem,updateInitialCode}