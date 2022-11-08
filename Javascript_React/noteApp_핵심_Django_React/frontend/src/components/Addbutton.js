import React from "react";
import { Link } from "react-router-dom";

export default function AddButton({ }) {
    return (<>
        <Link to='/note/new' className="floating-button material-icons-outlined">
            add
        </Link>
    </>)
}
