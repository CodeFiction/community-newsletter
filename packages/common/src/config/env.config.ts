/**
 * Environment variable names that should be defined in the environment of the process.
 */
export const envConstants = {
  nodeEnv: "NODE_ENV",
  dynamodbTableName: "DYNAMODB_TABLE_NAME",
  awsRegion: "AWS_REGION",
  defaultForwardLocation: "DEFAULT_FORWARD_LOCATION",
  useLocalStack: "USE_LOCALSTACK",
  localStackEndpoint: "LOCALSTACK_ENDPOINT",
};

/**
 * Environment context that maps the environment of the process.
 */
export type EnvContext = {
  nodeEnv: string;
  dynamodbTableName: string;
  awsRegion: string;
  defaultForwardLocation: string;
  useLocalStack: string;
  localStackEndpoint: string;
};

/**
 * Tries to get environment context from the environment of the process.
 * Throws error if cannot construct the `EnvContext` based on the environment
 * of the process.
 * @returns The `EnvContext` object.
 */
export const tryGetEnvContext = (): EnvContext => {
  const ctx: EnvContext = {
    nodeEnv: "",
    dynamodbTableName: "",
    awsRegion: "",
    defaultForwardLocation: "",
    useLocalStack: "",
    localStackEndpoint: "",
  };

  for (const [key, value] of Object.entries(envConstants)) {
    if (!process.env[value]) {
      throw new Error(`Cannot get env context variable: ${value}`);
    }

    ctx[key as keyof EnvContext] = process.env[value] as string;
  }

  return ctx;
};
