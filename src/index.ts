import { parseVersion } from './utils/github';
import * as core from '@actions/core';
import * as C from './constants';

/**
 * GitHub Action entrypoint.
 */
async function run(): Promise<void> {
  try {
    const expireInDays: string = core.getInput(C.INPUT_EXPIRE_IN_DAYS);
    core.debug(`${C.INPUT_EXPIRE_IN_DAYS}: ${expireInDays}`);
    const tagPrefix: string = core.getInput(C.INPUT_TAG_PREFIX) || C.DEFAULT_TAG_PREFIX;
    core.debug(`${C.INPUT_TAG_PREFIX}: ${tagPrefix}`);

    const { version, stable } = parseVersion(expireInDays, tagPrefix);

    core.setOutput(C.OUTPUT_VERSION, version);
    core.setOutput(C.OUTPUT_STABLE, stable);
    core.notice(version, { title: 'version' });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
    else core.setFailed(String(error));
  }
}

run();
