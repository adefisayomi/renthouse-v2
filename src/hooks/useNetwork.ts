import { useEffect, useState, useCallback } from "react";

export default function useNetwork() {
    const [isOnline, setIsOnline] = useState(() => 
        typeof window !== 'undefined' ? window.navigator.onLine : true
    );

    const updateNetwork = useCallback(() => {
        setIsOnline(window.navigator.onLine);
    }, []);

    useEffect(() => {
        const handleOffline = () => updateNetwork();
        const handleOnline = () => updateNetwork();

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, [updateNetwork]);

    return isOnline;
}
