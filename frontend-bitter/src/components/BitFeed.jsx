import {useState, useEffect, useContext} from "react";
import BitCard from "./BitCard.jsx";
import { UserContext } from "../contexts/UserContext";
import Loader from "./Loader.jsx";

function BitFeed() {
    const [feedBits, setFeedBits] = useState(null);
    const [loading, setLoading] = useState(true);

//    const {userId, setUserID} = useContext(UserContext);
    const userId = window.localStorage.getItem("userId")
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        console.log(userId);
        console.log(token);
        fetch(`/api/bit/feed/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFeedBits(data)
                setLoading(false)
            });


    }, []);

    return (
        <>
            {loading ? (
                <div className="className=sm:p-8 px-4 py-8 w-full bg-[#FFFBE9] min-h-[calc(100vh-73px)] flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
            <div className="className=sm:p-8 px-4 py-8 w-full bg-[#FFFBE9] min-h-[calc(100vh-73px)]">
                {feedBits.map(bit => <BitCard bit={bit} key={bit.bitId}/>)}

            </div>)}
        </>
    );
}

export default BitFeed;
