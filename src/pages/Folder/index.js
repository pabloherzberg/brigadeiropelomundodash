/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import firebase from "../../services/firebase";

import { Main } from "./styles";
import Loading from "../../components/Loading";

import semImagem from '../../assets/img/Item_sem_imagem.svg.png'

function Folder() {

  const {state} = useLocation();


  const [folder, setFolder] = useState(false)
  const [selectedFlavor, setSelectedFlavor] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [hover, setHover] = useState(false)

  const [image, setImage] = useState('')
  const [imageFullData, setImageFullData] = useState('')

  const [imageFolder, setImageFolder] = useState('')

  const [create, setCreate] = useState(false)

  const [loading, setLoading] = useState(true)

  const [minCount, setMinCount] = useState(false)

  useEffect(()=>{
    firebase
      .database()
      .ref(`/pastas/${state}`)
      .on("value", async (snapshot) => {
        const snap = snapshot.val();
        if(snap){
          setFolder(snap)
          setImageFolder(snap.urlImage)
          setMinCount(snap.count)
        }else{
          setFolder(false)
        }
      });
  },[state])

  useEffect(()=>{
    setLoading(true)
    firebase
      .storage()
      .ref(`${state}/${selectedFlavor.key}`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        setLoading(false)
      })
      .catch(() => {
        setImage(false);
        setLoading(false)
      });
  },[selectedFlavor, state])

  useEffect(()=>{
   if(folder){
     firebase
         .database()
         .ref(`/pastas/${state}/count`)
         .set(minCount)

   }    
  },[minCount])

  async function handleCreateFlavor(){
      //criar uma chave
      const chave = firebase
      .database()
      .ref(`/pastas/${state}/flavors`)
      .push()
      .key


      //upload imagem
      if(imageFullData){
       await firebase
          .storage()
          .ref(`${state}/${chave}`)
          .put(imageFullData)
          .then(() => {
            firebase
            .storage()
            .ref(`${state}/${chave}`)
            .getDownloadURL()
            .then(res=>{
               //criar item passando a chave criada                    
                const candy = {
                  name: name,
                  price: price,
                  key: chave,
                  urlImage:res
                }
                //setar valores do item na chave criada
                firebase
                  .database()
                  .ref(`/pastas/${state}/flavors/${chave}`)
                  .set(candy)
            })
          })
          .catch((e) => console.error(e));
       } 

       setName('')
       setPrice(0)
       setCreate(false)
 
  }

  async function handleUpdateFolderImage(event){

    const fileObj = event.target.files[0];

    if(folder.urlImage){
      await firebase
            .storage()
            .ref(`${state}/${state}`)
            .delete()
            .then(()=>{
              firebase
                .storage()
                .ref(`${state}/${state}`)
                .put(fileObj)
                .then(()=>{
                  firebase
                  .storage()
                  .ref(`${state}/${state}`)
                  .getDownloadURL()
                  .then(res=>{
                      //setar valores do item na chave criada
                      firebase
                        .database()
                        .ref(`/pastas/${state}`)
                        .set({urlImage:res, ...folder})
                  })
                })
            })
        }else{
          firebase
              .storage()
              .ref(`${state}/${state}`)
              .put(fileObj)
              .then(()=>{
                firebase
                .storage()
                .ref(`${state}/${state}`)
                .getDownloadURL()
                .then(res=>{
                    //setar valores do item na chave criada
                    firebase
                      .database()
                      .ref(`/pastas/${state}`)
                      .set({urlImage:res, ...folder})
                })
              })
        }

          const image = URL.createObjectURL(fileObj);
          setImageFolder(image)
  }

  function handleDelete(e){

    const res = window.confirm('Tem certeza que deseja apagar esta opção de sabor?')
    if(res){
     firebase
       .database()
       .ref(`/pastas/${state}/flavors/${e.target.name}`)
       .remove()
    }
  }

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

  function handleUpdate(){
    firebase
      .database()
      .ref(`/pastas/${state}/flavors/${selectedFlavor.key}`)
      .set({
        name:name,
        price:price,
        key:selectedFlavor.key
      })
  }

  return (
    <Main>    
    {/* LISTAGEM */}
      {folder &&
      <div id='list'>
        <div id='header'>
          <button id='add' onClick={()=>setCreate(true)}>Adicionar</button>
          <div 
            onMouseLeave={()=>setHover(false)}
            onMouseEnter={()=>setHover(true)} 
            id='inputWrapper'>
            <input type="file" name="image" onChange={handleUpdateFolderImage} />
            {imageFolder ? <img style={{width:'200px'}} src={imageFolder} />: <img style={{width:'200px'}} src={semImagem} /> }
            <span style={{opacity:hover?1:0}}>Alterar</span>
          </div>
          <h2>{folder.name}</h2>
          <div id='min'>
            <span>Qnt mínima:</span>
            <input 
              type="text" 
              name="min" 
              value={minCount || 0} 
              onChange={e=>setMinCount(e.target.value)}
            />
          </div>
        </div>
        {Object.values(folder.flavors).map(flavor=>(
          <div id='item' 
            onClick={()=>{
              setSelectedFlavor(flavor)
            }} 
            className='flavorItem'>
            <p>{flavor.name}</p>
            <button name={flavor.key} onClick={handleDelete}>Deletar</button>
          </div>
        ))}
      </div>}

    {/* EDIÇÃO */}
      {selectedFlavor ?
        <div id='edit'>
          {loading? <Loading/> :<img src={image} />}
          <input 
            type="text" 
            name="name" 
            onChange={e=>setName(e.target.value)}
            placeholder={selectedFlavor.name} 
            />
          <input 
            type="text" 
            name="price" 
            onChange={e=>setPrice(e.target.value)} 
            placeholder={selectedFlavor.price}
            />
          <button className={(name && price)?'update':'disable'} onClick={handleUpdate}>Atualizar</button>
      </div>:
      <Loading/>
      }
      {/* CRIAÇÃO */}
    {create &&
      <div id='create'>
        <div id='wrapper'>
          <input 
            type="text" 
            name="name"
            placeholder='Nome' 
            onChange={e=>setName(e.target.value)} 
            />
          <input 
            type="text" 
            name="price" 
            placeholder='R$ 0,00'
            onChange={e=>setPrice(e.target.value)}
            value={Number(price).toFixed(2)}
            />
          {image&& <img src={image} />}
          
          <input type="file" name="image" onChange={fileHandler} />
          <div>
            <button onClick={handleCreateFlavor}>Salvar</button>
            <button onClick={()=>setCreate(false)}>Fechar</button>
          </div>
        </div>
      </div>
    }
    </Main>
  );
}

export default Folder;
