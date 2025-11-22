import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '123456',
    })

    const hasPassworodCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(hasPassworodCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with the same email twice', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      email,
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
