import { useState, useEffect } from "react"
import api from "../api"

// This is the personal view. /home
function Home() {

    const [datasets, setDatasets] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getDatasets()
    }, [])

    const getDatasets = () => {
        api
        .get("/api/datasets/")
        .then((res) => res.data)
        .then((data) => {setDatasets(data); console.log(data)})
        .catch((err) => alert(err))
    }

    const deleteDataset = (id) => {
        api.delete(`/api/datasets/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Dataset was deleted.")
                else alert("Failed to delete dataset.")
        }).catch((error) => alert(error))
        getDatasets()   // In the future just update datasets
    }

    const createDataset = (e) => {
        e.preventDefault()
        api.post("/api/datasets/", {content, title}).then((res) => {
            if (res.status === 201) alert("Dataset created.")
            else alert("Failed to create dataset.")
        }).catch((err) => alert(err))
        getDatasets()  // In the future just update datasets
    }

    return <div>Home</div>
}

export default Home