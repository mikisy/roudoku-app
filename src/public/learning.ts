export interface LearningSequenceOptions {
  repeat: number;
  pauseSeconds: number;
}

export function learningRepeat(value: unknown): number {
  const parsed = Math.round(Number(value));
  return Number.isFinite(parsed) ? Math.max(1, Math.min(3, parsed)) : 2;
}

export function learningPauseSeconds(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(5, parsed)) : 1.5;
}

export function learningCaptionTimes(
  clipDurations: readonly number[],
  options: LearningSequenceOptions
): number[] | null {
  if (!clipDurations.length || clipDurations.some(duration => !Number.isFinite(duration) || duration <= 0)) return null;
  const repeat = learningRepeat(options.repeat);
  const pauseSeconds = learningPauseSeconds(options.pauseSeconds);
  const times = [0];
  let elapsed = 0;
  for (const duration of clipDurations) {
    elapsed += (duration + pauseSeconds) * repeat;
    times.push(elapsed);
  }
  return times;
}

export function parseLearningCaptionTimes(value: string | null, cueCount: number): number[] | null {
  if (!value || !Number.isInteger(cueCount) || cueCount < 1) return null;
  const times = value.split(',').map(Number);
  if (times.length !== cueCount + 1 || times[0] !== 0) return null;
  if (!times.every((time, index) => Number.isFinite(time) && time >= 0 && (index === 0 || time > times[index - 1]!))) return null;
  return times;
}
