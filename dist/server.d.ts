export interface KrillinConfig {
    apiUrl: string;
    apiKey?: string;
}
export declare class KrillinMcpServer {
    private server;
    private config;
    constructor(config: KrillinConfig);
    private setupHandlers;
    private getTools;
    private handleToolCall;
    private translateVideo;
    private generateSubtitles;
    private dubVideo;
    private batchProcess;
    start(): Promise<void>;
}
