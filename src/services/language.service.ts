import axios from "@/lib/axios";

const getAll = async () => {
  const {data} = await axios.get("/languages");

  return data;
};

const getById = async (id: string) => {
  const {data} = await axios.get(`/languages/${id}`);

  return data;
};

export default {
  getAll,
  getById,
};
