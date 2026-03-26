import { useState } from "react";
import { AuthBoxInput, AuthFooterLink } from "./ComponentAuthShared";

interface ComponentRegisterProps {
    username: string;
    setUsername: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    loginClickHandler: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    handleSubmit: (e: React.SyntheticEvent) => void;
    error: string;
}

export const ComponentRegister = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loginClickHandler,
    handleSubmit,
    error
}: ComponentRegisterProps) => {

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md w-100">
            <div>
                <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
                <AuthBoxInput
                    label="Username"
                    text={username}
                    onInputChange={setUsername}
                />
                <AuthBoxInput
                    label="Email"
                    text={email}
                    onInputChange={setEmail}
                    type="email"
                />
                <AuthBoxInput
                    label="Password"
                    text={password}
                    onInputChange={setPassword}
                    type="password"
                />
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition-colors">Create Account</button>
                {error.length > 0 &&
                    (<p className="text-red-500 text-sm mt-2">{error}</p>)
                }
                <AuthFooterLink
                    message="Already have an account?"
                    linkText="Login here"
                    href="/login"
                    onClick={loginClickHandler}
                />
            </div>
        </form>
    );
};