interface Config {
  domain: string;
  clientId: string;
}
export const config: Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
};
