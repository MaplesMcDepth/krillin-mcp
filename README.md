# KrillinAI MCP Wrapper

## Overview

MCP server wrapper for [KrillinAI](https://github.com/krillinai/KrillinAI) - Video translation and dubbing powered by LLMs.

## Features

- Video translation (100+ languages)
- Voice cloning and dubbing
- Subtitle generation
- Platform optimization (YouTube, TikTok, Bilibili)
- Batch processing

## Architecture

```
OpenClaw Agent → MCP Client → KrillinAI MCP Server → KrillinAI API → Video Processing
```

## Tools

### 1. `krillin.translate_video`
- Translate video to target language
- Parameters: `video_path`, `source_lang`, `target_lang`, `voice_clone`

### 2. `krillin.dub_video`
- Dub video with AI voice
- Parameters: `video_path`, `voice_id`, `language`

### 3. `krillin.generate_subtitles`
- Generate subtitles for video
- Parameters: `video_path`, `language`, `format`

### 4. `krillin.batch_process`
- Batch process multiple videos
- Parameters: `videos`, `operation`, `config`

## Setup

### Prerequisites
- KrillinAI instance (local or cloud)
- OpenClaw with MCP support

### Configuration
```env
KRILLINAI_API_URL=http://localhost:8080
KRILLINAI_API_KEY=your-api-key
```

## McDepth Integration

### Galactic Groove
- Workflow: Space video → KrillinAI translation → Multi-platform content
- Tool: `krillin.translate_video`

### AgentCast
- Podcast video clips → Subtitle generation → Social media
- Tool: `krillin.generate_subtitles`

### Synthloop
- Music video → Dubbing → International release
- Tool: `krillin.dub_video`

## Implementation Status

- [ ] MCP server core
- [ ] Video translation tool
- [ ] Dubbing tool
- [ ] Subtitle generation
- [ ] Batch processing
- [ ] McDepth integrations
- [ ] Documentation

## References

- [KrillinAI GitHub](https://github.com/krillinai/KrillinAI)
- [MCP Protocol](https://modelcontextprotocol.io/)
