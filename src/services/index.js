import axios from "axios";

const getAll = async () => {
  const { data } = await axios.get("/users");
  return data;
};

const getOne = async (uuid) => {
  const { data } = await axios.get(`/users/${uuid}`);
  return data;
};

const deleteOne = async (uuid) => {
  const { data } = await axios.delete(`/users/${uuid}`);
  return data;
};

const yp = {
  users: {
    getAll,
    getOne,
    deleteOne,
  },
};

export default yp;
