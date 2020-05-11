import { Document, Model, model, Schema } from 'mongoose';

export const SummitGraphqlDemoSchema: Schema = new Schema({
});

interface SummitGraphqlDemoModel extends SummitGraphqlDemoType , Document { }

interface SummitGraphqlDemoModelStatic extends Model <SummitGraphqlDemoModel> { }

export const SummitGraphqlDemo: Model<SummitGraphqlDemoModel> = model<SummitGraphqlDemoModel, SummitGraphqlDemoModelStatic>('SummitGraphqlDemo', SummitGraphqlDemoSchema);
