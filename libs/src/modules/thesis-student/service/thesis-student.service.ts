import { Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IThesisStudentService } from '../contracts/thesis-student.service';
import {
  IThesisStudentRepository,
  THESISSTUDENT_REPOSITORY_KEY,
} from '../contracts/thesis-student.repository';
import {
  IStudentService,
  STUDENT_SERVICE_KEY,
} from '../../student/contracts/student.service';
import {
  IThesisService,
  THESIS_SERVICE_KEY,
} from '../../thesis/contracts/thesis.service';
import { CreateThesisStudentDTO } from '../dto/create-thesis-student.dto';
import { UpdateThesisStudentDTO } from '../dto/update-thesis-student.dto';
import { ResponseThesisStudentDTO } from '../dto/response-thesis-student.dto';
import { plainToInstance } from 'class-transformer';
import { ThesisStatus } from '../../thesis/models/thesis';
import { ThesisStudent } from '../models/thesis-student';

export class ThesisStudentService implements IThesisStudentService {
  constructor(
    @Inject(THESISSTUDENT_REPOSITORY_KEY)
    private readonly _thesisStudentRepository: IThesisStudentRepository,
    @Inject(STUDENT_SERVICE_KEY)
    private readonly _studentService: IStudentService,
    @Inject(THESIS_SERVICE_KEY)
    private readonly _thesisService: IThesisService,
  ) {}

  async create(
    data: CreateThesisStudentDTO,
  ): Promise<ResponseThesisStudentDTO> {
    const { studentId, thesisId } = data;

    const student = await this._studentService.getById(studentId);
    if (!student) throw new NotFoundException('Estudiante no encontrado');

    const thesis = await this._thesisService.findById(thesisId);
    if (!thesis) throw new NotFoundException('Tesis no encontrada');

    const existing =
      await this._thesisStudentRepository.findByStudentWithThesis(studentId);
    if (
      existing &&
      [ThesisStatus.Submitted, ThesisStatus.UnderReview].includes(
        existing.thesis.status,
      )
    ) {
      throw new ConflictException('El estudiante ya tiene una tesis activa');
    }

    const count = await this._thesisStudentRepository.countByThesisId(thesisId);
    if (count >= 2) {
      throw new ConflictException(
        'La tesis ya tiene dos estudiantes asignados',
      );
    }
    const alreadyAssigned =
      await this._thesisStudentRepository.findByStudentAndThesis(
        studentId,
        thesisId,
      );
    if (alreadyAssigned) {
      throw new ConflictException(
        'El estudiante ya está asignado a esta tesis',
      );
    }

    const thesisStudent = plainToInstance(ThesisStudent, data);

    const created = await this._thesisStudentRepository.create(thesisStudent);

    return plainToInstance(ResponseThesisStudentDTO, created);
  }

  async update(
    id: number,
    data: UpdateThesisStudentDTO,
  ): Promise<ResponseThesisStudentDTO> {
    const existing = await this._thesisStudentRepository.findById(id);
    if (!existing) throw new NotFoundException('Asignación no encontrada');

    Object.assign(existing, data);
    const saved = await this._thesisStudentRepository.update(id, existing);

    return plainToInstance(ResponseThesisStudentDTO, saved);
  }

  async findById(id: number): Promise<ResponseThesisStudentDTO> {
    const entity = await this._thesisStudentRepository.findById(id);
    if (!entity) throw new NotFoundException('Asignación no encontrada');
    return plainToInstance(ResponseThesisStudentDTO, entity);
  }

  async findAll(): Promise<ResponseThesisStudentDTO[]> {
    const list = await this._thesisStudentRepository.findAll();
    return list.map((item) => plainToInstance(ResponseThesisStudentDTO, item));
  }

  async delete(id: number): Promise<void> {
    const existing = await this._thesisStudentRepository.findById(id);
    if (!existing) throw new NotFoundException('Asignación no encontrada');

    await this._thesisStudentRepository.delete(existing.id);
  }
}
