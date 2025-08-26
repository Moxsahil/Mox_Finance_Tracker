"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";
import { useTheme } from "next-themes";

type Props = {
    onChange: (value?: string) => void;
    onCreate?: (value: string) => void;
    options?: { label: string; value: string}[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
};


export const Select = ({ onChange, onCreate, options = [], value, disabled, placeholder }: Props) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const onSelect = (
        option: SingleValue<{ label: string; value: string }>
    ) => {
        onChange(option?.value);
    };

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value])
    return (
        <CreateableSelect 
            placeholder={placeholder}
            className="text-sm h-10"
            styles={{
                control: (base, state) => ({
                    ...base,
                    height: '40px',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    borderColor: isDark ? '#525252' : '#d4d4d8', // neutral-600 : neutral-300
                    backgroundColor: isDark ? '#262626' : '#fafafa', // neutral-800 : neutral-50
                    color: isDark ? '#ffffff' : '#171717', // white : neutral-900
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: isDark ? '#404040' : '#a3a3a3', // neutral-700 : neutral-400
                        backgroundColor: isDark ? '#1c1c1c' : '#f5f5f5', // neutral-900 : neutral-100
                    },
                    ...(state.isFocused && {
                        borderColor: isDark ? '#ffffff' : '#171717', // white : neutral-900
                        backgroundColor: isDark ? '#1c1c1c' : '#f5f5f5', // neutral-900 : neutral-100
                    }),
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: isDark ? 'rgba(23, 23, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)', // neutral-900/95 : white/95
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    border: isDark ? '2px solid #525252' : '2px solid #d4d4d8', // neutral-600 : neutral-300
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                }),
                menuList: (base) => ({
                    ...base,
                    padding: '8px',
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected 
                        ? (isDark ? '#ffffff' : '#171717') // white : neutral-900
                        : state.isFocused 
                        ? (isDark ? '#262626' : '#f5f5f5') // neutral-800 : neutral-100
                        : 'transparent',
                    color: state.isSelected 
                        ? (isDark ? '#171717' : '#ffffff') // neutral-900 : white
                        : (isDark ? '#ffffff' : '#171717'), // white : neutral-900
                    borderRadius: '8px',
                    margin: '2px 0',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: state.isSelected 
                            ? (isDark ? '#d4d4d8' : '#404040') // neutral-300 : neutral-700
                            : (isDark ? '#262626' : '#f5f5f5'), // neutral-800 : neutral-100
                    },
                }),
                placeholder: (base) => ({
                    ...base,
                    color: isDark ? '#a3a3a3' : '#737373', // neutral-400 : neutral-500
                }),
                singleValue: (base) => ({
                    ...base,
                    color: isDark ? '#ffffff' : '#171717', // white : neutral-900
                }),
                input: (base) => ({
                    ...base,
                    color: isDark ? '#ffffff' : '#171717', // white : neutral-900
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    backgroundColor: isDark ? '#525252' : '#d4d4d8', // neutral-600 : neutral-300
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    color: isDark ? '#a3a3a3' : '#737373', // neutral-400 : neutral-500
                    '&:hover': {
                        color: isDark ? '#ffffff' : '#404040', // white : neutral-700
                    },
                }),
            }}
            value={formattedValue}
            onChange={onSelect}
            isDisabled={disabled}
            options={options}
            onCreateOption={onCreate}
        />
    )
}