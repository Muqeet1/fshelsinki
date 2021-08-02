import React from "react";

const Stats = props => {
    const keyvalues = Object.entries(props.allprops.feedback).map(([a, b]) => `${a}: ${b}`);

    const noFeedback = "No feedback given"
    if (props.allprops.total === 0) {
        return (
            <>
                <h1>{props.text}</h1>
                {noFeedback}
            </>
        )
    }
    return (
        <>
            <h1>{props.text}</h1>
            <table>
                <tbody>
                    <tr><td>{keyvalues[0]}</td></tr>
                    <tr><td>{keyvalues[1]}</td></tr>
                    <tr><td>{keyvalues[2]}</td></tr>
                    <tr><td>all: {props.allprops.total}</td></tr>
                    <tr><td>average: {props.allprops.average}</td></tr>
                    <tr><td>positive: {props.allprops.positive}</td></tr>
                </tbody>
            </table>
        </>
    )
}

export default Stats;