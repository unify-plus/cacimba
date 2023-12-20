import express from 'express';
import telemetria from '../controllers/telemetria';

const telemetriarouter = express.Router();
telemetriarouter.post('/',  telemetria.post);
telemetriarouter.get('/day', telemetria.getday);

export default telemetriarouter;