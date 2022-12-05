import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { deleteToDo } from "./store";
// import { actionCreators } from "./store";

function ToDo({ text, onBtnClick, id }) {
    return (
        <li>
            <Link to={`/${id}`}>
                {text}
            </Link>
            <button onClick={onBtnClick}>Del</button>
        </li>
    )
}

// store에 정보를 전달
function mapDispatchToProps(dispatch, ownProps) {
    return {
        onBtnClick: () => dispatch(deleteToDo(ownProps.id))
        // onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    };
}

export default connect(null, mapDispatchToProps)(ToDo);