import React from "react"

function DatasetElement({dataset}) {
    return <div className="dataset-element">
        <p className="dataset-element-name">{dataset.name}</p>
        <p className="dataset-element-description">{dataset.description}</p>
        <p className="dataset-element-date">{}</p>
        
    </div>
}