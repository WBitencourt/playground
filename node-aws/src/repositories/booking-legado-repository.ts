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

export interface IBookingLegadoRepository {
  read: () => Promise<IBookingLegado[]>;
  create: (bookingLegado: IBookingLegado) => Promise<void>;
  createMany: (batch: IBookingLegado[]) => Promise<void>;
}