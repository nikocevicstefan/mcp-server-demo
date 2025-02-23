import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./mcp-tools.js";
import { MCPTool } from "./types.js";
import { getConfig } from "./config.js";
import dotenv from "dotenv";

dotenv.config();
const server = new McpServer({
  name: getConfig().serverName,
  version: getConfig().serverVersion,
});

tools.forEach((tool: MCPTool) => {
  server.tool(tool.name, tool.description, tool.schema, tool.callable);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});