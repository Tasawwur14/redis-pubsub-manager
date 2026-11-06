import {createClient} from "redis"




export class PubSubManager {
    private static instance: PubSubManager
    private subscriptions: Map<string, string[]>;
    private publisher = createClient();
    private subscriber = createClient();
    private constructor() {
        this.subscriptions = new Map(); // map is a javascript data structure which store the data

    }
    async connect (){
        await this.subscriber.connect();
        await this.publisher.connect();
        console.log("Connected to Redis!")
    }
    static getInstance(): PubSubManager {
        if (PubSubManager.instance) {
            return PubSubManager.instance
        }
        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance
    }

    addUserToStock(stock: string, userId: string) {

        const subscriber = this.subscriptions.get(stock)
        if (subscriber) {
            if (!subscriber.includes(userId))
                subscriber.push(userId)
        } else {
            this.subscriptions.set(stock, [userId])
        }
        console.log(`user added to stock with ${stock} and ${userId}`)
    }
    removeUserToStock(stock: string, userId: string) {
        const subscriber = this.subscriptions.get(stock)
        if(subscriber){
            const index = subscriber.indexOf(userId)
            if(index !== -1){
                subscriber.splice(index, 1)
            }
        }

    }
    forwardMessageToUser(stock: string , message: string) {
        const subscriber = this.subscriptions.get(stock)
        if(subscriber){
            for(const userId of subscriber){
                console.log(userId)
            }
        }

    }
}

PubSubManager.getInstance() 