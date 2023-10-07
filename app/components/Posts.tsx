import { Chat, Pencil } from "@phosphor-icons/react";
import { useState } from "react";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import { TextManipulation } from "../Modules/TextManipulation";
import { Numero } from "../Modules/Numbers";
import { Data } from "../Modules/DateOperations";
export default function PostComponent(props: any) {
  const [title, seTitle]: any = useState(props.title);
  const [content, setContent]: any = useState(props.content);
  const [commentName, setCommentName]:any = useState("Anonimo"+ Numero.gerarNumeroAleatorio(0,100))
  const [commentContent, setCommentContent]:any = useState()
  const newContent = { __html: props.content };
  const dataObjetct = new Date(props.data)
  const dataFormatada = Data.FormatDate(dataObjetct)
  
  const contentStyle = { background: "#121212" };

  const contentSemBr = TextManipulation.ConvertBreakHtml(content);

  const handlesubimitComment = (e: any) => {
    
    
    e.preventDefault();
    
    const texto = TextManipulation.ConvertQuebraDeLinha(content);
    const textoSemaspas = TextManipulation.ConvertAspas(texto)
    const commentContentConvertido = TextManipulation.ConvertQuebraDeLinha(commentContent);
    const commentSemAspas = TextManipulation.ConvertAspas(commentContentConvertido)
    const commentPattern = `<br><div style='background-color: #121212; color: #fff; padding: 10px; border-radius: 10px;'><p>${commentName}</p>${commentSemAspas}</div>`
    
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"title":"${title}","content":"${textoSemaspas + commentPattern}","id":${props.id}}`,
    };

    fetch("/api", options)
      .then((response) => response.json())
      .then((response) => {
        location.reload();
      })
      .catch((err) => console.error(err));
  };


  const handlesubimit = (e: any) => {
    e.preventDefault();
    const texto = TextManipulation.ConvertQuebraDeLinha(content);
    const textoSemaspas = TextManipulation.ConvertAspas(texto)

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"title":"${title}","content":"${textoSemaspas}","id":${props.id}}`,
    };

    fetch("/api", options)
      .then((response) => response.json())
      .then((response) => {
        location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="border-b-2 border-gray-500 overflow-auto max-w-[20rem] min-w-[20rem] p-3 flex flex-col justify-center  flex-wrap">
      <h1 className="text-2xl">{props.title}</h1>
      <br />
      <p dangerouslySetInnerHTML={newContent}></p>
      <br />
      <p className="text-sm">
        
        Publicado <data className="">{dataFormatada}</data>
      </p>
      <Popup
        contentStyle={contentStyle}
        trigger={
          <button className="mt-5 bg-[#121212] p-2 rounded-lg mb-5 flex justify-center items-center">
            <Chat size={32} color="#05b5f0" />
          </button>
        }
        modal
      >
       <div>
          <form
            className=" flex flex-col justify-center  gap-3 items-center"
            onSubmit={handlesubimitComment}
          >
            <h1>Editar Nota</h1>
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md p-1"
              placeholder="Titulo"
              required
            />
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md w-[30rem] h-[20rem] p-1 resize-none"
              placeholder="Menssagem"
              required
            ></textarea>

            <button className="bg-sky-500 p-2 rounded-md">Atualizar ✅</button>
          </form>
        </div>

      </Popup>

      
      <Popup
        contentStyle={contentStyle}
        trigger={
          <button className="flex gap-2 justify-center items-center text-sm">
            <Pencil size={20} color="#f08e05" />
            Editar
          </button>
        }
        modal
      >
        <div>
          <form
            className=" flex flex-col justify-center  gap-3 items-center"
            onSubmit={handlesubimit}
          >
            <h1>Editar Nota</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => seTitle(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md p-1"
              placeholder="Titulo"
            />
            <textarea
              value={contentSemBr}
              onChange={(e) => setContent(e.target.value)}
              className="bg-transparent border-2 border-white rounded-md w-[30rem] h-[20rem] p-1 resize-none"
              placeholder="Menssagem"
            ></textarea>

            <button className="bg-sky-500 p-2 rounded-md">Atualizar ✅</button>
          </form>
        </div>
      </Popup>
      <div></div>
    </div>
  );
}
