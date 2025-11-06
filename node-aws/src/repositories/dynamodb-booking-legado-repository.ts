import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../lib/db-dynamodb";

import { 
  IBookingLegadoRepository, 
  IBookingLegado, 
} from "./booking-legado-repository";

export class DynamoDBBookingLegadoRepository implements IBookingLegadoRepository {
  private readonly SCAN_LIMIT = undefined;
  private readonly tableName = "TblProdBookingLegado";

  private PAGE_KEY: Record<string, any> | undefined = undefined;

  constructor() {}

  public async read(): Promise<IBookingLegado[]> {
    let items: IBookingLegado[] = [];

    try {
      do {
        const command = new ScanCommand({
          TableName: this.tableName,
          Limit: this.SCAN_LIMIT,
          ExclusiveStartKey: this.PAGE_KEY,
        });

        const response = await dynamoClient.send(command);

        const page: IBookingLegado[] = response.Items?.map((item) => ({
          processo: item?.pk,
          createdAt: item?.created_at,
          updatedAt: item?.updated_at,
          sistema: item?.sk,
          pasta: item?.pasta,
          tipoDemanda: item?.tipo_demanda,
          uuid: item?.uuid,
          payloadOriginal: item?.payload_original,
        })) || [];

        items = items.concat(page);

        this.PAGE_KEY = response.LastEvaluatedKey;
      } while (this.PAGE_KEY !== undefined);

      return items;
    } catch (error) {
      console.error("Erro ao escanear a tabela:", error);

      throw new Error(`Falha ao buscar dados da Booking legado`);
    }
  }

  public async create(bookingLegado: IBookingLegado): Promise<void> {
    try {
      return;
    } catch (error) {
      console.error("Erro ao criar a Booking legado:", error);
      throw new Error(`Falha ao criar a Booking legado`);
    }
  }

  public async createMany(batch: IBookingLegado[]): Promise<void> {
    try {
      return;
    } catch (error) {
      console.error("Erro ao criar a Booking legado:", error);
      throw new Error(`Falha ao criar a Booking legado`);
    }
  }
}