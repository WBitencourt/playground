export interface IBookingLegado {
  processo: string;
  createdAt: string;
  updatedAt: string;
  sistema: string;
  pasta: string;
  tipoDemanda: string;
  uuid: string;
  payloadOriginal: string;
}

export interface IDynamoDBBookingLegadoRepository {
  read: () => Promise<IBookingLegado[]>;
  getPageKey: () => Record<string, any> | undefined;
  setPageKey: (pageKey: Record<string, any> | undefined) => void;
}

export interface IPostgreSQLBookingLegadoRepository {
  create: (bookingLegado: IBookingLegado) => Promise<void>;
  createMany: (batch: IBookingLegado[]) => Promise<void>;
}