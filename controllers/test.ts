export default class TestConroller {
    testReturn = function(req, res) {
        const query = req.query;

        return res.json({test: 'Hello world Mode'});
    }
}