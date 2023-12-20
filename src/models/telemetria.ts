import mongoose, { Schema, Document } from 'mongoose';

interface Measure {
  device_tag: string;
  values: {
    consumption: number;
  };
}

interface TelemetryDocument extends Document {
  time_stamp: string;
  server_tag: string | null;
  telemetry_type: string;
  measures: Measure;
}

const TelemetrySchema = new Schema<TelemetryDocument>({
  time_stamp: { type: String, required: true },
  server_tag: { type: String, default: null },
  telemetry_type: { type: String, required: true },
  measures: {
    device_tag: { type: String, required: true },
    values: {
      consumption: { type: Number, required: true },
    },
  },
});

const TelemetryModel = mongoose.model<TelemetryDocument>('Telemetria', TelemetrySchema, 'agua');

export default TelemetryModel;
