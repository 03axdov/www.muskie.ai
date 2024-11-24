import { useState, useEffect } from "react"
import api from "../api"
import DatasetElement from "../components/DatasetElement"

// This is the personal view. /home
function Home() {

    const [datasets, setDatasets] = useState([])
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        getDatasets()
    }, [])

    const getDatasets = () => {
        api
        .get("/api/datasets/")
        .then((res) => res.data)
        .then((data) => {setDatasets(data); console.log(data)})
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteDataset = (id) => {
        api.delete(`/api/datasets/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Dataset was deleted.")
            else alert("Failed to delete dataset.")
            getDatasets()   // In the future just update datasets
        }).catch((error) => alert(error))
        
    }

    const createDataset = (e) => {
        e.preventDefault()
        api.post("/api/datasets/", {description, name}).then((res) => {
            if (res.status === 201) alert("Dataset created.")
            else alert("Failed to create dataset.")
            getDatasets()  // In the future just update datasets
        }).catch((err) => alert(err))
        
    }

    return <div>
        <div>
            <h2>Datasets</h2>
            {datasets.map((dataset) => (
                <DatasetElement dataset={dataset} key={dataset.id} />
            ))}
        </div>
        <h2>Create a Dataset</h2>
        <form onSubmit={createDataset}>
            <label htmlFor="name">Name:</label>
            <br/>
            <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                onChange={(e) => {setName(e.target.value)}} 
                value={name}
            />
            <label htmlFor="description">Description</label>
            <br />
            <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
            ></textarea>
            <br />
            <input 
                type="submit" 
                value="Submit"
            />
        </form>
    </div>
}

export default Home