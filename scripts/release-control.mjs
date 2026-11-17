export const DEFAULT_PRODUCTION_VERIFY_TIMEOUT_MS = 480000;
export function productionVerifyTimeout(value = process.env.PRODUCTION_VERIFY_TIMEOUT_MS) {
  return Number(value || DEFAULT_PRODUCTION_VERIFY_TIMEOUT_MS);
}

export function guardedMergeArgs(prNumber, verifiedSha, localSha, remoteSha) {
  if (!/^[a-f0-9]{40}$/.test(verifiedSha || '') || localSha !== verifiedSha || remoteSha !== verifiedSha) {
    throw new Error('PR HEAD changed after verification; refusing merge.');
  }
  return ['pr', 'merge', String(prNumber), '--match-head-commit', verifiedSha, '--merge'];
}
