import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getUser } from "./auth";
import { app } from "../main";
import { ProfileProps } from "../routes/Profile";

export function updateUserList() {
  window.localStorage.removeItem("userList");
  window.localStorage.removeItem("userData");
  getUserList();
  getUserData();
}
export async function getUserList(): Promise<ProfileProps[]> {
  const userListStorage = JSON.parse(
    window.localStorage.getItem("userList") || "[]"
  ) as ProfileProps[];
  if (userListStorage.length === 0) {
    const data: ProfileProps[] = [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "people"));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), dbId: doc.id } as ProfileProps);
    });
    return data;
  } else {
    return userListStorage;
  }
}

export const getUserById = async (id: string): Promise<ProfileProps> => {
  const users = await getUserList();

  return users.find((user) => user.uid === id) as ProfileProps;
};

export async function getCompanyList(): Promise<ProfileProps[]> {
  const userList = await getUserList();
  return userList.filter((user) => user.isCompany);
}

export function getUserData(): Partial<ProfileProps> {
  const user = getUser();
  const db = getFirestore(app);

  const userData = window.localStorage.getItem("userData");
  if (!userData) {
    let _data: Partial<ProfileProps> = {};
    getDocs(collection(db, "people")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as ProfileProps;
        if (data.uid === user.uid) {
          window.localStorage.setItem(
            "userData",
            JSON.stringify({ ...data, dbId: doc.id })
          );
          _data = data;
          return;
        }
      });
    });
    return _data;
  }
  return JSON.parse(userData);
}
