import axios from "@/lib/axios";

const getAllColors = async () => {
  const {data} = await axios.get("/theme/colors");

  return data;
};

export default {
  getAllColors,
};
