const {Router} = require("express");
const request = require('request');

const router = new Router();

// /api/positions/:id/load
router.put(
    "/:id/load",
    async (req, res) => {
        try {
            request({
                url: `https://x5-teams.herokuapp.com/positions/${req.body.id}/load`,
                method: 'PUT',
                json: req.body
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("body");
                    console.log(body);
                    res.status(201).json(body);
                    // res.status(201).json(JSON.parse(body));
                }
            });
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);

module.exports = router;