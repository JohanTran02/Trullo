import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Task, User } from "./models/models.ts";
import { connectToDB } from "./connect.ts";
import { ITask } from "./resources/Task/types.ts";
import { IUser } from "./resources/User/types.ts";

connectToDB()

function generateTasks(): ITask[] {
    const array: ITask[] = [];

    for (let i = 0; i <= 10; i++) {
        const fakeTask = createRandomTask();
        array.push(fakeTask);
    }

    return array;
}

function generateUsers(): IUser[] {
    const array: IUser[] = [];

    for (let i = 0; i <= 10; i++) {
        const fakeUser = createRandomUser();
        array.push(fakeUser);
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

// export interface IUser {
//     name: string,
//     email: string,
//     password: string,
//     role: "admin" | "user"
// }

function createRandomUser(): IUser {
    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user",
    }
}



// const fakeTasks = generateTasks()
// //Remove tasks 
// await Task.deleteMany({}).then(() => {
//     console.log("Succesfully removed all tasks");
// }).catch((err) => console.log(err));

// //Generate fake tasks
// await Task.insertMany(fakeTasks).then(() => {
//     console.log("Succesfully saved tasks");
//     mongoose.connection.close();
//     process.exit(0);
// }).catch((err) => console.log(err));


const fakeUsers = generateUsers();
//Remove users
await User.deleteMany({}).then(() => {
    console.log("Succesfully removed all users");
}).catch((err) => console.log(err));

//Generate fake users
await User.insertMany(fakeUsers).then(() => {
    console.log("Succesfully saved users");
    mongoose.connection.close();
    process.exit(0);
}).catch((err) => console.log(err));
