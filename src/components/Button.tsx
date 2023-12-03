import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import {GoSync} from "react-icons/go"
import { ButtonProps } from '../types/button';

//wrapper for button element
function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    loading,
    ...rest
}: ButtonProps) {
    //classnames lib for applying design based on received props
    const classnames = classNames(
        'px-3 py-1.5 border flex items-center h-8',
        rest.className,
        {
            'opacity-80':loading,
            'bg-blue-500 border-blue-500 text-white hover:opacity-80': primary,
            'bg-gray-900 border-gray-900 text-white hover:opacity-80':
                secondary,
            'bg-green-500 border-green-500 text-white hover:opacity-80':
                success,
            'bg-yellow-400 border-yellow-400 text-white hover:opacity-80':
                warning,
            'bg-red-500 border-red-500 text-white hover:opacity-80': danger,
            'rounded-full': rounded,
            'bg-white': outline,
            'text-blue-500 hover:bg-blue-100': outline && primary,
            'text-gray-900 hover:bg-gray-100': outline && secondary,
            'text-green-500 hover:bg-green-100': outline && success,
            'text-yellow-400 hover:bg-yellow-100': outline && warning,
            'text-red-500 hover:bg-red-100': outline && danger
        }
    );

    const classes = twMerge(classnames);

    return (
        //underlying element
        <button {...rest} disabled={loading} className={classes}>
            {loading?<GoSync className="animate-spin"/>:children}
        </button>
    );
}

export default Button;