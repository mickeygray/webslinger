import React, {
 Fragment,
 useState,
 useContext,
 useEffect,
 useRef,
} from "react";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import { useAppContext } from "../../context/site/SiteState";

const DownloadableManager = () => {
 const siteContext = useContext(SiteContext);
 const imageContext = useContext(ImageContext);
 const { setActiveCollection } = useAppContext();
 const { myDownloadables, addCollection, collections } = siteContext;
 const { getCollectionPreview, collectionPreview, clearCollectionImage } =
  imageContext;
 const [collection, setCollection] = useState([]);
 const [collectionName, setCollectionName] = useState("");
 const [currCollection, setCurrCollection] = useState(null);

 const collectionEntry = {
  id: "",
  name: "",
 };

 console.log(collectionPreview);
 // Attach related object

 const addToCollection = () => {
  const newCollection = [...collection, collectionEntry];
  setCollection(newCollection);
 };

 const onChangeCollection = (i, e) => {
  let newCollection = [...collection];

  const newId = myDownloadables
   .filter((d) => d.name === e.target.value)
   .map(({ id }) => {
    return id;
   })[0];

  newCollection[i] = {
   ...newCollection[i],
   [e.target.name]: e.target.value,
   id: newId,
  };

  setCollection(newCollection);
  getCollectionPreview(e.target.value);
 };

 const deleteFromCollection = (i) => {
  let newCollection = collection.splice(0, i);

  setCollection(newCollection);
 };

 useEffect(() => {
  if (collectionPreview != null) {
   let newCollection = [...collection];

   newCollection[
    collection.findIndex((x) => x.name === collectionPreview.name)
   ] = {
    ...newCollection[
     collection.findIndex((x) => x.name === collectionPreview.name)
    ],
    code: collectionPreview.code,
   };

   setCollection(newCollection);
   clearCollectionImage();
  }
 }, [collectionPreview, collection]);

 console.log(collection);

 return (
  <div>
   <h3>Creat A Collection of Images</h3>
   <button className='btn btn-dark btn-block' onClick={() => addToCollection()}>
    Add A Collection Entry
   </button>

   {collection.map(({ name, code }, i) => {
    return (
     <div className='card'>
      <span
       style={{ float: "right" }}
       className='lead bg-light'
       onClick={() => deleteFromCollection(i)}>
       <a>X</a>
      </span>
      <div>
       <select name='name' onChange={(e) => onChangeCollection(i, e)}>
        {myDownloadables.map(({ name, id }, i) => (
         <option key={i} value={name}>
          {name}
         </option>
        ))}
       </select>
      </div>

      {code ? (
       <div>
        <img src={code} height='250px' width='250px' />
       </div>
      ) : (
       ""
      )}
     </div>
    );
   })}
   <input
    type='text'
    name='collectionName'
    onChange={(e) => setCollectionName(e.target.value)}
   />

   <button
    className='btn btn-primary btn-block'
    onClick={() => {
     addCollection({ [collectionName]: collection });
     setCollection([]);
     setCollectionName("");
    }}></button>

   <div>
    <select
     name='currCollection'
     onChange={(e) => setCurrCollection(e.target.value)}>
     {collections.map((collection) => (
      <option value={collection}>
       {Object.keys(collection)[0].split(0, 1).toUpperCase() +
        Object.keys(collection)[0].split(1, Object.keys(collection)[0].length)}
      </option>
     ))}
    </select>
    <button
     className='btn btn-black'
     onClick={() => {
      setActiveCollection(currCollection);
      setCurrCollection(null);
     }}>
     Use Collection
    </button>
   </div>
  </div>
 );
};

export default DownloadableManager;
