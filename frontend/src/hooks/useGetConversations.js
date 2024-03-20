// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	const { authUser } = useAuthContext();

// 	useEffect(() => {
// 		if (authUser) {
// 			const socket = io("http://localhost:5000/", {
// 				query: {
// 					userId: authUser._id,
// 				},
// 			});

// 			setSocket(socket);

// 			// socket.on() is used to listen to the events. can be used both on client and server side
// 			socket.on("getOnlineUsers", (users) => {
// 				setOnlineUsers(users);
// 			});

// 			return () => socket.close();
// 		} else {
// 			if (socket) {
// 				socket.close();
// 				setSocket(null);
// 			}
// 		}
// 	}, [authUser]);

// 	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
// };


import { useEffect , useState } from "react";
import toast from "react-hot-toast";

const useGetConversations=()=>{
const [loading, setLoading] = useState(false);
const [conversations, setConversations] = useState([]);

useEffect(()=> {
	const getConversations = async()=>{
		setLoading(true);
		try{
			const res = await fetch('/api/users');
			const data =await res.json();
			if(data.error){
				throw new Error(data.error);
			}
			setConversations(data);

		}catch(error){
			toast.error(error.message);
		}finally{
			setLoading(false);
		}
	}
	getConversations();
}, []);
return{loading, conversations};
}

export default useGetConversations;