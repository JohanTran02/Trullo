export interface IUser {
    name: string,
    email: string,
    password: string,
    role: "admin" | "user",
    resetToken?: string,
}

export const roles = {
    admin: ["read", "write", "delete", "update"],
    user: ["read"],
}

export const readPermissions = {
    admin: ["email", "name", "_id", "password", "resetToken", "role"],
    user: ["email", "name", "-_id"]
}