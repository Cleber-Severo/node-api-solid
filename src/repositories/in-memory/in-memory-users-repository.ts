import { User, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    // eslint-disable-next-line prettier/prettier
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    // eslint-disable-next-line prettier/prettier
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
      email: data.email,
    }

    this.items.push(user)

    return user
  }
}
