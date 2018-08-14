import 'reflect-metadata'
import { createConnection } from 'typeorm/browser'
import { Organisation, Hours } from './tables'

export default async function connectDB () {
  await createConnection({
    type: 'react-native',
    database: 'main',
    location: 'default',
    entities: [ Organisation, Hours ],
    synchronize: true,
    logging: true,
    //dropSchema: true
  })
}
