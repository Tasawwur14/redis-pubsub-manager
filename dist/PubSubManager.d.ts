export declare class PubSubManager {
    private static instance;
    private subscriptions;
    private constructor();
    static getInstance(): PubSubManager;
    addUserToStock(stock: string, userId: string): void;
    removeUserToStock(stock: string, userId: string): void;
    forwardMessageToUser(stock: string, message: string): void;
}
//# sourceMappingURL=PubSubManager.d.ts.map