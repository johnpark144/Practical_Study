import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotePage from "../pages/NotePage";

export default function ListItem({ note }) {
    
    let getTime = (note) =>{
        return new Date(note.update).toLocaleDateString()
    }

    let getTitle = (note) => {
        let title = note.body.split('\n')[0]
        if(title.length > 50){
            return title.slice(0, 50)
        }
        return title
    }

    let getContent = (note) =>{
        let title = getTitle(note)
        let content = note.body.replaceAll('\n', ' ')
        content = content.replaceAll(title, '')

        if(content.length > 50){
            return content.slice(0, 50) + '...'
        }else{
            return content
        }
    }

    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span>{getContent(note)}</p>
            </div>
        </Link>
        )
}
