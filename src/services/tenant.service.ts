import axios from "@/lib/axios";

const getAll = async () => {
  const { data } = await axios.get("/tenants");

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get(`/tenants/${id}`);

  return data;
};

type CreateProps = {
  name: string;
  alias: string;
  languages: any[];
  currencies: any[];
};

const create = async ({ name, alias, languages, currencies }: CreateProps) => {
  const { data } = await axios.post(`/tenants`, {
    name,
    alias,
    languages,
    currencies,
  });

  return data;
};

export default {
  getAll,
  getById,
  create,
};
