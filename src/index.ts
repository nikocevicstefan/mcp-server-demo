import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { tools } from "./mcp-tools.js";
import { MCPTool } from "./types.js";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

const server = new McpServer({
  name: "weather-app",
  version: "1.0.0",
});

tools.forEach((tool) => {
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