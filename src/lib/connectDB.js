import mongoose from "mongoose";

async function connectToDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		const connection = mongoose.connection;
		connection.on("connected", () => console.log("Connection to Database successfull"));

		connection.on("error", (err) => {
			console.log(`error connecting to db : ${err}`);
			process.exit(1);
		});
	} catch (error) {
		console.log(`from catch block ${error}`);
	}
}

export { connectToDB };
