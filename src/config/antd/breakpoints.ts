export const breakpointMin = {
  xs: 576,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

export const antdScreenTokens = {
  screenXXL: breakpointMin.xxl,
  screenXXLMin: breakpointMin.xxl,
  screenXLMax: breakpointMin.xxl,
  screenXL: breakpointMin.xl,
  screenXLMin: breakpointMin.xl,
  screenLGMax: breakpointMin.xl,
  screenLG: breakpointMin.lg,
  screenLGMin: breakpointMin.lg,
  screenMDMax: breakpointMin.lg,
  screenMD: breakpointMin.md,
  screenMDMin: breakpointMin.md,
  screenSMMax: breakpointMin.md,
  screenSM: breakpointMin.sm,
  screenSMMin: breakpointMin.sm,
  screenXSMax: breakpointMin.sm - 1,
  screenXS: breakpointMin.xs,
  screenXSMin: breakpointMin.xs,
} as const

export const getBelowBreakpointQuery = (
  breakpoint: keyof typeof breakpointMin
): string => {
  return `(max-width: ${breakpointMin[breakpoint] - 0.02}px)`
}
