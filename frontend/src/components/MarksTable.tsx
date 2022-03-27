import React from "react";

type IMarksTable = {
    marks: string | number [],
    subject: string
}

const MarksTable = ({marks, subject} : IMarksTable) => {
    return(
        <div className="marks-table-main">
            <div className="marks-table-subject">{subject}</div>
            <div className="marks-table-flex">
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">1ч</div>
                    <div>{marks[0]}</div>
                </div>
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">2ч</div>
                    <div>{marks[1]}</div>
                </div>
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">1п</div>
                    <div>{marks[2]}</div>
                </div>
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">3ч</div>
                    <div>{marks[3]}</div>
                </div>
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">4ч</div>
                    <div>{marks[4]}</div>
                </div>
                <div className="marks-table-cell marks-table-border">
                    <div className="marks-table-head">2п</div>
                    <div>{marks[5]}</div>
                </div>
                <div className="marks-table-cell">
                    <div className="marks-table-head">год</div>
                    <div>{marks[6]}</div>
                </div>
            </div>
        </div>
    )
}

export default MarksTable;