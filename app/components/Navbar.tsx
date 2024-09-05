import Link from 'next/link';
import RedditText from '../../public/logo-name.svg';
import redditMobile from '../../public/reddit-full.svg';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"

export function Navbar(){
    return (
        <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
            <Link href="/" className='flex items-center gap-x-3'>
                <Image src={redditMobile} alt="Reddit mobile Logo" className='h-10 w-fit'/>
                <Image src={RedditText} alt="Reddit Desktop" className='h-9 w-fit hidden lg:block'/>
            </Link>

            <div className='flex items-center gap-x-4'>
                <ThemeToggle />
                <Button variant="secondary" asChild>
                    <RegisterLink>
                        Sign Up
                    </RegisterLink>
                </Button>
                <Button asChild>
                    <LoginLink>
                        Log In
                    </LoginLink>
                </Button>
            </div>

        </nav>
    )
}