import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<{
        _id: string;
        username: string;
    } | null>();

    const [fetching, setFetching] = useState<boolean>(false);
    const { toast } = useToast();
    const [error, setError] = useState<string>("");

    const fetchCurrentUser = async () => {
        try {
            setFetching(true);
            const response = await fetch("/api/v1/users/current-user", {
                cache: "no-store",
            });
            const data = await response.json();

            if (!response.ok || response.status !== 200) {
                return null;
            } else {
                return data.data;
            }
        } catch (error) {
            return null;
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        (async () => {
            const user = await fetchCurrentUser();

            if (!user) {
                setError("Something went wrong while fetching messages");
            } else {
                setCurrentUser(user);
            }
        })();
    }, []);

    return { currentUser, fetching, error };
};
