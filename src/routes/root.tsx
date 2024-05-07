import { Outlet } from "react-router-dom";

export default function Root() {
  return <div style={{ height: '100vh', width: '100vw'}}><Outlet /></div>
}