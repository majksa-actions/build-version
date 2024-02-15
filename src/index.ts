import * as core from '@actions/core';

/**
 * GitHub Action entrypoint.
 */
async function run(): Promise<void> {
  try {
    core.debug('Hello to GitHub actions via Bun!');
    core.setOutput('date', new Date().toDateString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
    else core.setFailed(String(error));
  }
}

run();
