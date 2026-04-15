# mcp-excuse

excuse MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `excuse_generate` | Generate an excuse for being late, missing a deadline, or ghosting someone. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "excuse": {
      "url": "https://gateway.pipeworx.io/excuse/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use excuse
```

## License

MIT
