import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Task } from "./models/models.ts";
import { connectToDB } from "./connect.ts";
import { ITask } from "./resources/Task/types.ts";

connectToDB()

function generateData(): ITask[] {
    const array: ITask[] = [];

    for (let i = 0; i <= 10; i++) {
        const fakeTask = createRandomTask();
        array.push(fakeTask);
    }

    return array;
}

function createRandomTask(): ITask {
    return {
        title: faker.lorem.lines(),
        description: faker.lorem.paragraph(),
        status: "to-do",
        assignedTo: ["test"],
        createdAt: new Date(Date.now()),
        finishedBy: "test",
        tags: ["Big"],
    }
}

const fakeData = generateData()

//Ta bort testdata
await Task.deleteMany({}).then(() => {
    console.log("Succesfully removed all tasks");
}).catch((err) => console.log(err));

//Generera testdata
await Task.insertMany(fakeData).then(() => {
    console.log("Succesfully saved tasks");
    mongoose.connection.close();
    process.exit(0);
}).catch((err) => console.log(err));
