let fetchEnd = (Url, programs, useData)=>{
    let Opt = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body:JSON.stringify({...programs})
      };
    fetch(Url,Opt)
        .then(response => {
          if(response.ok) {
              response.json().then(data => {
                  //console.log(data);
                  useData(data);
              });
          } else {
              console.log("请求不成功，状态码为", response.status);
          }
      })
      .catch(error => console.log('error is', error));
}

export{fetchEnd};