const userContacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allListContacts = await userContacts.listContacts();
      console.log(allListContacts);
      break;

    case "get":
      const user = await userContacts.getContactById(id);
      console.log(user);
      break;

    case "add":
      const addUser = await userContacts.addContact(name, email, phone);
      console.log(addUser);
      break;

    case "remove":
      const removeUser = await userContacts.removeContact(id);
      console.log(removeUser);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
