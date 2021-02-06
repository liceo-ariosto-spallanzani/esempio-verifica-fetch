const fetch = require("node-fetch")

const accreditamento = () => {
  /*
   richiesta in post all'endpoint dell'accreditamento;
   nota bene:
   * il body e' un JSON non un oggetto di js, quindi bisogna fare sempre JSON.stringify
   * attenzione a mettere le l'header Content-Type: application/json altrimenti il 
     server non sa che gli state mandando questo tipo di dato
   * ricordare sempre di mettere i console log del resBody e il catch nella promise chain 
  */
  fetch("http://192.168.1.60:8080/accreditamento", {
      method: "post",
      body: JSON.stringify({
        nome: "Giovanni Bruno"
      }),
      headers: {
        "Content-Type": "application/json"
      },
  })
  .then(res => res.json())
  .then(resBody => console.log(resBody))
  .catch(err => console.log(err))
}

const es1 = () => {
  /*
   richiesta in post all'endpoint dell'accreditamento;
   nota bene:
   * ricordare di inserire l'header x-data: 'true' altrimenti non vengono passati i dati da elaborare
     ma solo il messaggio dell'esercizio
  */
  fetch("http://192.168.1.60:8080/esercizi/1", {
      method: "get",
      headers: {
        "x-data": "true"
      },
  })
  .then(res => res.json())
  .then(resBody => {
    /*
      resBody e' sempre un oggetto contentente le chiavi message e data.
      Data a seconda dell'esercizio puo' essere un tipo di dato differente
      es: stringa, number, array, object...
    */
    const reqData = resBody.data
    const risultato = reqData.toLowerCase()
    console.log(risultato)

    return fetch("http://192.168.1.60:8080/esercizi/1", {
      method: "post",
      body: JSON.stringify({
        data: risultato
      }),
      headers: {
        "Content-Type": "application/json"
      }  
    })
  })
  .then(res => res.json())
  .then(resBody => console.log(resBody))
  .catch(err => console.log(err))
}

es1()
