import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckinUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(CheckInsRepository, GymsRepository)

  return useCase
}
