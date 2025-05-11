import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const sighUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Check if user exists
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Create new user
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword })
        const token = await genToken(user._id)

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "lax", // Changed from strict to lax for better compatibility
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Return user data without password
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        return res.status(201).json(userResponse)

    } catch (error) {
        console.error("Signup error:", error)
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        // Find user
        const user = await User.findOne({ email })
            .populate("listing", "title image1 image2 image3 description rent category city landMark")
        
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        // Generate token
        const token = await genToken(user._id)

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "lax", // Changed from strict to lax for better compatibility
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Return user data without password
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            listing: user.listing
        }
        return res.status(200).json(userResponse)

    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ message: "Error during login" })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "lax"
        })
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.error("Logout error:", error)
        return res.status(500).json({ message: "Error during logout" })
    }
}