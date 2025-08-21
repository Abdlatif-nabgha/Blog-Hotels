import { useEffect, useState } from "react";

export default function Loading() {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === "...") return ".";
                return prev + ".";
            });
        }, 500); // every half second

        return () => clearInterval(interval);
    }, []);

    return <div>Loading{dots}</div>;
}
