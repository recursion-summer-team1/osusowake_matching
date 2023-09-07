const pool = require("../../mysqlConnection");

const getDealbyRequester = (req, res) => {
  const requesterId = req.params.requesterId;
  if (!requesterId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  pool.query(
    "SELECT * from Deal WHERE requesterId = ? AND isComplete = FALSE;",
    [requesterId],
    (err, results) => {
      if (err) {
        console.error("deals-getbyrequester.js: sql execute error");
      } else {
        console.log("deals-getbyrequester.js: sql execute success");
      }
      res.send(results);
    },
  );
};

module.exports = getDealbyRequester;
