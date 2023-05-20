import axios from "axios";
import { useEffect, useState } from "react";
import actors from "../mockData/actors.json";
import movies from "../mockData/movies.json";
import { SERVER_URL } from "../constats";

const useMockData = () => {
    const statusConst = {
        idle: "Not Started",
        pending: "In Process",
        succesed: "Ready",
        error: "Error Occured"
    };

    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summCount = actors.length + movies.length;

    const incrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }

        const newProgress = Math.floor((count / summCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConst.succesed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const actor of actors) {
                await axios.put(
                    SERVER_URL + "actors/" + actor.id + ".json",
                    actor
                );
                incrementCount();
            }
            for (const movie of movies) {
                await axios.put(
                    SERVER_URL + "movies/" + movie.id + ".json",
                    movie
                );
                incrementCount();
            }
        } catch (error) {
            console.log(error);
            setStatus(statusConst.error);
        }
    }

    return { initialize, progress, status };
};

export default useMockData;
