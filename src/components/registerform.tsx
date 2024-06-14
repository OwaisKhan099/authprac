"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
function RegisterForm(){
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()
    const handleSubmit = async (reg:any) => {
        //this will prevent the page from getting refreshed after clicking the register button.
        reg.preventDefault();
        if(!name || !email || !password ){
            setError("All fields are required")
            return;
        }

        // calling the api router, and creating POST request to provide the data to the api to create use:
        try {

            const resUserExists = await fetch("api/userExists",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email}),
                
            })
            console.log("-------------------------")
            const {user} = await resUserExists.json()
            console.log("-------------------------")
            //const user_withoutjson = await resUserExists.json()
           
            //console.log(`original response ${typeof resUserExists} ${resUserExists}`)
            //console.log(`with brackets and json ${typeof user} ${JSON.stringify(user)}`)
            // console.log(`without brackets and json ${typeof user_withoutjson}`)
            if(user){
                console.log("In if condition of user exist consition")
                setError("User already exists");
                return;
            }

        
            const res = await fetch("api/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    name, 
                    email, 
                    password
                }),
            });
            console.log(` status is : ${res.status}`)

            // resetting the form, if information is right
            if(res.ok){
                    /*Getting the form in html format and resetting it.
                    Although, no parameter is passed while the handleSubmit is called
                     in onSubmit event attribute of the form but that form can be accessed using the
                    "reg argument"
                    */
                    const form = await reg.target;
                    console.log(`Form : ${form}`)
                    //resetting it
                    await form.reset();
                    //pushing or routing it to login page
                    await router.push("/")
            }

        } catch (error) {
            console.log("Error during registration", error)
        }
    }

    console.log(`n : ${name}, E: ${email}`)
    return <div className = "grid place-items-center h-screen">
        
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400" > 
        <h1 className="text-xl font-bold my-4">Enter detail:</h1>

        <form onSubmit = {handleSubmit} className="flex flex-col gap-3  ">
        {/* getting username using arrow function and then setting to username state*/}
        <input onChange={(un)=>{setName(un.target.value)}}
        type="text" placeholder="Username"/>
        
        {/* getting email using simple function and then setting to email state*/}
        <input onChange={function email(e){setEmail(e.target.value)}}
            type="text" placeholder="Email"/>
        
        {/* getting password using simple function and then setting to password state*/}
        <input onChange={(pw)=>{(setPassword(pw.target.value))}}
        type="text" placeholder="Password"/>
        
        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>
    {
        error && (
        <div className="bg-red-500 text-white w-fit text-sm rounded-md mt-2">{error}</div>
        )
    }
    <Link className="text-sm mt-3 text-right" href = {"/"}> 
    Already have an account?
    <span className="underline w-fit">Login</span></Link>
    </form>
    
    
    </div>
</div>
}

export default RegisterForm;