// import  { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export default function Signup(){

    
//   const navigate=useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/users/signup", {
//         username: username,
//         password: password,
//       });
//       console.log(response.data.message);
//       navigate("/");
//     } catch (error) {
//       console.error("Error registering user:", error.response.data.message);
//       // Display error message or perform error handling
//     }
//   };


//   return (
//     <div>
      
//        <div style={{
//         minHeight: "80vh",
//         padding: "100px",
//        }}>
//         <div style={{ 
//         maxWidth: "400px",
//         marginLeft:"35%",
//         marginTop:"10%",
//          padding: "20px", 
//          border: "1px solid #ccc", 
//          borderRadius: "10px", 
//          backgroundColor: "#f5f5f5" }}>
  
//         <h1 style={{ fontSize: "24px",
//          marginBottom: "20px" }}>
  
//           Register  
  
//           </h1>
  
//         <br />
//         <label>Username:</label>
//         <input type="text" value={username} onChange={handleUsernameChange} style={
//           { width: "100%",
//            padding: "10px", 
//            marginBottom: "10px",
//             border: "1px solid #ccc",
//              borderRadius: "5px" }
          
//           } />
//         <br />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={handlePasswordChange} style={{ width: "100%",
//          padding: "10px", 
//          marginBottom: "10px", 
//          border: "1px solid #ccc",
//           borderRadius: "5px" }} />
//         <br />
//         <button onClick={handleRegister} style={{ width: "100%",
//          padding: "10px",
//           backgroundColor: "#4caf50",
//            color: "white", 
//            border: "none", 
//            borderRadius: "5px",
//             cursor: "pointer" }}>Register</button>
//         <br />
//        <span>Already a admin? <a href="/">Login</a></span> 
//     </div>
//     </div>
//     </div>
//   );


// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/signup", {
                username: username,
                password: password,
            });
            console.log(response.data.message); // Display success message
            navigate("/"); // Redirect to the login page after successful signup
        } catch (error) {
            console.error("Error signing up:", error.response.data.message);
            // Display error message or perform error handling
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="max-w-md bg-white p-8 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="username" className="block font-semibold">Username:</label>
                        <input id="username" name="username" type="text" required className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-semibold">Password:</label>
                        <input id="password" name="password" type="password" required className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="button" onClick={handleSignup} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Signup</button>
                </form>
                <p className="text-center mt-4">Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a></p>
            </div>
        </div>
    );
}
