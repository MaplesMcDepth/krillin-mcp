# KrillinAI MCP Wrapper

## Overview

MCP server wrapper for KrillinAI video translation and dubbing.

## Features

- Video translation (100+ languages)
- Voice cloning
- Dubbing
- Platform optimization (YouTube, TikTok)

## Tools

### krillin_translate
Translate video to target language.

```json
{
  "video_url": "https://example.com/video.mp4",
  "target_language": "es",
  "voice_clone": false
}
```

### krillin_dub
Dub video with AI voice.

```json
{
  "video_url": "https://example.com/video.mp4",
  "language": "en",
  "voice_style": "natural"
}
```

### krillin_status
Check job status.

```json
{
  "job_id": "job_123"
}
```

## Setup

```bash
npm install
npm run build
npm start
```

## Env

```env
KRILLIN_API_KEY=your-key
KRILLIN_API_URL=https://api.krillinai.com
```

## Stack

- TypeScript
- MCP SDK
- Node.js

## License

MIT
