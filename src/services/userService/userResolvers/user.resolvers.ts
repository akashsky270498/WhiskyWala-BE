import { getAllUsersService } from "../userService/user.service";

export const userResolver = {
  Query: {
    users: async () => {
      const result = await getAllUsersService();

      if (result.error) {
        return {
          success: false,
          statusCode: result.status,
          message: result.message,
          errors: [result.message],
          data: [],
          meta: null,
        };
      }

      return {
        success: true,
        statusCode: result.status,
        message: result.message,
        data: result.data,
        errors: [],
        meta: null,
      };
    },
  },
};
