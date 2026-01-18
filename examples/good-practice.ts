interface User {
  name: string;
}

function processUsers(users: User[]): void {
  // Using for...of loop for better readability and safety
  for (const user of users) {
    // Added null/undefined checks
    if (user && user.name) {
      console.log(user.name.toUpperCase());
    }
  }
}

interface DbConfig {
  host: string;
  database: string;
  user: string;
}

interface DbConnection {
  query: (sql: string) => Promise<unknown>;
  close: () => Promise<void>;
}

async function connectToDb(config: DbConfig): Promise<DbConnection> {
  // Best practice: Passwords should come from environment variables or secure vaults
  // Never pass passwords as parameters or hardcode them
  const password = process.env.DB_PASSWORD;

  if (!password) {
    throw new Error("DB_PASSWORD environment variable is not set");
  }

  // Use a connection library that accepts credentials as separate parameters
  // This avoids constructing a connection string with password in memory
  // Example using a hypothetical database client:
  const connection = await createDbConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password, // Passed separately, not in a string
  });

  // Only log in development, never in production
  if (process.env.NODE_ENV === "development") {
    console.log("Database connection established");
  }

  return connection;
}

// Mock function for demonstration purposes
async function createDbConnection(params: {
  host: string;
  database: string;
  user: string;
  password: string;
}): Promise<DbConnection> {
  // In a real implementation, this would use a proper DB client
  return {
    query: async (sql: string) => ({}),
    close: async () => {},
  };
}

async function fetchData<T = unknown>(
  url: string,
  timeoutMs: number = 30000,
): Promise<T> {
  // Validate URL before fetching
  try {
    const parsedUrl = new URL(url);

    // Optionally restrict to allowed protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error(`Invalid protocol: ${parsedUrl.protocol}`);
    }
  } catch (error) {
    throw new Error(`Invalid URL: ${url}`);
  }

  // Add timeout using AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    // Added error handling for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    // Clean up timeout
    clearTimeout(timeoutId);
  }
}
