import { useEffect, useState } from "react";

export default function useFingerPrint() {
  const [agent, setAgent] = useState("");
  useEffect(() => {
    if (window && navigator) {
      const userAgent = navigator.userAgent;
      setAgent(userAgent.replace(/\s+/g, "_"))
    }
  }, []);
  return agent;
}
