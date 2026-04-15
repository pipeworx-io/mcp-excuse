interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * excuse MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Generate an excuse for being late, missing a deadline, or ghosting someone.
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'excuse_generate',
    description: 'Generate an excuse for being late, missing a deadline, or ghosting someone.',
    inputSchema: {
      type: 'object' as const,
      properties: {"situation": {"type": "string", "enum": ["late", "missed_deadline", "ghosted"]}, "audience": {"type": "string", "enum": ["boss", "friend", "date", "recruiter", "professor", "client"]}, "excuse_quality": {"type": "string", "enum": ["implausible", "plausible", "airtight", "medical"]}, "times_used_before": {"type": "number", "description": "How many times you have used this excuse before"}},
      required: ["situation"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('excuse API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'excuse_generate':
      return callApi('https://api.stupidapis.com/excuse/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
