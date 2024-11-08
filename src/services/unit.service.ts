import axios from "@/lib/axios";

const getAll = async () => {
  const { data } = await axios.get("/units");

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get(`/units/${id}`);

  return data;
};

export default {
  getAll,
  getById,
};
