import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get("/events", {
    params: {
      tenant: tenantId,
    },
  });

  return data;
};

const getAllGrouped = async (tenantId: string) => {
  const {data} = await axios.get("/events/grouped", {
    params: {
      tenant: tenantId,
    },
  });

  return data;
};

export default {
  getAll,
  getAllGrouped,
};
