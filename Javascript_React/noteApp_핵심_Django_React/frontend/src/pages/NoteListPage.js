import React, { useContext, useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/Addbutton";
import AuthContext from "../context/AuthContext";

export default function NoteListPage() {
    const [notes, setNotes] = useState([])
    let { user } = useContext(AuthContext)

    useEffect(() => {
        const getNotes = async () => {
            let response = await fetch('/api/notes/', {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            let data_list = await response.json()
            data_list = data_list.filter((data)=>{
                return data.user === user.user_id
            })  // 로그인한 유저꺼만 가져오기
            setNotes(data_list)
        }
        getNotes()
    }, [user.user_id])

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9776; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, idx) => (
                    <ListItem key={idx} note={note} />
                ))}
            </div>
            <AddButton /> 
        </div>
    )
}
