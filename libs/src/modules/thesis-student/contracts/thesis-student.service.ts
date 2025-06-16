import { CreateThesisStudentDTO } from '../dto/create-thesis-student.dto';
import { ResponseThesisStudentDTO } from '../dto/response-thesis-student.dto';
import { UpdateThesisStudentDTO } from '../dto/update-thesis-student.dto';

export const THESISSTUDENT_SERVICE_KEY = Symbol('IThesisStudentService');

export interface IThesisStudentService {
  create(data: CreateThesisStudentDTO): Promise<ResponseThesisStudentDTO>;

  update(
    id: number,
    data: UpdateThesisStudentDTO,
  ): Promise<ResponseThesisStudentDTO>;

  findById(id: number): Promise<ResponseThesisStudentDTO>;

  findAll(): Promise<ResponseThesisStudentDTO[]>;

  delete(id: number): Promise<void>;
}
