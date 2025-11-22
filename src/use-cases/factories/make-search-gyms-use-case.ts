import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(GymsRepository)

  return useCase
}
