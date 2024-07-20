const db = require("../database");

const createMember = (
  firstName,
  middleName,
  lastName,
  idNumber,
  dateOfBirth,
  photo,
  callback
) => {
  // Validate required fields
  if (!firstName || !lastName || !idNumber || !dateOfBirth || !photo) {
    const error = new Error("Missing required fields");
    error.status = 400;
    return callback(error);
  }

  const query =
    "INSERT INTO members (firstName, middleName, lastName, idNumber, dateOfBirth, photo) VALUES (?, ?, ?, ?, ?, ?)";
  const selectQuery = "SELECT * FROM members WHERE id = last_insert_rowid()";

  db.run(
    query,
    [firstName, middleName, lastName, idNumber, dateOfBirth, photo],
    function (err) {
      if (err) return callback(err);

      const memberId = this.lastID;

      // get created member as response
      db.get(selectQuery, [], (err, member) => {
        if (err) {
          return callback(err);
        }
        callback(null, member);
      });
    }
  );
};

const getAllMembers = (callback) => {
  const query = "SELECT * FROM members";
  db.all(query, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

module.exports = {
  createMember,
  getAllMembers,
};
