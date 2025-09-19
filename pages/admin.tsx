import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    // Przekieruj do Payload CMS admin panel
    window.location.replace("/api/payload");
  }, []);
  return null;
}
