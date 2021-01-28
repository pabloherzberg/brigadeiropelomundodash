import React, { useState, useEffect, useRef } from "react";
import firebase from "../../services/firebase";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading";

import folderSVG from "../../assets/img/folder.svg";

import semImagem from '../../assets/img/Item_sem_imagem.svg.png'

import { Main } from "./styles.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [rightClick, setRightClick] = useState(false)
  const [modalCreateFolder, setModalCreateFolder] = useState(true)
  const [selectedFolder, setSelectedFolder] = useState('')
  const [folderName, setFolderName] = useState('')
  const [folderStatus, setFolderStatus] = useState(false)
  const [image, setImage] = useState(false)
  const [imageFullData, setImageFullData] = useState(false)
  const [hover, setHover] = useState(false)
  const [mousePos, setMousePos] = useState({
    x:0,
    y:0
  })

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref('/pastas')
      .on("value", async (snapshot) => {
        const snap = snapshot.val();
        setFolders(snap);
        setLoading(false);
      });
  }, []);

  async function fileHandler(event) {
    //setLoading(true);
    const fileObj = event.target.files[0];

    if (fileObj) {
      const image = URL.createObjectURL(fileObj);
      setImage(image);
      setImageFullData(fileObj);
      //setLoading(false);
    } else {
      console.log("Imagem não carregada");
    }
  }

  async function handleCreateFolder(){

    //criar uma chave
    const chave = firebase
    .database()
    .ref('/pastas')
    .push()
    .key

    await firebase
          .storage()
          .ref(`${chave}/${chave}`)
          .put(imageFullData)
          .then(() => {
            firebase
            .storage()
            .ref(`${chave}/${chave}`)
            .getDownloadURL()
            .then(res=>{
                //criar item passando a chave criada                    
                const folder = {
                  name: folderName,
                  key: chave,
                  flavors:false,
                  urlImage:res
                }
                //setar valores do item na chave criada
                firebase
                .database()
                .ref(`/pastas/${chave}`)
                .set(folder)
              })
          })
          .catch((e) => console.error(e));



   
/* 
      //criar item passando a chave criada                    
      const folder = {
        name: folderName,
        key: chave,
        flavors:false
      }

      //setar valores do item na chave criada
      firebase
      .database()
      .ref(`/pastas/${chave}`)
      .set(folder) */

      setFolderName('')
      setModalCreateFolder(false)

  }

  function handleDeleteFolder(){
   const res = window.confirm('Tem certeza que deseja deletar esta pasta? Você perderá todos os dados salvos nesta pasta')
   if(res){
    firebase
      .database()
      .ref(`/pastas/${selectedFolder}`)
      .remove()
   }

    setRightClick(false)
  }

  function toogleStatus(){
    firebase
      .database()
      .ref(`pastas/${selectedFolder}/status`)
      .set(!folderStatus)

    setRightClick(false)
  }

  return (
    <Main>
      <header>
        <h1>Brigadeiro Pelo Mundo Dashboard</h1>
      </header>
      <div id='main'
        onContextMenu={(e)=>{
                    e.target.id === 'main' && setSelectedFolder(false)
                    e.preventDefault()
                    setMousePos({
                      x:e.clientX,
                      y:e.clientY
                    })
                    setRightClick(true)
                }}
      >
        {loading ? (
          <Loading />
        ) : 
           folders && Object.values(folders).map(folder => (
              <div 
                className={folder.status?'folder activated':'folder'}
                key={folder.key}
                onClick={()=>history.push({
                  pathname:'/pasta',
                  state:folder.key
                })}
                onContextMenu={(e)=>{
                    e.preventDefault()
                    setSelectedFolder(folder.key)
                    setFolderStatus(folder.status)
                    setMousePos({
                      x:e.clientX,
                      y:e.clientY
                    })
                    setRightClick(true)
                }}
              >   
                <img  src={folderSVG} />
                <p  >{folder.name}</p>
              </div>
            ))       
        }
      </div>

     {rightClick &&  (
       <div id='menuWrapper' onClick={e=>{
         if(e.target.id === 'menuWrapper'){
           setRightClick(false)
         }
       }}>
         <div style={{top:mousePos.y, left:mousePos.x}} id='menu'>
          <p className={!selectedFolder?'':'disable'} 
              onClick={()=>{
                setModalCreateFolder(true)
                setRightClick(false)
              }}>Criar pasta</p>
          <p className={!selectedFolder?'disable':''} onClick={toogleStatus}>{folderStatus?'Desativar':'Ativar'}</p>
          <p className={!selectedFolder?'disable delete':'delete'} onClick={handleDeleteFolder}>Deletar pasta</p>
        </div>
      </div>
      )}
    
    {modalCreateFolder &&  (
      <div id='createFolder'>
        <div>
          <input placeholder='Nome da pasta' type="text" name="name" onChange={e=>setFolderName(e.target.value)}/>
          <div 
            onMouseLeave={()=>setHover(false)}
            onMouseEnter={()=>setHover(true)} 
            id='inputWrapper'>
            <input type="file" name="image" onChange={fileHandler} />
            {image ? <img style={{width:'200px'}} src={image} />: <img style={{width:'200px'}} src={semImagem} /> }
            <span style={{opacity:hover?1:0}}>Alterar</span>
          </div>
          <div id='wrapperActions'>
            <button onClick={()=>{
              setFolderName('')
              setImage(false)
              setModalCreateFolder(false)
            }}>Cancelar</button>
            <button onClick={handleCreateFolder}>Criar pasta</button>
          </div>
        </div>
      </div>
    )}
       
    </Main>
  );
}

export default Home;
