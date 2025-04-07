export interface IWriteableRepository<T> {
  create(item: T): Promise<T>;
  update(id: number, item: T): Promise<T>;
  delete(id: number): Promise<boolean>;
}
export interface IReadableRepository<T> {
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}
