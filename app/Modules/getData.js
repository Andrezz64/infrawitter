export default async function GetData(){
   const data = await fetch("/api", 
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next:{revalidate:60}
    }
)
      .then((response) => response.json())
      .then((response) => {
        
        return res.response;
      })
      .catch((err) => console.error(err));
 
}