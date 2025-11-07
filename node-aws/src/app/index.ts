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

  const startTime = new Date();

  console.log('Migração iniciada em: ' + startTime.toISOString());

  await bookingMigrationUseCase.execute();

  const endTime = new Date();

  console.log('--------------------------------');
  console.log('Migração iniciada em: ' + startTime.toISOString());
  console.log('Migração finalizada em: ' + endTime.toISOString());
  console.log('Tempo de execução: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
  console.log('--------------------------------');
}

main();