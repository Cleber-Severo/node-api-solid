import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUSeCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invallid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUSeCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUSeCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'johndoe@test.com',
      password_hash: await hash('123456', 6),
      name: 'John Doe',
    })

    const { user } = await sut.execute({
      email: 'johndoe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'johndoe@test.com',
      password_hash: await hash('123456', 6),
      name: 'John Doe',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
