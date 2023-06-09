// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "Products",
    columns: [
      { name: "title", type: "string" },
      { name: "product_type", type: "multiple" },
      { name: "description", type: "text" },
      { name: "media", type: "multiple" },
      { name: "attributes", type: "multiple" },
      { name: "brand", type: "link", link: { table: "Brands" } },
      { name: "rfid_copenhagen", type: "int", unique: true },
      { name: "video", type: "bool", defaultValue: "false" },
      { name: "rfid_istanbul", type: "int" },
      { name: "rfid_sydney", type: "int" },
    ],
  },
  {
    name: "Brands",
    columns: [
      { name: "title", type: "string" },
      { name: "logo", type: "string" },
      { name: "description", type: "text" },
    ],
  },
  {
    name: "Screens",
    columns: [
      { name: "location", type: "string" },
      { name: "title", type: "string" },
      { name: "brand_lock", type: "bool", defaultValue: "false" },
      { name: "brand", type: "link", link: { table: "Brands" } },
      { name: "description", type: "text" },
      { name: "cta", type: "string" },
      { name: "screen_type", type: "string" },
    ],
  },
  {
    name: "Locations",
    columns: [
      { name: "name", type: "string" },
      { name: "map", type: "string" },
    ],
  },
  {
    name: "Carousels",
    columns: [
      { name: "title", type: "string" },
      { name: "logo", type: "string" },
      { name: "type", type: "string" },
      { name: "line_1", type: "string" },
      { name: "line_2", type: "string" },
      { name: "line_3", type: "string" },
      { name: "line_4", type: "string" },
      { name: "line_5", type: "string" },
      { name: "screen", type: "link", link: { table: "Screens" } },
    ],
  },
  {
    name: "ConfigProfiles",
    columns: [
      { name: "ip", type: "string" },
      { name: "map_position_id", type: "string" },
      { name: "server_ip", type: "string" },
      { name: "connection_type", type: "string" },
      { name: "screen_type", type: "string" },
      {
        name: "left_neighbour",
        type: "link",
        link: { table: "ConfigProfiles" },
      },
      {
        name: "right_neighbour",
        type: "link",
        link: { table: "ConfigProfiles" },
      },
      { name: "location", type: "link", link: { table: "Locations" } },
      { name: "writeable", type: "string", defaultValue: "true" },
    ],
  },
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
  },
];
/** @type { import('../../client/src').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://maria-studiodialect-s-workspace-j3k9ii.eu-west-1.xata.sh/db/heinemann",
    enableBrowser: true,
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
