import express from "express"
import { getSpecificNote, createNote, getAllNote, deleteNote, updateNote } from "../controllers/notesController.js"
import Authmiddle from "../middleware/authmiddleware.js"

const router = express.Router()

//Protect ALL routes (individual middleware per route)
router.get("/", Authmiddle, getAllNote)
router.get("/:id", Authmiddle, getSpecificNote)
router.post("/", Authmiddle, createNote)
router.put("/:id", Authmiddle, updateNote)
router.delete("/:id", Authmiddle, deleteNote)

export default router