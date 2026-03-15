import { prisma } from "db/client";
import express from "express";

const app = express();

app.use(express.json());
console.log("DB URL:", process.env.DATABASE_URL)
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/user", async (req, res) => {
    try {
        const { username, password } = req.body;
    
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return
        }
    
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

app.listen(4000);