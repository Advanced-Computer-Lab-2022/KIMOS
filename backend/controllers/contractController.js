const Contract = require('../models/contractModel');



//6383b1fa6b97907bd6a90ca6
const tmpGetContract = async (req, res) => {
  if (req.query.userType === 'instructor') {
    try {
      const id = req.query.userId;
      const contract = await Contract.findById('6383b1fa6b97907bd6a90ca6');
      if(contract !== null && contract.instructors.includes(id))
        res.status(200).json({ accepted:true });
      else 
        res.status(200).json({ accepted:false });

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

const getContract = async (req, res) => {
  if (req.query.userType === 'instructor') {
    try {
      const id = req.query.userId;
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
//currently we will be working on only one contractId with ID = 9999
const addInstructor = async (req, res) => {
  const { instructorId } = req.body;
  const cont = await Contract.findByIdAndUpdate("6383b1fa6b97907bd6a90ca6", {
    $push: { instructors: instructorId }
  });
  res.status(200).json({ message: 'Success' });
};


const removeInstructor = async (req, res) => {
  const { instructorId } = req.query;


  const cont = await Contract.findByIdAndUpdate("6383b1fa6b97907bd6a90ca6", {
    $pull: { instructors: instructorId }
  });
  res.status(200).json({ message: 'Success' });
};

module.exports = {
  getContract,
  createContract,
  addInstructor,
  editContract,
  tmpGetContract,
  removeInstructor
};
