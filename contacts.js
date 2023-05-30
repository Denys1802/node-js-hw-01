const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const res = list.find((el) => el.id === contactId);
    return res || null;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(null, 2));
  return res;
};

const addContact = async (name, email, phone) => {
  const list = await listContacts();
  const newUser = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newUser);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newUser;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
