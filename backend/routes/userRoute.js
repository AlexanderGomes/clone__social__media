const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getAllUsers, getSingleUser, getUsersFriend,followUser, unfollowUser} = require('../controllers/user')



router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get('/friends/:id', getUsersFriend)
router.get('/:id', getSingleUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)



module.exports = router