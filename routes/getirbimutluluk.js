const express = require("express");
const router = express.Router();
const Records = require("../models/Records");

router.post("/", async (request, response) => {
  var startDate = new Date(request.body.startDate);
  var endDate = new Date(request.body.endDate);
  var minCount = request.body.minCount;
  var maxCount = request.body.maxCount;
  var isStartDateLessThanEndDate = startDate.getTime() <= endDate.getTime();
  var isMinCountLessThanMaxCount = minCount < maxCount;
  if (isStartDateLessThanEndDate && isMinCountLessThanMaxCount) {
    // Reduce the number of rows by filtering over time, do the addition, filter again according to the result.
    Records.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $project: {
            _id: 0,
            key: "$key",
            createdAt: "$createdAt",
            totalCount: { $sum: "$counts" },
          },
        },
        {
          $match: {
            totalCount: {
              $gte: minCount,
              $lt: maxCount,
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          response.send(err);
        } else {
          //arrange response object
          var resp = { code: "0", msg: "Success", records: result };
          response.json(resp);
        }
      }
    );
  } else {
    if (isStartDateLessThanEndDate)
      response.send("StartDate should be less than EndDate");
    if (isMinCountLessThanMaxCount)
      response.send("MinCount should be less than MaxCount");
  }
});

module.exports = router;
