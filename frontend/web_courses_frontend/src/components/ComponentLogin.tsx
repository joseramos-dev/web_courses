import { AuthBoxInput, AuthFooterLink } from "./ComponentAuthShared";

interface ComponentLoginProps {
    user: string;
    setUser: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    registerClickHandler: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    handleSubmit: (e: React.SyntheticEvent) => void;
    error: string;
}

export const CommponentLogin = ({
    user,
    setUser,
    password,
    setPassword,
    registerClickHandler,
    handleSubmit,
    error
}: ComponentLoginProps) => {

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md w-100">
            <div>
                <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
                <AuthBoxInput
                    label="Username"
                    text={user}
                    onInputChange={setUser}
                />
                <AuthBoxInput
                    label="Password"
                    text={password}
                    onInputChange={setPassword}
                    type="password"
                />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Login</button>
                {error.length > 0 &&
                    (<p className="text-red-500 text-sm mt-2">{error}</p>)
                }
                <AuthFooterLink
                    message="Don't have an account?"
                    linkText="Register here"
                    href="/register"
                    onClick={registerClickHandler}
                />
            </div>
        </form>
    )
}