import { createUser, fetchUserByEmail } from "@/db/repositories/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface registerUserProps {
    email: string,
    password: string,
    username: string
}

export const registerUser = async ({ email, password, username }: registerUserProps) => {
    // Check if the user already exists
    const userExists = await fetchUserByEmail(email)
    if (userExists.rows.length > 0) {
        throw new Error('Email alredy exits')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUser = await createUser({ username, email, hashedPassword })
    return newUser.rows[0]
}

interface loginUserProps {
    email: string;
    password: string
}

export const loginUser = async ({ email, password }: loginUserProps) => {
    // Check if user exists
    const userExists = await fetchUserByEmail(email)
    if (userExists.rows.length === 0) {
        throw new Error("Invalid credentials")
    }

    const user = userExists.rows[0];

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials")
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );

    return token
}