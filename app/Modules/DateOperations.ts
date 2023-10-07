class date{
    public FormatDate(dataPublicacao:Date){
    const agora:any = new Date();
  const dataPost:any = new Date(dataPublicacao);

  const diferenca = agora - dataPost;
  const segundos = Math.floor(diferenca / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);

  switch (true) {
    case diferenca < 1000:
      return 'agora mesmo';
    case segundos < 60:
      return `há ${segundos} segundo${segundos === 1 ? '' : 's'}`;
    case minutos < 60:
      return `há ${minutos} minuto${minutos === 1 ? '' : 's'}`;
    case horas < 24:
      return `há ${horas} hora${horas === 1 ? '' : 's'}`;
    case dias < 30:
      return `há ${dias} dia${dias === 1 ? '' : 's'}`;
    case meses < 12:
      return `há ${meses} mês${meses === 1 ? '' : 'es'}`;
    default:
      const formatoData = { year: 'numeric', month: 'short', day: 'numeric' };
      return dataPost.toLocaleDateString('pt-BR', formatoData)
    }
}
}

export const Data = new date()