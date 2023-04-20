import {useState, useEffect, useContext} from "react";
import BitCard from "./BitCard.jsx";
import { UserContext } from "../contexts/UserContext";
import PostBit from "./PostBit.jsx";
import MyProfileButton from "./MyProfileButton.jsx";

function BitFeed() {
    const [feedBits, setFeedBits] = useState(null);
    const [loading, setLoading] = useState(true);

//    const {userId, setUserID} = useContext(UserContext);
    const userId = window.localStorage.getItem("userId")
    const token = window.localStorage.getItem("token");

    const fetchBitFeed = async () => {
        fetch(`/api/bit/feed/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFeedBits(data)
                setLoading(false)
            });
    }

    useEffect(() => {
        console.log(userId);
        console.log(token);
        fetchBitFeed()
    }, []);

    if (loading) {
        return <div className="className=sm:p-8 px-4 py-8 w-full bg-[#FFFBE9] min-h-[calc(100vh-73px)]">LOADING</div>
    }
    return (
        <>
            <div className="className=sm:p-8 px-4 py-8 w-full bg-[#FFFBE9] min-h-[calc(100vh-73px)]">
            <MyProfileButton className=""/>
            <PostBit fetchBitFeed={fetchBitFeed} />


                {feedBits.map(bit => <BitCard bit={bit} key={bit.bitId}/>)}
            </div>
        </>
    );
}

export default BitFeed;
