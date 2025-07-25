import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hotels API Running... 🚀');
});

router.post('/', async (req, res) => {
    res.send('Create Hotel... 🚀');
});

// put request
router.put('/:id', async (req, res) => {
    res.send('Update Hotel... 🚀');
});

// delete request
router.delete('/:id', async (req, res) => {
    res.send('Delete Hotel... 🚀');
});

export default router;