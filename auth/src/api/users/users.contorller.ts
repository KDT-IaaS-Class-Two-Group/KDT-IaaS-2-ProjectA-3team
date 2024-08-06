// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { Request } from "express";
import { QueryBuilder } from "src/database/queryBuilder"; // 실제 경로로 수정 필요

@Controller("/getUser")
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get("/all")
  async getAllUsers() {
    try {
      const users = await this.queryBuilder.SELECT(["*"], "users").execution();
      return users;
    } catch (error) {
      console.error("모든 사용자 정보 조회 실패:", error);
      throw new Error("모든 사용자 정보 조회 실패");
    }
  }

  @Get("/userpersonal")
  async getUserPersonal(@Req() req: Request) {
    const userId = req.session?.user?.user_id;
    if (!userId) {
      return { message: "세션 아이디가 없습니다." };
    }

    try {
      const user = await this.queryBuilder
        .SELECT(
          [
            "user_id",
            "username",
            "birth_date",
            "address",
            "phone",
            "email",
            "password",
          ],
          "users"
        )
        .WHERE("user_id = $1", userId)
        .execution();

      if (Array.isArray(user) && user.length > 0) {
        return user;
      } else {
        return { message: "사용자 정보를 찾을 수 없습니다." };
      }
    } catch (error) {
      console.error("사용자 개인 정보 조회 실패:", error);
      throw new Error("사용자 개인 정보 조회 실패");
    }
  }

  @Get("/userprofile")
  async getUserProfile() {
    try {
      const profiles = await this.queryBuilder
        .SELECT(["*"], "Profile")
        .execution();
      if (Array.isArray(profiles) && profiles.length > 0) {
        return profiles;
      } else {
        return { message: "프로필 정보를 찾을 수 없습니다." };
      }
    } catch (error) {
      console.error("프로필 조회 오류:", error);
      throw new Error("프로필 정보를 가져오는 중 오류 발생");
    }
  }

  @Get("/fields")
  async getFields() {
    try {
      const fields = await this.queryBuilder
        .SELECT(["field_name"], "field")
        .execution();
      if (Array.isArray(fields) && fields.length > 0) {
        return fields;
      } else {
        return { message: "필드 정보를 찾을 수 없습니다." };
      }
    } catch (error) {
      console.error("필드 조회 실패:", error);
      throw new Error("필드 정보를 조회하는 중 오류 발생");
    }
  }

  @Post("/all")
  async saveUsers(@Body() body: any) {
    const users = body.users;
    if (!Array.isArray(users)) {
      throw new BadRequestException("잘못된 데이터 형식");
    }

    try {
      for (const user of users) {
        if (!user.user_id) {
          throw new Error(`사용자 ID가 없습니다: ${JSON.stringify(user)}`);
        }

        const salary = parseFloat(user.salary);
        if (isNaN(salary)) {
          throw new Error(`유효하지 않은 급여 값: ${user.salary}`);
        }

        const existingUser = await this.queryBuilder
          .SELECT(["*"], "relation_users_role")
          .WHERE("user_id = $1", user.user_id)
          .execution();

        if (Array.isArray(existingUser) && existingUser.length > 0) {
          await this.queryBuilder
            .UPDATE(
              "relation_users_role",
              {
                role_name: user.role_name,
                salary: salary,
                field_name: user.field_name,
              },
              "user_id = $1",
              user.user_id
            )
            .execution();
        } else {
          await this.queryBuilder
            .INSERT("relation_users_role", {
              user_id: user.user_id,
              salary: salary,
              role_name: user.role_name,
              field_name: user.field_name,
            })
            .execution();
        }
      }
      return { message: "사용자 정보 저장 완료" };
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
      return { error: "사용자 정보 저장 실패" };
    }
  }

  @Post("/saveProfile")
  async saveProfile(@Body() body: any) {
    const { user_id, bio } = body;

    if (!user_id || !bio) {
      return { message: "사용자 ID와 바이오가 필요합니다." };
    }

    try {
      const existingProfile = await this.queryBuilder
        .SELECT(["*"], "Profile")
        .WHERE("user_id = $1", user_id)
        .execution();

      if (Array.isArray(existingProfile) && existingProfile.length > 0) {
        await this.queryBuilder
          .UPDATE("Profile", { bio: bio }, "user_id = $1", user_id)
          .execution();
      } else {
        await this.queryBuilder
          .INSERT("Profile", { user_id: user_id, bio: bio })
          .execution();
      }
      return { message: "프로필 정보 저장 완료" };
    } catch (error) {
      console.error("프로필 정보 저장 실패:", error);
      return { error: "프로필 정보 저장 실패" };
    }
  }

  @Post("/updateuser")
  async updateUser(@Body() data: any) {
    const { user_id, ...fields } = data;

    if (!user_id) {
      return { message: "사용자 ID가 필요합니다." };
    }

    try {
      await this.queryBuilder
        .UPDATE("checkusers", fields, "user_id = $1", user_id)
        .execution();
      console.log("사용자 정보 업데이트 완료");
      return { message: "사용자 정보가 업데이트되었습니다." };
    } catch (error) {
      console.error("사용자 정보 업데이트 오류:", error);
      return { message: "사용자 정보 업데이트 실패" };
    }
  }

  @Post("/insertuser")
  async insertUser(@Body() data: any) {
    const { username, birth_date, address, phone, email, password, user_id } =
      data;

    if (!user_id || !username || !password) {
      return { message: "사용자 ID, 이름, 비밀번호는 필수 항목입니다." };
    }

    try {
      await this.queryBuilder
        .INSERT("checkusers", {
          username,
          birth_date,
          address,
          phone,
          email,
          password,
          user_id,
        })
        .execution();
      console.log("사용자 추가 완료");
      return { message: "사용자가 추가되었습니다." };
    } catch (error) {
      console.error("사용자 추가 오류:", error);
      return { message: "사용자 추가 실패" };
    }
  }

  @Post("/checkprofile")
  async checkProfile(@Body() body: any) {
    const { user_id } = body;

    if (!user_id) {
      return { message: "사용자 ID가 필요합니다." };
    }

    try {
      // checkusers 테이블에서 사용자 정보를 조회
      const checkUser = await this.queryBuilder
        .SELECT(["*"], "checkusers")
        .execution();
      return checkUser;

      // if (Array.isArray(checkUser) && checkUser.length > 0) {
      //   // users 테이블의 데이터 업데이트
      //   await this.queryBuilder
      //     .UPDATE(
      //       "users",
      //       {
      //         username: checkUser[0].username,
      //         birth_date: checkUser[0].birth_date,
      //         address: checkUser[0].address,
      //         phone: checkUser[0].phone,
      //         email: checkUser[0].email,
      //         password: checkUser[0].password,
      //       },
      //       "user_id = $1",
      //       user_id
      //     )
      //     .execution();

      //   // checkusers 테이블에서 사용자 정보 삭제
      //   await this.queryBuilder
      //     .DELETE("checkusers", "user_id = $1", user_id)
      //     .execution();

      //   console.log("사용자 정보 업데이트 완료");
      //   return { message: "사용자 정보가 업데이트되었습니다." };
      // } else {
      //   return {
      //     message: "checkusers 테이블에서 사용자 정보를 찾을 수 없습니다.",
      //   };
      // }
    } catch (error) {
      console.error("사용자 정보 업데이트 오류:", error);
      return { message: "사용자 정보 업데이트 실패" };
    }
  }
}
