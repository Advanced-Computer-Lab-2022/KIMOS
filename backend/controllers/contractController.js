const Contract = require('../models/contractModel');

const getContract = async (id) => {
  const contract = await Contract.findById(id);
  return contract;
};

const createContract = async (title, terms, percentage) => {
  const cont = await Contract.create({
    title: title,
    terms: terms,
    percentage: percentage
  });
  return cont;
};

const addInstructor = async (contractId, instructorId) => {
  const cont = await Contract.findByIdAndUpdate(contractId, {
    instructors: { $push: { instructorId } }
  });
};

module.exports = {
  getContract,
  createContract,
  addInstructor
};
