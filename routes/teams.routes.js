const {Router} = require("express");
const request = require('request');

const router = new Router();

// /api/teams
router.get(
    "/",
    async (req, res) => {
        try {
            request('https://x5-teams.herokuapp.com/teams', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.status(201).json(JSON.parse(body));
                }
            });
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

// /api/teams
router.put(
    "/",
    async (req, res) => {
        try {
            request({
                url: `https://x5-teams.herokuapp.com/teams/`,
                method: 'PUT',
                json: req.body
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.status(201).json(body);
                }
            });
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);


module.exports = router;