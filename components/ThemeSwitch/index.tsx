'use client'

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useTheme} from "next-themes";
import {Computer, MoonStar, SunMoon} from "lucide-react";

const ThemeSwitch = () => {
    const {theme, setTheme} = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {theme === 'light' ? <SunMoon/> : <MoonStar/>}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer' onClick={() => setTheme('light')}>
                    <SunMoon/>
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer' onClick={() => setTheme('dark')}>
                    <MoonStar/>
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer' onClick={() => setTheme('system')}>
                    <Computer/>
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSwitch;