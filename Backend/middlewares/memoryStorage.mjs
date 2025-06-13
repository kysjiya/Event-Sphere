import multer from 'multer';

const storage = multer.memoryStorage(); // or configure disk storage
const upload = multer({ storage });

app.post('/api/expo', upload.single('floorPlan'), createExpo);

const upload2 = multer({ storage: multer.memoryStorage() });
router.put('/expos/:id', authenticateUser, upload2.single('floorPlan'), updateExpo);
