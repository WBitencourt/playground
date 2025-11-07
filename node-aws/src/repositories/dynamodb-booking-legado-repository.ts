import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../lib/db-dynamodb";

import { 
  IDynamoDBBookingLegadoRepository, 
  IBookingLegado, 
} from "./booking-legado-repository";

export class DynamoDBBookingLegadoRepository implements IDynamoDBBookingLegadoRepository {
  private readonly PAGE_LIMIT = undefined;
  private readonly tableName = "TblProdBookingLegado";

  private PAGE_KEY: Record<string, any> | undefined = undefined;

  constructor() {}

  public async read(): Promise<IBookingLegado[]> {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
        Limit: this.PAGE_LIMIT,
        ExclusiveStartKey: this.PAGE_KEY,
      });

      const response = await dynamoClient.send(command);

      const items: IBookingLegado[] = response.Items?.map((item) => ({
        processo: item?.pk,
        createdAt: item?.created_at,
        updatedAt: item?.updated_at,
        sistema: item?.sk,
        pasta: item?.pasta,
        tipoDemanda: item?.tipo_demanda,
        uuid: item?.uuid,
        payloadOriginal: item?.payload_original,
      })) || [];

      this.setPageKey(response?.LastEvaluatedKey);

      return items;
    } catch (error) {
      console.error("Erro ao escanear a tabela:", error);

      throw new Error(`Falha ao buscar dados da Booking legado`);
    }
  }

  public getPageKey(): Record<string, any> | undefined {
    return this.PAGE_KEY;
  }

  public setPageKey(pageKey: Record<string, any> | undefined): void {
    this.PAGE_KEY = pageKey;
  }
}

// public async read(): Promise<IBookingLegado[]> {
//   let items: IBookingLegado[] = [];

//   try {
//     do {
//       const command = new ScanCommand({
//         TableName: this.tableName,
//         Limit: this.PAGE_LIMIT,
//         ExclusiveStartKey: this.PAGE_KEY,
//       });

//       const response = await dynamoClient.send(command);

//       const page: IBookingLegado[] = response.Items?.map((item) => ({
//         processo: item?.pk,
//         createdAt: item?.created_at,
//         updatedAt: item?.updated_at,
//         sistema: item?.sk,
//         pasta: item?.pasta,
//         tipoDemanda: item?.tipo_demanda,
//         uuid: item?.uuid,
//         payloadOriginal: item?.payload_original,
//       })) || [];

//       items = items.concat(page);

//       this.PAGE_KEY = response.LastEvaluatedKey;
//     } while (this.PAGE_KEY !== undefined);

//     return items;
//   } catch (error) {
//     console.error("Erro ao escanear a tabela:", error);

//     throw new Error(`Falha ao buscar dados da Booking legado`);
//   }
// }