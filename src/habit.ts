export interface CheckState {
  walkDone: boolean;
  streak: number;
}

export const BASE_STREAK = 12;

export function toggleWalk(s: CheckState): CheckState {
  return s.walkDone
    ? { walkDone: false, streak: BASE_STREAK }
    : { walkDone: true, streak: BASE_STREAK + 1 };
}

export const doneCount = (walkDone: boolean): number => (walkDone ? 3 : 2);

export const BURST_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [-74, -88],
  [66, -76],
  [-92, 12],
  [88, 24],
  [-38, 84],
  [46, 92],
];
