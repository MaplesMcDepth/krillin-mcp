export declare class KrillinServer {
    private server;
    private apiKey;
    constructor(apiKey: string);
    private setupHandlers;
    private getTools;
    private handleToolCall;
    private translate;
    private dub;
    private batchTranslate;
    private batchDub;
    private status;
    start(): Promise<void>;
}
