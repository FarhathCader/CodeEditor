const Submission = require("../models/submissionModel");

const postSubmission = async (req, res) => {
    try{
        const {problemId,  code, language,  grade} = req.body;
        const submission = await Submission.create({
            problemId,
            code,
            language,
            grade
        });
        return res.status(201).json({submission});
    }
    catch(err){
        return res.status(400).json({error : err.message})
    }
}

module.exports = {postSubmission}