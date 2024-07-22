export const dynamic = "force-dynamic";
export const getAllFile = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/GET`, {
        method: 'GET',
        cache: 'no-store',
        next:{
          revalidate:10
        },
      });
       //res.headers.set('Cache-Control', 'no-store');
      const data = await res.json();
    
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const putNewFile = async (file) => {
    try {
      const res = await fetch(`http://localhost:3000/api/POST`, {
        method: 'POST',
        body: JSON.stringify(file),
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteFile = async (file) => {
    try {
      const res = await fetch(`http://localhost:3000/api/DELETE`, {
        method: 'DELETE',
        body: JSON.stringify(file),
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const editFile = async (file) => {
    try {
      const res = await fetch(`http://localhost:3000/api/UPDATE`, {
        method: 'PUT',
        body: JSON.stringify(file),
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  