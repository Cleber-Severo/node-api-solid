import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: null,
      latitude: -23.4027,
      longitude: -46.7381,
    })

    await gymsRepository.create({
      title: 'far Gym',
      description: 'A gym for Typescript enthusiasts',
      phone: null,
      latitude: -23.7146,
      longitude: -46.56972,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4027,
      userLongitude: -46.7381,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it('Should be able to fetch paginated gyms search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       title: `JavaScript Gym ${i}`,
  //       description: 'A gym for JavaScript enthusiasts',
  //       phone: null,
  //       latitude: -23.5505,
  //       longitude: -46.6333,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'JavaScript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'JavaScript Gym 21' }),
  //     expect.objectContaining({ title: 'JavaScript Gym 22' }),
  //   ])
  // })
})
