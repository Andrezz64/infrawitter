'use client'


import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const router = useRouter()
    const [senha,setSenha] = useState()
    const handledSubmit = (e:any) =>{
        e.preventDefault()
        
        const options = {
            method: 'POST',
            headers: {
              
              'Content-Type': 'application/json'
            },
            body: `{"senha":"${senha}"}`
          };
          
          fetch('/login/api', options)
            .then(response => response.json())
            .then(response => {if(response.Sucess){
                sessionStorage.setItem("isAuth","yes")
                router.push("/")
            }

        }
            )
            .catch(err => console.error(err));


        
    }
    return(
       
        
        <div className=" flex justify-center items-center">
            <form className="mt-10 flex flex-col gap-3" onSubmit={handledSubmit}>
       
                Senha
                <input type="password" value={senha} onChange={(e:any) => setSenha(e.target.value)} className="bg-transparent border-2 border-sky-500 rounded" />
            </form>
        </div>
    )
}