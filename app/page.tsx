"use client"
import { useState, useEffect } from 'react';
import { getAllFile, putNewFile, deleteFile, editFile } from '@/app/services/index';
import { CldUploadWidget } from 'next-cloudinary';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Model from '@/app/components/modelfile';

export default function Home() {
  const [url, setUrl] = useState(null);
  const [model, setModel] =useState<any> (false);
  const [result, setResult] = useState([]);
  const [editData, setEditData] = useState(null);
  const [hover, setHover] = useState(-1);
  const [file,setfile]=useState(0)
 const [realdata,setrealdata]=useState([])

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    if(file==1){
      let r=realdata?.filter((item)=>{return item.format=="video"})
      setResult(r)
     
    }
    else if(file==2){
      let w=realdata?.filter((item)=>{return item.format=="image"})
      setResult(w)
      
    }
    else{
      let q=realdata?.filter((item)=>{return item})
      setResult(q)
    
    }
   },[file])

  async function fetchData() {
    const response = await getAllFile();
    console.log("fetchData", response)
    if (response.success) {
      setResult(response.data);
      setrealdata(response.data)
    }
  }

  useEffect(() => {
    if (url) {
      putFile();
      console.log("URL", url);
    }
  }, [url]);

  async function putFile() {
    const response = await putNewFile(url);
    if (response.success) {
      fetchData();
      setUrl(null);
      console.log("RESPONSE", response);
    }
  }

  async function handleDelete(data) {
    console.log("DATA", data);
    const response = await deleteFile(data);
    if (response.success) {
      fetchData();
      console.log("DELETE RESPONSE", response);
    }
  }

  async function handleEdit(data) {
    setModel(true);
    setEditData({ data, status: false });
    console.log("MODEL");
    console.log("DATA", data);
  }

  return (
    <div>
      {model && <Model setModel={setModel} editData={editData} setEditData={setEditData} />}
      <div className='sticky top-0 z-50'>
      <div className='min-h-xl  pb-10 bg-white text-left p-5  flex justify-between gap-2 shadow-2xl'>
      <CldUploadWidget 
      uploadPreset="todo_app"
     onSuccess={({event,info})=>{
    if(event === "success"){
      setUrl({url:info?.secure_url,format:info?.resource_type})
    }
}}>
  {({ open }) => {
    return (
      <button 
      className="text-md p-2 bg-green-400 text-white lowercase rounded-md"
      onClick={() => open()}>
       {!url?"Upload File":"Loading"}
      </button>
    );
  }}
      </CldUploadWidget>
     </div>
    <div className='p-3 rounded-es-3xl  flex justify-center gap-10 bg-white mb-10  w-[50%] absolute right-0 before:bg-white shadow-xl  before:h-full before:w-[80px] before:rotate-45 before:bottom-6  before:absolute before:-left-10'>
            <button onClick={()=>setfile(0)} className='uppercase text-sm text-green-600'>All</button>      
            <button onClick={()=>setfile(1)} className='uppercase text-sm text-green-600'>Videos</button>          
            <button onClick={()=>setfile(2)} className='uppercase text-sm text-green-600'>Images</button>
      </div>
      </div>

      <div className='grid grid-cols-3 gap-3 px-10 mt-20'>
        {result && result.length > 0 ? result.map((item, index) => (
          <div key={index} className='cursor-pointer relative transition-all duration-100 delay-100 hover:scale-90'>
            {item.format === 'image' ? (
              <div onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}>
                <img src={item.url} alt="img" className='w-full' />
                {hover === index && (
                  <div className='absolute bottom-2 left-2 flex justify-center items-center gap-2'>
                    <FaEdit onClick={() => handleEdit(item)} className='text-3xl text-green-500 bg-white rounded-full p-1' />
                    <MdDelete onClick={() => handleDelete(item)} className='text-3xl text-green-500 bg-white rounded-full p-1' />
                  </div>
                )}
              </div>
            ) : (
              <div onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}>
                <video className='w-full h-full' controls autoPlay loop>
                  <source src={item.url} type="video/mp4" />
                </video>
                {hover === index && (
                  <div className='absolute bottom-2 left-2 flex justify-center items-center gap-2'>
                    <FaEdit onClick={() => handleEdit(item)} className='text-3xl text-green-500 bg-white rounded-full p-1' />
                    <MdDelete onClick={() => handleDelete(item)} className='text-3xl text-green-500 bg-white rounded-full p-1' />
                  </div>
                )}
              </div>
            )}
          </div>
        )) : (
          <h1 className='text-xl text-center animate-pulse'>Fetching your data...</h1>
        )}
      </div>
    </div>
  );
}
