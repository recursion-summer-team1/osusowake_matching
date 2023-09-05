const pool = require("../../mysqlConnection");

const deleteUser = (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ error: "Missing user id" });
    }

    pool.query(
        "DELETE FROM User WHERE userId = ?;",
        [userId],
        (err, results) => {
            if (err) {
                console.error("user.js: sql execute error");
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            console.log("user.js: sql execute success");
            res.json({ message: `User ${userId} deleted successfully` });
        }
    );
};

module.exports = deleteUser;