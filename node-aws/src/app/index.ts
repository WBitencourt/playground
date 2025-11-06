import { PostgreSQLBookingLegadoRepository } from "../repositories/postgressql-booking-legado-repository";
import { DynamoDBBookingLegadoRepository } from "../repositories/dynamodb-booking-legado-repository";
import { BookingMigrationUseCase } from "../use-cases/booking-migration-use-case";

async function main() {
  const bookingLegadoPostgreSQLRepository = new PostgreSQLBookingLegadoRepository();
  const bookingLegadoDynamoDBRepository = new DynamoDBBookingLegadoRepository();

  const bookingMigrationUseCase = new BookingMigrationUseCase({
    sourceRepository: bookingLegadoDynamoDBRepository,
    destinationRepository: bookingLegadoPostgreSQLRepository
  });

  console.log('Iniciando migração de Booking legado: ' + new Date().toISOString());

  await bookingMigrationUseCase.execute();

  console.log('Migração de Booking legado finalizada: ' + new Date().toISOString());
}

main();