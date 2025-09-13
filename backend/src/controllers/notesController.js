import Note from "../models/Note.js"
export async function getAllNote(req,res){
   try{
      const notes = await Note.find({user:req.userId}).sort({ createdAt:-1 }); // Sort by creation date, most recent first
        if(!notes || notes.length === 0){
            return res.status(404).json({message:"No notes found"});
        }
      res.status(200).json(notes)
   }catch(error){
    console.log("Error ",error);
    res.status(500).json({message:"internal server error"});
   }
}
export async function getSpecificNote(req,res){
    try{
      const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
      if (note.user.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.status(200).json(note);
    }catch(error){
    console.log("Error ",error);
    res.status(500).json({message:"internal server error"});
    }
}
export async function createNote(req,res){
    try{
      const {title,content,user} = req.body;
      const note = new Note({title,content,user:req.userId});
      const savedNote = await note.save();
        if(!savedNote){
            return res.status(400).json({message:"Error creating note"});
        }
      res.status(201).json(savedNote);
    }catch(error){
    console.log("Error ",error);
    res.status(500).json({message:"internal server error"});
    }
    
}
export async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    note.title = req.body.title;
    note.content = req.body.content;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
