import * as core from '@actions/core';

/**
 * GitHub Action entrypoint.
 */
async function run(): Promise<void> {
  try {
    core.debug('Hello to GitHub actions via Bun!');
    const date = new Date().toDateString();
    core.setOutput('date', date);
    core.notice(date, { title: 'Date' });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
    else core.setFailed(String(error));
  }
}

run();
