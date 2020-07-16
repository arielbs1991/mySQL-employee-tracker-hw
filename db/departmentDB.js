const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
//if I'm lucky this is all extra code I can throw away
class DB {
    async writeNotes(newNote, currentNotes) {
        try {
            let note = {
                title: newNote.title,
                text: newNote.text,
                id: Date.now()
            };
            const combineNotes = [note, ...currentNotes];
            await writeFileAsync(notesData, JSON.stringify(combineNotes))
        } catch (e) {
            console.log("something went wrong while writing notesData", e);
        }
    }
    async readNotes() {
        const notesRaw = await readFileAsync(notesData, "utf8");
        try {
            return notesRaw ? JSON.parse(notesRaw) : [];
        } catch (e) {
            console.log("something went wrong while reading notesData", e)
        }
    }
    async deleteNote(uniqueId) {
        try {
            let notes = await readFileAsync(notesData, "utf8");
            let notesParsed = JSON.parse(notes);
            let filteredNotes = await notesParsed.filter(note => note.id !== uniqueId);
            await writeFileAsync(notesData, JSON.stringify(filteredNotes));
        } catch (e) {
            console.log("something went wrong while deleting from notesData", e)
        }
    }
}

module.exports = new DB();

//new/changed code

const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const Class = require("../Classes");
let departmentsArray = []
class NewDepartment {
    async createDepartment(req, res) {
        try {
            await connection.query("SELECT * FROM department",
            function (err, res) {
                if (err) throw err;
                let newDepartment = new Class.DepartmentClass(res.id, res.name);
                departmentsArray.push(newDepartment);
                console.log(departmentsArray);
                module.exports.departmentsArray = departmentsArray;
            })
        } catch (e) {
            console.log("something went wrong while reading departmentData", e)
        }
    }
    // async deleteNote(uniqueId) {
    //     try {
    //         let notes = await readFileAsync(notesData, "utf8");
    //         let notesParsed = JSON.parse(notes);
    //         let filteredNotes = await notesParsed.filter(note => note.id !== uniqueId);
    //         await writeFileAsync(notesData, JSON.stringify(filteredNotes));
    //     } catch (e) {
    //         console.log("something went wrong while deleting from notesData", e)
    //     }
    // }
}

module.exports.NewDepartment = NewDepartment;