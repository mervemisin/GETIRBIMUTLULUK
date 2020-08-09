const express = require('express');
const router = express.Router();
const Records = require('../models/Records');

router.post('/', async (request, response) => {
    var startDate = new Date(request.body.startDate);
    var endDate = new Date(request.body.endDate);
    var minCount = request.body.minCount;
    var maxCount = request.body.maxCount;
    Records.aggregate(
        [
            {'$match': {
                    createdAt : {
                        '$gte' : startDate,
                        '$lt' : endDate
                    }
                }
            },
            {$project : {
                    _id : 0,
                    key : "$key",
                    createdAt : "$createdAt",
                    totalCount: {$sum:"$counts"}
                }
            },
            {'$match': {
                    totalCount : { 
                        '$gte' : minCount, 
                        '$lt' :  maxCount 
                    }
                }
            } 
        ],
        function(err, result) {
          if (err) {
            response.send(err);
          } else {
            var resp = {code : "0", msg : "Success", "records" : result};
            response.json(resp);
          }
        }
      );
});


module.exports = router;