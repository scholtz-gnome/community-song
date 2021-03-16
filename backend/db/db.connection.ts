import { config } from "../config";
import { knexConfig } from "../knexConfig";
import knex from "knex";
const environment = config.NODE_ENV || "development";
const dbConnection = knexConfig[environment];

export default knex(dbConnection);
