import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { connectToDB } from "./connect.ts";
import { ITask } from "./resources/Task/types.ts";
import { IUser } from "./resources/User/types.ts";
import { User } from "./resources/User/models.ts";
import { Project } from "./resources/Project/models.ts";
import { Task } from "./resources/Task/models.ts";
import bcrypt from "bcrypt"

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
        assignedTo: [],
        createdAt: new Date(Date.now()),
        finishedBy: "test",
        tags: ["Big"],
    }
}

function createRandomUser(): IUser {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(faker.internet.password(), saltRounds);

    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: "user",
        resetToken: "",
    }
}

const fakeTasks = generateTasks()
const fakeUsers = generateUsers();
//Remove tasks 
await Task.deleteMany({}).then(() => {
    console.log("Succesfully removed all tasks");
}).catch((err) => console.log(err));

// //Generate fake tasks
await Task.insertMany(fakeTasks).then(() => {
    console.log("Succesfully saved tasks");
    mongoose.connection.close();
    process.exit(0);
}).catch((err) => console.log(err));



//Remove users
// await User.deleteMany({}).then(() => {
//     console.log("Succesfully removed all users");
// }).catch((err) => console.log(err));

// //Generate fake users
// await User.insertMany(fakeUsers).then(() => {
//     console.log("Succesfully saved users");
//     mongoose.connection.close();
//     process.exit(0);
// }).catch((err) => console.log(err));

// async function createProject() {
//     await Project.create({ name: "test" })
//     console.log("Succesfully saved projects");
//     mongoose.connection.close();
// }

// createProject();
