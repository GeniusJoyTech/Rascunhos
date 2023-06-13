import Axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../utils/api";

function getToken() {
    const token = localStorage.getItem("token")
    return token
}
function getId(){
    let id;
    const user = JSON.parse(localStorage.getItem('user'));
    id = user.id_usu;
    return id;    
}

function makeHeaders() {
    return {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
            "id": getId(),
        }

    }
}

export default function useFetching(url, dependeces = []) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            await fechApi();
        })();
    }, dependeces)

    async function fechApi() {
        try {
            const response = await Api.get(url, makeHeaders())
            setData(response.data)
            console.log(response)
        } catch (error) {
            setError(error.response?.data)
        }
    }

    return {
        data,
        error
    }
}