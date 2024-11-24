import React from "react"

function DatasetElement({dataset}) {
    const formattedDate = new Date(dataset.created_at).toLocaleDateString("en-US")

    return (
        <div className="dataset-element">
            <p className="dataset-element-name">{dataset.name}</p>
            <p className="dataset-element-description">{dataset.description}</p>
            <p className="dataset-element-date">{formattedDate}</p>
        </div>
    )
}


export default DatasetElement