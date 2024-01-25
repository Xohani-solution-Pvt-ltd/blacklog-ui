import { api } from "./api";
const { jwtGet, jwtPost, post, get,put,jwtPut} = api;

const getUserDetailsAPI = async () => {
  let err = null;
  let data = null;
  try {
    data = await jwtGet("/auth/verifytoken");
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

const loginUserAPI = async (body) => {
  let err = null;
  let data = null;

  try {
    data = await post("/auth/login", body);
  } catch (e) {
    if (e?.response?.status) {
      err = e?.json;
    }
  }

  return [data, err];
};

const changeUserPassword = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await post("/auth/changePassword", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

const createUserAPI = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await post("/auth/signup", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

const createProfileAPI = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await jwtPost("/createProfile", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const profileAPIData = async (id)=>{
let err =null;
let data =null;
try {
  data = await jwtGet(`/createProfile/${id}`);
} catch (e) {
  if(e?.response?.status===400){
    err = e?.json;
  }
}
return [data, err];
};

const forgotPassword = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await post("/auth/forgotPassword", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};


const getUsers = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await get("/users",body);
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

const submitDiagnosisAPI = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await jwtPost("/diagnosis", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

const updateDiagnosisAPI = async (id,body) => {
  let err = null;
  let data = null;
  try {
    data = await put(`/diagnosis/${id}`,body);
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const getDiagnosisDetailsAPI = async (id) => {
  let err = null;
  let data = null;
  try {
    data = await jwtGet(`/diagnosis/${id}`);
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const submitComorbiditiesAPI = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await jwtPost("/comorbidities", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const getComorbiditiesDetailsAPI = async (id) => {
  let err = null;
  let data = null;
  try {
    data = await jwtGet(`/comorbidities/${id}`);
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const updateComorbiditiesAPI =async (id , body )=>{
  let err = null;
  let data = null;
  try {
    data = await put(`/comorbidities/${id}`, body);
  } catch (e) {
    if(e.response?.status === 401){
      err = e?.json;
    }
  }
  return [data, err];
}

export const submitSymptomsMonitoringAPI = async (body) => {
  let err = null;
  let data = null;
  try {
    data = await jwtPost("/symptom/monitoring", body);
  } catch (e) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const getSymptomsMonitoringAPI = async (id) => {
  let err = null;
  let data = null;
  try {
    data = await jwtGet(`/symptom/${id}`);
  } catch (e) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }
  return [data, err];
};

export const updateSymptomsAPI =async(id,body)=>{
  let err= null;
  let data = null;
  try {
    data = await put(`/symptom/${id}`,body);
  } catch (e) {
    if(e.response?.status===401){
      err =e?.json;
    }
  }
  return [ data ,err];
}

export const getBloodTestAPI = async (id)=>{
  let err = null;
  let data =null;
  try {
    data = await jwtGet(`/blood/${id}`);
  } catch (e) {
    if(e.response?.status ===401){
      err =e?.json;
    }
  }
  return [data,err];
}
 const submitBloodTestAPI = async (body)=>{
  let err =null;
  let data =null;
  try {
    data= await jwtPost("/blood",body);
  } catch (e) {
    if(e?.response?.status===400){
      err =e?.json;
    }
  }
  return [data, err];
};

export const updateBloodTestAPI =async(id,body)=>{
  let err= null;
  let data = null;
  try {
    data = await put(`/blood/${id}`,body);
  } catch (e) {
    if(e.response?.status===401){
      err =e?.json;
    }
  }
  return [ data ,err];
}


export { getUserDetailsAPI, createUserAPI,createProfileAPI, loginUserAPI ,changeUserPassword,forgotPassword, getUsers, submitDiagnosisAPI,updateDiagnosisAPI ,submitBloodTestAPI};
