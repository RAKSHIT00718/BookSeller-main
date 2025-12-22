import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = async () => {
  try {
    if (process.env.IN_MEMORY_MONGO === "true" || process.env.USE_IN_MEMORY_MONGO === "true") {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      mongoose.set("strictQuery", false);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("✅ DB CONNECTED: in-memory");
      return;
    }

    const atlasUri = process.env.MONGODB_URI;
    const localUri = process.env.MONGO_LOCAL_URI || "mongodb://127.0.0.1:27017/bookseller";
    const useLocal = !atlasUri || process.env.USE_LOCAL_MONGO === "true";
    const connectionString = useLocal ? localUri : atlasUri;

    if (!connectionString) {
      console.error("❌ No MongoDB URI provided. Set MONGODB_URI or MONGO_LOCAL_URI in .env");
      return;
    }

    mongoose.set("strictQuery", false);
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ DB CONNECTED:", useLocal ? "local" : "Atlas");

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err.message);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected");
    });
  } catch (error) {
    console.log("❌ DB CONNECTION ERROR:", error.message);
    console.log("📝 Fix tips: \n- Verify MONGODB_URI in .env \n- Whitelist your IP in Atlas \n- If DNS SRV fails, try mongodb:// instead of mongodb+srv:// \n- Set USE_LOCAL_MONGO=true for local \n- Or set IN_MEMORY_MONGO=true for in-memory development");
  }
};
