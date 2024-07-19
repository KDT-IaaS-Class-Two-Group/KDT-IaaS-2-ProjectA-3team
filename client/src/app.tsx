import React,{useState} from 'react';

const App = () =>{
  const [content, newContent] = useState('');
  const [innerContent, newInnerContent] = useState('');
  const send=()=>{
    const data = {
      content:content
    }
    fetch("http://localhost:3001/send",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => newInnerContent(innerContent+data.content))
  }
  return(
  <div>
    <input type="text" value={content} onChange={(element)=>newContent(element.target.value)}placeholder="내용을 입력하세요"/>
    <button  onClick={send}>전송하기</button>
    <div id="inner">{innerContent}</div>
  </div>
  )
}

export default App;