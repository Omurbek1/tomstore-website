import Address from "@models/address.model";
import User from "@models/user.model";

const demoUser: User = {
  id: "demo-user",
  email: "customer@tomstore.kg",
  phone: "+996 555 000 000",
  avatar: "/assets/images/faces/ralph.webp",
  password: "",
  dateOfBirth: new Date("1995-01-01"),
  verified: true,
  name: { firstName: "Tomstore", lastName: "Customer" },
};

const addressList: Address[] = [
  {
    id: "office",
    user: demoUser,
    title: "Office",
    phone: "+996 555 000 000",
    street: "Chuy Avenue 123",
    city: "Bishkek",
    country: "Kyrgyzstan",
  },
  {
    id: "home",
    user: demoUser,
    title: "Home",
    phone: "+996 555 111 111",
    street: "Toktogul Street 45",
    city: "Bishkek",
    country: "Kyrgyzstan",
  },
];

const getAddressList = async (): Promise<Address[]> => addressList;

const getAddress = async (id: string): Promise<Address> =>
  addressList.find((item) => item.id === id) || addressList[0];

export default { getAddressList, getAddress };
