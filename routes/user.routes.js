import {Router} from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({title: "Get All Users"});
})

userRouter.get("/:id", (req, res) => {
    res.send({title: "Get User Details"});
})

userRouter.post("/", (req, res) => {
    res.send({title: "Make a User"});
})

userRouter.put("/:id", (req, res) => {
    res.send({title: "Update User"});
})

userRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete a User"});
})

export default userRouter;