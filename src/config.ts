interface Config {
  API_ROOT: string | undefined;
}
const config: Config = {
  API_ROOT: process.env.API_ROOT || "http://localhost:4000",
};

export default config;
