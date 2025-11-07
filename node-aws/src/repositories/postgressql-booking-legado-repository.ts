import { postgresPool } from "../lib/db-postgres";
import { IBookingLegado, IPostgreSQLBookingLegadoRepository } from "./booking-legado-repository";

export class PostgreSQLBookingLegadoRepository implements IPostgreSQLBookingLegadoRepository {
  public async create(bookingLegado: IBookingLegado): Promise<void> {
    try {
      const query = [
        'INSERT INTO CLIENTE.BOOKING_LEGADOS',
        '(processo, created_at, updated_at, sistema, pasta, tipo_demanda, uuid, payload_original)',
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        'ON CONFLICT (processo, sistema) DO NOTHING'
      ].join(' ');
      
      const values = [
        bookingLegado.processo,
        bookingLegado.createdAt || new Date().toISOString(),
        bookingLegado.updatedAt || new Date().toISOString(),
        bookingLegado.sistema,
        bookingLegado.pasta,
        bookingLegado.tipoDemanda,
        bookingLegado.uuid,
        bookingLegado.payloadOriginal
      ];

      await postgresPool.query(query, values);
    } catch (error) {
      console.error("Erro ao criar a Booking legado:", error?.message);
      throw new Error(`Falha ao criar a Booking legado: ${error?.message}`);
    }
  }

  public async createMany(batch: IBookingLegado[]): Promise<void> {
    try {
      if (batch.length === 0) {
        return;
      }

      const columns = [
        'processo', 
        'created_at', 
        'updated_at', 
        'sistema', 
        'pasta', 
        'tipo_demanda', 
        'uuid', 
        'payload_original'
      ];

      let index = 1;
      const valuesParametrized: any[] = [];
      const valuesQuery: string[] = [];

      for (const item of batch) {
        const placeholders = columns.map(() => `$${index++}`).join(', ');
        valuesQuery.push(`(${placeholders})`);

        valuesParametrized.push(item.processo);
        valuesParametrized.push(item.createdAt || new Date().toISOString());
        valuesParametrized.push(item.updatedAt || new Date().toISOString());
        valuesParametrized.push(item.sistema);
        valuesParametrized.push(item.pasta);
        valuesParametrized.push(item.tipoDemanda);
        valuesParametrized.push(item.uuid);
        valuesParametrized.push(item.payloadOriginal);
      }

      const columnsQuery = columns.join(', ');

      const query = [
        `INSERT INTO CLIENTE.BOOKING_LEGADOS (${columnsQuery})`,
        `VALUES ${valuesQuery.join(', ')}`,
        'ON CONFLICT (processo, sistema) DO NOTHING'
      ].join(' ');

      await postgresPool.query(query, valuesParametrized);

      console.log(`Lote de ${batch.length} registros inserido com sucesso.`);

      // INSERT INTO CLIENTE.BOOKING_LEGADOS 
      // (processo, created_at, updated_at, sistema, pasta, tipo_demanda, uuid, payload_original) 
      // VALUES 
      // ($1, $2, $3, $4, $5, $6, $7, $8), 
      // ($9, $10, $11, $12, $13, $14, $15, $16), 
      // ($17, $18, $19, $20, $21, $22, $23, $24), 
      // ($25, $26, $27, $28, $29, $30, $31, $32), 
      // ($33, $34, $35, $36, $37, $38, $39, $40), 
      // ($41, $42, $43, $44, $45, $46, $47, $48), 
      // ($49, $50, $51, $52, $53, $54, $55, $56), 
      // ($57, $58, $59, $60, $61, $62, $63, $64), 
      // ($65, $66, $67, $68, $69, $70, $71, $72), 
      // ($73, $74, $75, $76, $77, $78, $79, $80) 
      // ON CONFLICT (processo, sistema) DO NOTHING

    } catch (error) {
      console.error("Erro ao criar a Booking legado:", error?.message);
      // Log extra para depuração
      console.error("Batch size:", batch.length);
      throw new Error(`Falha ao criar a Booking legado: ${error?.message}`);
    }
  }
}
