import { MissingApiTokenError } from '../lib/errors';

import * as config from './config';
import { config as userConfig } from './user-config';

export function api() {
  // note: config.TOKEN will potentially come via the environment
  return config.api || config.TOKEN || userConfig.get('api');
}

export function getDockerToken(): string | undefined {
  return process.env.SNYK_DOCKER_TOKEN;
}

export function apiTokenExists() {
  const configured = api();
  if (!configured) {
    throw new MissingApiTokenError();
  }
  return configured;
}

export function authHeaderWithApiTokenOrDockerJWT() {
  const dockerToken = getDockerToken();
  if (dockerToken) {
    return 'bearer ' + dockerToken;
  }
  return 'token ' + api();
}
