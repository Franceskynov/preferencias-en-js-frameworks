/**
 * @author Franceskynov
 * 
 */
const express = require('express');
const router = express.Router();

/**
 * 
 */
router.get('/', (req, res, next) => {
    res.locals.db.all("SELECT * FROM frameworks", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({
                message: "Error to connect to data base"
            });
        }
    });
});

/**
 * @description
 * Update the score of item
 */
router.put('/', (req, res, net) => {
    var body = req.body;
    
    if (body.name != null) {

        if (body.name.length > 0) {

            res.locals.db.all("SELECT * from frameworks WHERE name = ? LIMIT 1", body.name, (err, rows) => {

                if (!err) {
                    
                    if (rows.length > 0) {

                        res.locals.db.all("UPDATE frameworks SET score = score + 1 WHERE name = ?", body.name, (err2, rows) => {

                            if (!err2) {
                                res.json({
                                    message: "Updated",
                                    status: "Ok"
                                });

                            } else {

                                res.json({
                                    message: "No updated",
                                    status: "Err"
                                });
                            }
                        });

                    } else {

                        res.json({
                            message: "Item not found"
                        });
                    }

                } else {

                    res.json({
                        message: "Error to connect to data base"
                    });
                }
            });

        } else {
            res.json({
                message: "I need complete parameters"
            });
        }

    } else {

        res.json({
            message: "I need parameters"
        });
    }
});

module.exports = router;