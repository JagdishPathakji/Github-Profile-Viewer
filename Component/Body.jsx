import {useEffect, useState, useCallback, use} from "react"

function Body() {

    const [Githubdata,setGithubdata] = useState([])
    const [number,setNumber] = useState("")
    const [user,setUser] = useState("")

    const getdata = useCallback(async (count)=> {
        try {
            const token = "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"; // using this token to get more hits on github API.
            const response = await fetch(`https://api.github.com/users?since=${1+Math.floor(Math.random()*1000)}&per_page=${count}`, {
                method: "GET",
                headers: {
                    Authorization: `token ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                },
            })
            const data = await response.json() // it is also an async process.

            const data2 = await Promise.all(data.map(async (value)=> {
                const res = await fetch(`https://api.github.com/users/${value.login}`, {
                    method: "GET",
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                });
                return res.json()
            }))

            setGithubdata(Array.isArray(data2) ? data2 : []);
        }
        catch(error) {
            setGithubdata([])
        }
    },[])

    const getuser = useCallback(async (username)=> {
        try {
            const token = "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"; // using this token to get more hits on github API.
            const response = await fetch(`https://api.github.com/users/${username}`, {
                method: "GET",
                headers: {
                    Authorization: `token ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                },
            })
            const data = await response.json() // it is also an async process.
            console.log(data);
            setGithubdata(data && data.login ? [data] : [])
        }
        catch(error) {
            setGithubdata([])
        }
    },[])

    useEffect(()=> {
        getdata(10)
    },[])

    return (
        <>
            <div id="search">
                <input placeholder="Enter a number : " type="text" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                <button onClick={()=>{
                    getdata(Number(number))
                    setUser("")
                }}>Get data</button>
            </div>
            <div id="search2">
                <input placeholder="Enter a username : " type="text" value={user} onChange={(e)=>{setUser(e.target.value)}}/>
                <button onClick={()=>{
                    getuser(user)
                    setNumber("")
                }}>Get data</button>
            </div>
            <div id="main">
                {
                    Githubdata.map((value)=> {
                        return (
                            <div id="card" key={value.id}>
                                <div id="img">
                                    <img src={value.avatar_url}/>
                                </div>
                                <div id="data">
                                    <div>{value.login}</div>
                                    <div>Name: {value.name}</div>
                                    <div>Created at: {value.created_at}</div>
                                    <div>Email: {value.email}</div>
                                    <div>{value.followers} <span><button>Followers</button></span></div>
                                    <div>{value.following} <span><button>Following</button></span></div>
                                    <h3>Public repos: {value.public_repos}</h3>
                                </div>
                                <a href={value.html_url}>Visit on Github</a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Body