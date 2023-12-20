import { Request, Response } from 'express';
import TelemetryModel from '../models/telemetria';

const telemetryController = {
  post: async (req: Request, res: Response) => {
    try {
      const { time_stamp, server_tag, telemetry_type, measures } = req.body;
      const { device_tag, values } = measures;
      const { consumption } = values;

      const telemetria = new TelemetryModel({
        time_stamp,
        server_tag,
        telemetry_type,
        measures: {
          device_tag,
          values: { consumption },
        },
      });

      await telemetria.validate();
      const telemetriaSalva = await telemetria.save();
      res.status(201).json(telemetriaSalva);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  getday: async (req: Request, res: Response) => {
    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      console.log('Início do dia:', startOfDay);

      const result = await TelemetryModel.aggregate([
        {
          $match: {
            telemetry_type: 'water',
            'time_stamp': { $gte: startOfDay },
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: { date: '$time_stamp', timezone: 'America/Sao_Paulo' } },
            },
            consumptionSum: { $sum: '$measures.values.consumption' },
          },
        },
        {
          $sort: { '_id.hour': 1 },
        },
      ]);

      console.log('Resultado da agregação:', result);

      const water = result.map((item) => item.consumptionSum);
      const axis = result.map((item) => `${item._id.hour}:00`);

      console.log('Array "water":', water);
      console.log('Array "axis":', axis);

      res.status(200).json({ water, axis });
    } catch (err) {
      console.error('Erro na rota GET:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};

export default telemetryController;
