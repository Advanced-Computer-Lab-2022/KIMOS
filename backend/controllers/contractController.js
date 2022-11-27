const Contract = require('../models/contractModel');

const getContract = async (req, res) => {
  if (req.body.userType === 'instructor') {
    try {
      const contract = await Contract.findById(id);
      res.status(200).json({ contract });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
const createContract = async (req, res) => {
  const { userType, title, terms, percentage } = req.body;
  try {
    if (userType === 'administrator') {
      const contract = await Contract.create({
        title: title,
        terms: terms,
        percentage: percentage
      });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Contract entered successfully' });
};

const editContract = async (req, res) => {
  const { userType, contractId, newContract } = req.body;
  try {
    if (userType === 'administrator') {
      const contract = await Contract.findByIdAndUpdate(contractId, newContract);
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Contract entered successfully' });
};

const addInstructor = async (req, res) => {
  const { contractId, instructorId } = req.body;
  const cont = await Contract.findByIdAndUpdate(contractId, {
    $push: { instructors: instructorId }
  });
  res.status(200).json({ message: 'Success' });
};

module.exports = {
  getContract,
  createContract,
  addInstructor,
  editContract
};
