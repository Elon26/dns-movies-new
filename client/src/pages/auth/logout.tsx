import Link from "next/link";
import React from "react";
import { axiosAuth } from "../../lib/axios";

export default function Logout() {
    const handleLogout = async () => {
        await axiosAuth.post(`api/auth/logout`);
    };
    return (
        <div>
            <p>Вы действительно хотите выйти?</p>
            <button onClick={handleLogout}>yes</button>
            <Link href="/auth/login">no</Link>
        </div>
    );
}
