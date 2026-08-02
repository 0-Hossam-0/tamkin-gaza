import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UserModel } from 'src/DataBase/Models/user.model';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { AdminFilterUsersDto } from './Dtos/admin-filter-users.dto';
import { BanUserDto } from './Dtos/ban-user.dto';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  /**
   * Find a user by their UUID
   */
  async findByUuid(uuid: string): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { uuid } });
  }

  /**
   * Find a user by their ID
   */
  async findById(id: number): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { _id: id } });
  }

  /**
   * Find a user by their email
   */
  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Update a user by their UUID
   */
  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    await this.userRepository.update({ uuid }, updateUserDto);
    return this.findByUuid(uuid);
  }

  /**
   * Update a user by their ID
   */
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<UserModel | null> {
    await this.userRepository.update({ _id: id }, updateUserDto);
    return this.findById(id);
  }

  /**
   * Delete a user by their UUID
   */
  async delete(uuid: string): Promise<void> {
    await this.userRepository.softDelete({ uuid });
  }

  /**
   * Get all users with pagination
   */
  async findAll(page: number = 1, limit: number = 10) {
    const [data, totalItems] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Get user profile by UUID
   */
  async getProfile(uuid: string): Promise<UserModel | null> {
    return this.findByUuid(uuid);
  }

  /**
   * Admin: Get all users with filtering, search, and pagination
   */
  async findAllAdmin(filters: AdminFilterUsersDto) {
    const { search, role, isBanned, page = 1, limit = 10 } = filters;

    const where: any = {};

    // Search by name or email
    if (search) {
      where.firstName = Like(`%${search}%`);
      where.lastName = Like(`%${search}%`);
      where.email = Like(`%${search}%`);
    }

    // Filter by role
    if (role) {
      where.role = role;
    }

    // Filter by ban status
    if (isBanned !== undefined) {
      where.isBanned = isBanned;
    }

    const [data, totalItems] = await this.userRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Admin: Get a single user by UUID with all details
   */
  async findOneAdmin(uuid: string): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { uuid } });
  }

  /**
   * Admin: Ban or unban a user
   */
  async banUser(uuid: string, banUserDto: BanUserDto): Promise<UserModel | null> {
    const user = await this.findByUuid(uuid);
    if (!user) {
      return null;
    }

    // Prevent banning admin and super_admin users
    if (
      banUserDto.isBanned &&
      (user.role === UserRoleEnum.ADMIN || user.role === UserRoleEnum.SUPER_ADMIN)
    ) {
      throw new Error('Cannot ban admin or super_admin users');
    }

    const updateData: any = {
      isBanned: banUserDto.isBanned,
      banReason: banUserDto.reason || null,
    };

    if (banUserDto.isBanned) {
      updateData.bannedAt = new Date();
    } else {
      updateData.bannedAt = null;
    }

    await this.userRepository.update({ uuid }, updateData);
    return this.findByUuid(uuid);
  }

  /**
   * Admin: Update user role (for ADMIN and below)
   */
  async updateUserRole(uuid: string, role: UserRoleEnum): Promise<UserModel | null> {
    // Prevent promoting to super_admin via this endpoint
    if (role === UserRoleEnum.SUPER_ADMIN) {
      throw new Error('Cannot promote to super_admin via this endpoint');
    }
    await this.userRepository.update({ uuid }, { role });
    return this.findByUuid(uuid);
  }

  /**
   * Check if a user is banned
   */
  async isBanned(uuid: string): Promise<boolean> {
    const user = await this.findByUuid(uuid);
    return user?.isBanned || false;
  }
}
