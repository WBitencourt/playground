import { IBookingLegadoRepository } from "../repositories/booking-legado-repository";

interface IBookingMigrationUseCase {
  sourceRepository: IBookingLegadoRepository;
  destinationRepository: IBookingLegadoRepository;
}

export class BookingMigrationUseCase {
  private readonly BATCH_SIZE = 50;
  private sourceRepo: IBookingLegadoRepository;
  private destinationRepo: IBookingLegadoRepository;

  constructor({
    sourceRepository,
    destinationRepository,
  }: IBookingMigrationUseCase) {
    this.sourceRepo = sourceRepository;
    this.destinationRepo = destinationRepository;
  }

  public async execute() { 
    try {
      const sourceBookingLegado = await this.sourceRepo.read();

      for (let i = 0; i < sourceBookingLegado.length; i += this.BATCH_SIZE) {
        const batch = sourceBookingLegado.slice(i, i + this.BATCH_SIZE);

        const promises = batch.map(bookingLegado => 
          this.destinationRepo.create(bookingLegado)
        );
        
        console.log(`Processando lote de ${batch.length} (iniciando em ${i})`);
        
        await Promise.all(promises);
      }

    } catch (error) {
      console.error(`Falha ao migrar booking legado:`, error.message);
    }
  }
}