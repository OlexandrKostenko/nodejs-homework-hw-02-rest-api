const express = require('express');
const Joi = require('joi');

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required()
});

const contactsOperations = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  })
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
      })
      return
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field"
      })
      return
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
   try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
      })
      return
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required fields"
      })
      return
    }
    const result = await contactsOperations.updateContact(id, req.body);
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
