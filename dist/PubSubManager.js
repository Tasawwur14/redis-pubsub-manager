"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
class PubSubManager {
    static instance;
    subscriptions;
    constructor() {
        this.subscriptions = new Map(); // map is a javascript data structure which store the data
    }
    static getInstance() {
        if (PubSubManager.instance) {
            return PubSubManager.instance;
        }
        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance;
    }
    addUserToStock(stock, userId) {
        const subscriber = this.subscriptions.get(stock);
        if (subscriber) {
            if (!subscriber.includes(userId))
                subscriber.push(userId);
        }
        else {
            this.subscriptions.set(stock, [userId]);
        }
        console.log(`user added to stock with ${stock} and ${userId}`);
    }
    removeUserToStock(stock, userId) {
        const subscriber = this.subscriptions.get(stock);
        if (subscriber) {
            const index = subscriber.indexOf(userId);
            if (index !== -1) {
                subscriber.splice(index, 1);
            }
        }
    }
    forwardMessageToUser(stock, message) {
        const subscriber = this.subscriptions.get(stock);
        if (subscriber) {
            for (const userId of subscriber) {
                console.log(userId);
            }
        }
    }
}
exports.PubSubManager = PubSubManager;
PubSubManager.getInstance();
//# sourceMappingURL=PubSubManager.js.map