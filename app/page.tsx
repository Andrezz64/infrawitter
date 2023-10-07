"use client";


import { useEffect, useState } from "react";
import 'reactjs-popup/dist/index.css';
import PostComponent from "./components/Posts";
import { TextManipulation } from "./Modules/TextManipulation";
import { ArrowCounterClockwise, CircleNotch, Plus } from "@phosphor-icons/react";
import Popup from "reactjs-popup";
import { useRouter } from "next/navigation";

const test = 32
export default function Home() {
  const [post, setPost]: any = useState();
  const [title, seTitle]: any = useState("");
  const [content, setContent]: any = useState("");
  const contentStyle = { background: '#121212' };

  const router = useRouter()
  function atualizaPost() {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api", options)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }

  const handlesubimit = async (e: any) => {
    e.preventDefault();
    const newContent = TextManipulation.ConvertQuebraDeLinha(content)
    const textoSemaspas = TextManipulation.ConvertAspas(newContent)
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"title":"${title}","content":"${textoSemaspas}"}`,
    };

    fetch("/api", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        }
        else{
          location.reload()
        }
      })

    
    

  };

  useEffect(() => {
      const token = sessionStorage.getItem("isAuth")

      if(token == null){
        router.push("/login")
      }
      else{
        fetch("/api", 
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next:{revalidate:60}
      }
  )
        .then((response) => response.json())
        .then((response) => {
          setPost(response);
          console.log(response);
        })
        .catch((err) => console.error(err));
    
      }
      
  
   
  }, []);
  return (
    <div>
      <main className="flex flex-col justify-center items-center pt-10">
      
      <Popup contentStyle={contentStyle} trigger={<button className="bg-sky-500 p-2 rounded-full "><Plus size={24}></Plus> </button>} modal>
      <div className=" bg-[#121212] p-5 rounded-lg">
          <form
            className=" flex flex-col justify-center  gap-3 items-center"
            onSubmit={handlesubimit}
          >
            <h1>O que está pensando ?</h1>
            <input

              type="text"
              value={title}
              onChange={(e) => seTitle(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md w-[20rem] p-1"
              placeholder="Titulo"
            />
          
             <textarea
              
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md w-[20rem] h-[20rem]"
              placeholder="Menssagem"
            /> 

                

            <div className="flex justify-start">
             <p></p>
            </div>
            <button className="bg-sky-500 p-2 rounded-full disabled">Publicar</button>
            
          </form>
        </div>
  </Popup>
        
        <button className="mt-5" onClick={atualizaPost}><ArrowCounterClockwise size={32} color="#05b5f0" /></button>

        <span className="mt-10  flex gap-5 flex-wrap flex-col justify-center items-center ">
          {post ? (
            post.map((dados: any) => {
              return (
                <PostComponent
                  title={dados.title}
                  content={dados.content}
                  data={dados.createdat}
                  id={dados.id}
                  key={dados.id}
                ></PostComponent>
              );
            })
          ) : (
            <div className="animate-spin"><CircleNotch size={32} color="#05b5f0" /></div>
          )}
        </span>
      </main>
    </div>
  );
}
