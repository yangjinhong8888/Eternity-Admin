import { userService } from "@/services/userService.ts"

/**
 * 首页加载时检查用户登录状态
 * 如果未登录则跳转到登录页，已登录则返回用户信息
 */
export const userInfoLoader = async () => {
  try {
    const result= await userService.getUserInfo();
    return result?.data ?? null;
  } catch (error) {
    // 处理获取用户信息失败的情况
    console.error('Failed to fetch user info:', error);
    return null;
  }
};
