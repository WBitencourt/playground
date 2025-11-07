import { 
  IDynamoDBBookingLegadoRepository, 
  IPostgreSQLBookingLegadoRepository 
} from "../repositories/booking-legado-repository";

interface IBookingMigrationUseCase {
  sourceRepository: IDynamoDBBookingLegadoRepository;
  destinationRepository: IPostgreSQLBookingLegadoRepository;
}

export class BookingMigrationUseCase {
  private readonly BATCH_SIZE = 300;
  private sourceRepo: IDynamoDBBookingLegadoRepository;
  private destinationRepo: IPostgreSQLBookingLegadoRepository;

  constructor({
    sourceRepository,
    destinationRepository,
  }: IBookingMigrationUseCase) {
    this.sourceRepo = sourceRepository;
    this.destinationRepo = destinationRepository;
  }

  public async execute() { 
    try {
      let pageKey: Record<string, any> | undefined = undefined;
      let totalProcessed = 0;

      do {
        const sourceBookingLegado = await this.sourceRepo.read();

        for (let i = 0; i < sourceBookingLegado.length; i += this.BATCH_SIZE) {
          const batch = sourceBookingLegado.slice(i, i + this.BATCH_SIZE);

          console.log(`Processando lote de ${batch.length} (iniciando em ${i})`);

          await this.destinationRepo.createMany(batch);
        }

        totalProcessed += sourceBookingLegado.length;

        console.log(`Total de registros processados até o momento: ${totalProcessed}`);
  
        pageKey = this.sourceRepo.getPageKey();
      } while (pageKey !== undefined);



    } catch (error) {
      console.error(`Falha ao migrar booking legado:`, error.message);
    }
  }
}