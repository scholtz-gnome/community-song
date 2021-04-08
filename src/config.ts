interface Config {
  API_ROOT: string | undefined;
}
const config: Config = {
  API_ROOT: process.env.REACT_APP_API_ROOT,
};

export default config;
