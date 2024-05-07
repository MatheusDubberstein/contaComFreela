import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../main";
import { JobProps } from "../routes/CreateJob";

export function updatejobList() {
  window.localStorage.removeItem("jobs");
  getJobList();
}
export async function getJobList(): Promise<JobProps[]> {
  const jobsListStorage = JSON.parse(
    window.localStorage.getItem("jobs") || "[]"
  ) as JobProps[];
  if (jobsListStorage.length === 0) {
    const data: JobProps[] = [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "jobs"));
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as JobProps);
    });
    return data;
  } else {
    return jobsListStorage;
  }
}
