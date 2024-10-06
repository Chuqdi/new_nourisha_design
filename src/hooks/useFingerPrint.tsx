import { IPInfoContext } from "ip-info-react";
import { useContext, useEffect, useState } from "react";

export const DEVICE_ID = "device-id";
export default function useFingerPrint() {
  const [agent, setAgent] = useState("");
  const userInfo = useContext(IPInfoContext);

  // useEffect(() => {
  //   if (window && navigator) {
  //     const userAgent = navigator.userAgent;
  //     const value = userAgent.replace(/\s+/g, "_");
  //     localStorage.setItem(DEVICE_ID, value);
  //     setAgent(value);
  //   }
  // }, []);
  return userInfo.ip;
}
