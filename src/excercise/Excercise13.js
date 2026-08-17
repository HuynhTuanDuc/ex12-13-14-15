import { useState, useEffect, use } from "react";


function Excercise13() {
    const [userId, setUserId] = useState(1);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console("Error fetching posts: ", error)
            }
        };
        fetchData()
    }, [userId]);


    //Ex2 count timer
    const [timeRemaining, setTimeRemaining] = useState(100);
    useEffect(() => {
        if (timeRemaining <= 0) {
            return;
        }

        const timeerId = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        return () => {
            clearInterval(timeerId);
        };
    }, [timeRemaining])

    //Winndow resize 
    const [windownSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resizez", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // ===========EX4=======
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(true);
    //validate
    const validationFunction = (value) => {
        return value.length >= 5;
    }
    useEffect(() => {
        setIsValid(validationFunction(value))
    }, [value]);

    //return
    return (
        <div>
            <h1>Excercise 13 - useEffect</h1>

            {/* Ex 1 xuất dữ liệu*/}
            <div>
                <h2>Data fetching</h2>
                <label>User Id: </label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <div>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{ border: "1px solid #ccc" }}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Đồng hồ cát, giờ tự giảm */}
            <div>
                <h2>2. Countdown timer</h2>
                <p>Time remaining: {timeRemaining}</p>
            </div>
            {/* Xem kích thước window cửa sổ đang mở*/}
            <div>
                <h2> Ex3
                </h2>
                <p>Window size :{windownSize.width} x {windownSize.height}</p>
            </div>
            <div>
                <h2>
                    Ex4
                </h2>
                <input
                type = "text"
                value ={value}
                onChange={(e)=> setValue(e.target.value)}
                placeholder="Validation: 5 or more letter"
                />
                {!isValid && (
                    <p>Input must contain at least 5 character</p>
                )}
            </div>
        </div>
    )

}


export default Excercise13;