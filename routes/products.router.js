// const express = require('express');
// const faker = require('faker');

import express from 'express';
import faker from 'faker';

const router = express.Router();

router.get('/', (req, res) => {
  const {limit} = req.query;
  const pageSize = limit || 10;

  const products = [];
  for (let i = 0; i < pageSize; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }
  res.json(products);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if(id === '5') {
    res.status(404).json({
      message: 'Not Found'
    })
  } else {
    res.status(200).json(
      {
        id: id,
        name: "prod1",
        price: 1250
      }
    )
  }

})

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Created',
    data: body
  })
})


router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    id,
    message: 'Updated',
    data: body
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    message: 'Deleted'
  })
})


export default router;
