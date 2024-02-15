import * as core from '@actions/core';
import { addToCurrentDate, formatDate } from './date';
import { normalizeRefName } from './git';

export const parseVersion = (expireInDays: string, tagPrefix: string): { version: string; stable: boolean } => {
  const expDaysNumber: number = parseInt(expireInDays, 10);

  const expireSuffix = expDaysNumber > 0 ? `-expire${formatDate(addToCurrentDate(expDaysNumber))}` : '';
  core.debug(`expiration date suffix: ${expireSuffix}`);

  // https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
  const refType = process.env.BUILD_VERSION_REF_TYPE ?? process.env.GITHUB_REF_TYPE;
  if (!refType) {
    throw new Error('env GITHUB_REF_TYPE not available');
  }

  const refName = process.env.BUILD_VERSION_REF_NAME ?? process.env.GITHUB_REF_NAME;
  if (!refName) {
    throw new Error('env GITHUB_REF_NAME not available');
  }

  const commitSha = process.env.BUILD_VERSION_SHA ?? process.env.GITHUB_SHA;
  if (!commitSha) {
    throw new Error('env GITHUB_SHA not available');
  }

  let version: string;
  let stable: boolean;
  if (refType.toLowerCase() === 'tag') {
    // Validate prefix
    if (!refName.startsWith(tagPrefix)) {
      throw new Error(`tag does not start with prefix '${tagPrefix}'`);
    }

    // Remove prefix and replace slashes (in tag it would be wierd, but technically possible)
    version = normalizeRefName(refName.substring(tagPrefix.length));
    stable = true;
  } else {
    const shortSha = commitSha.substring(0, 8);
    version = `0.0.0-${normalizeRefName(refName)}.${shortSha}${expireSuffix}`;
    stable = false;
  }

  return { version, stable };
};
