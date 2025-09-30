import { MongoClient } from "mongodb";
import { PropertyDoc } from "../app/api/property/property";
import { UserAccount } from "@/contexts/AuthContext";
const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const dbClient = new MongoClient(uri);
const db = dbClient.db(dbName);

export enum CName {
    sessions = "sessions",
    User = "userAccounts",
    Properties = "properties",
    Images = "images",
}
export type Doc<T> = { _id: string } & T;
export const migrate = async () => {
    // CName.Properties
    await db.collection<PropertyDoc>(CName.Properties).createIndex({ slug: 1 }, { unique: true });
    await db.collection<PropertyDoc>(CName.Properties).createIndex({ address: "text" }, { name: "address_text_search" });
    await db.collection<PropertyDoc>(CName.Properties).createIndex({ city: 1 }, { unique: false });
    await db.collection<PropertyDoc>(CName.Properties).createIndex({ country: 1 }, { unique: false });
    // index for amenities array
    await db.collection<PropertyDoc>(CName.Properties).createIndex({ amenities: 1 }, { unique: false });

    // CName.User
    await db.collection<UserAccount>(CName.User).createIndex({ email: 1 }, { unique: true });
    await db.collection<UserAccount>(CName.User).createIndex({ uid: 1 }, { unique: true });

};

export default db;
