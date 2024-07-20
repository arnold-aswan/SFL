const memberModel = require("../models/memberModel");

const getAllMembers = (req, res) => {
  memberModel.getAllMembers((err, members) => {
    if (err) return res.status(500).json({ message: "Error fetching members" });
    res.json(members);
  });
};

const createMember = (req, res) => {
  const { firstName, middleName, lastName, idNumber, dateOfBirth } = req.body;

  const photo = req.file ? req.file.path : "/default-photo.jpg";
  console.log(photo, "File info:", req.file);
  console.log("Request Body:", req.body);

  memberModel.createMember(
    firstName,
    middleName,
    lastName,
    idNumber,
    dateOfBirth,
    photo,
    (err, member) => {
      if (err) {
        console.error("Error creating member:", err);
        if (err.status === 400) {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Error 500 creating member" });
      }
      const responseMember = {
        id: member.id,
        firstName: member.firstName,
        middleName: member.middleName,
        lastName: member.lastName,
        idNumber: member.idNumber,
        dateOfBirth: member.dateOfBirth,
        photo: member.photo,
        photoPath: photo,
      };
      res.status(201).json(responseMember);
    }
  );
};

module.exports = {
  getAllMembers,
  createMember,
};
