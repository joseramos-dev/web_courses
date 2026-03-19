import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface AuthInputProps {
    label: string;
    text: string;
    onInputChange: (input: string) => void;
    type: string;
}

export const AuthBoxInput = ({ label, text, onInputChange, type }: AuthInputProps) => (
    <div className="mb-4">
        <label>
            <span className="block text-sm font-medium text-gray-700">{label}</span>
            <div className="relative mt-1">
                <AuthInput
                    label={label}
                    text={text}
                    onInputChange={onInputChange}
                    type={type} />
            </div>
        </label>
    </div>
);

export const AuthInput = (
    { label, text, onInputChange, type }: AuthInputProps
) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <input
                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pr-10"
                onChange={e => onInputChange(e.target.value)}
                value={text}
                type={(type === "password" && !isVisible) ? "password" : "text"}
            />
            {(type === "password") &&
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
            }
        </>
    )


}





interface AuthFooterLinkProps {
    message: string;
    linkText: string;
    href: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const AuthFooterLink = ({ message, linkText, href, onClick }: AuthFooterLinkProps) => (
    <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
            {message} <a href={href} className="text-blue-500 hover:text-blue-800 font-semibold" onClick={onClick}>{linkText}</a>
        </p>
    </div>
);