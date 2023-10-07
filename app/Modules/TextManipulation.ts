

class textManipulation{
    public ConvertQuebraDeLinha(texto:String){
      
            // Expressão regular para capturar quebras de linha
            const regex = /\n|\r/g;
          
            // Substitui as quebras de linha por <br>
            return texto.replace(regex, "<br>");
    }
    
    public ConvertBreakHtml(texto:string){
              
            // Expressão regular para capturar quebras de linha
            const regex = /<br>|\r/g;
          
            // Substitui as quebras de linha por <br>
            return texto.replace(regex, "\n");
    }

    public ConvertAspas(texto:string){
              
        // Expressão regular para capturar quebras de linha
        const regex = /"|\r/g;
      
        // Substitui as quebras de linha por <br>
        return texto.replace(regex, "'");
}

}

export const TextManipulation = new textManipulation()