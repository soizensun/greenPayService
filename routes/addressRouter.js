const AddressController = require ('../controller/address')

const router = require("express").Router()

router.get('/:id', AddressController.getAddress)

module.exports = router
