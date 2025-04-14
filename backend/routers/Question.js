const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionDB = require("../models/Question");

router.post("/", async (req, res) => {
  const questionData = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    user: req.body.user,
  });
  await questionData
    .save()
    .then((doc) => {
      res.status(201).send({
        status: true,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error while adding Question",
      });
    });
});

router.get("/", async (req, res) => {
  QuestionDB.aggregate([
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
            },
          },
        ],
        as: "answerDetails",
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
      res.status(201).send(questionDetails);
    })
    .catch((e) => {
      console.log("Erorr: ", e);
      res.status(400).send(e);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send({ message: "Invalid question ID" });
  }

  try {
    const questionWithAnswers = await QuestionDB.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "answers", 
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                answer: 1,
                question_id: 1,
                user: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    if (!questionWithAnswers || questionWithAnswers.length === 0) {
      return res.status(404).send({ message: "Question not found" });
    }

    res.status(200).send(questionWithAnswers[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
