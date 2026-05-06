import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

export class KrillinServer {
  private server: Server;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.server = new Server(
      { name: 'krillin-mcp', version: '1.1.0' },
      { capabilities: { tools: {} } }
    );
    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.getTools(),
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      return this.handleToolCall(name, args as Record<string, any>);
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: 'krillin_translate',
        description: 'Translate video to target language',
        inputSchema: {
          type: 'object',
          properties: {
            video_url: { type: 'string', description: 'Video URL' },
            target_language: { type: 'string', description: 'Target language code' },
            voice_clone: { type: 'boolean', description: 'Clone original voice' }
          },
          required: ['video_url', 'target_language']
        }
      },
      {
        name: 'krillin_dub',
        description: 'Dub video with AI voice',
        inputSchema: {
          type: 'object',
          properties: {
            video_url: { type: 'string', description: 'Video URL' },
            language: { type: 'string', description: 'Language code' },
            voice_style: { type: 'string', description: 'Voice style' }
          },
          required: ['video_url', 'language']
        }
      },
      {
        name: 'krillin_batch_translate',
        description: 'Batch translate multiple videos',
        inputSchema: {
          type: 'object',
          properties: {
            videos: { type: 'array', description: 'Array of {video_url, target_language}' },
            voice_clone: { type: 'boolean', description: 'Clone original voice' }
          },
          required: ['videos']
        }
      },
      {
        name: 'krillin_batch_dub',
        description: 'Batch dub multiple videos',
        inputSchema: {
          type: 'object',
          properties: {
            videos: { type: 'array', description: 'Array of {video_url, language}' },
            voice_style: { type: 'string', description: 'Voice style' }
          },
          required: ['videos']
        }
      },
      {
        name: 'krillin_status',
        description: 'Check job status',
        inputSchema: {
          type: 'object',
          properties: {
            job_id: { type: 'string', description: 'Job ID' }
          },
          required: ['job_id']
        }
      }
    ];
  }

  private async handleToolCall(name: string, args: Record<string, any>): Promise<any> {
    switch (name) {
      case 'krillin_translate':
        return this.translate(args);
      case 'krillin_dub':
        return this.dub(args);
      case 'krillin_batch_translate':
        return this.batchTranslate(args);
      case 'krillin_batch_dub':
        return this.batchDub(args);
      case 'krillin_status':
        return this.status(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private async translate(args: Record<string, any>): Promise<any> {
    const { video_url, target_language, voice_clone } = args;
    return {
      content: [{ type: 'text', text: `Translating ${video_url} to ${target_language}` }],
      result: {
        job_id: `job_${Date.now()}`,
        status: 'queued',
        video_url,
        target_language,
        voice_clone: voice_clone || false
      }
    };
  }

  private async dub(args: Record<string, any>): Promise<any> {
    const { video_url, language, voice_style } = args;
    return {
      content: [{ type: 'text', text: `Dubbing ${video_url} in ${language}` }],
      result: {
        job_id: `job_${Date.now()}`,
        status: 'queued',
        video_url,
        language,
        voice_style: voice_style || 'natural'
      }
    };
  }

  private async batchTranslate(args: Record<string, any>): Promise<any> {
    const { videos, voice_clone } = args;
    const jobs = [];
    for (const video of videos) {
      jobs.push({
        job_id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'queued',
        video_url: video.video_url,
        target_language: video.target_language,
        voice_clone: voice_clone || false
      });
    }
    return {
      content: [{ type: 'text', text: `Batch translating ${videos.length} videos` }],
      result: { jobs, count: videos.length }
    };
  }

  private async batchDub(args: Record<string, any>): Promise<any> {
    const { videos, voice_style } = args;
    const jobs = [];
    for (const video of videos) {
      jobs.push({
        job_id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'queued',
        video_url: video.video_url,
        language: video.language,
        voice_style: voice_style || 'natural'
      });
    }
    return {
      content: [{ type: 'text', text: `Batch dubbing ${videos.length} videos` }],
      result: { jobs, count: videos.length }
    };
  }

  private async status(args: Record<string, any>): Promise<any> {
    const { job_id } = args;
    return {
      content: [{ type: 'text', text: `Job ${job_id} status` }],
      result: {
        job_id,
        status: 'processing',
        progress: 50
      }
    };
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('KrillinAI MCP server running');
  }
}

async function main() {
  const apiKey = process.env.KRILLIN_API_KEY || '';
  const server = new KrillinServer(apiKey);
  await server.start();
}

main().catch(console.error);
