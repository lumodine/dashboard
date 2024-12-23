import axios from "@/lib/axios";

const getAllColors = async () => {
  const {data} = await axios.get("/theme/colors");

  return data;
};

const getAllFonts = async () => {
  const {data} = await axios.get("/theme/fonts");

  return data;
};

export default {
  getAllColors,
  getAllFonts,
};
