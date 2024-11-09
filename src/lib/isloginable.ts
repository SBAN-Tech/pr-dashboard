export const isloginable = (id?: string, users?: Array<string>) => (id ? (id && users) ? users.includes(id) : false : false);
