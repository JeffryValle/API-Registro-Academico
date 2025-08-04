


export const setID = () => {

  const timestamp = Date.now().toString(); 

  const random = Math.floor( 100 + Math.random() * 900 ); 

  return (timestamp.slice(-9) + random).slice(0, 12); 
}
