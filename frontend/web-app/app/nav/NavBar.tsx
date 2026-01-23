'use client'

import AppSearchbar from '../components/AppSearchbar';
import AppLogo from '../components/AppLogo';
import AppLoginButton from '../components/AppLoginButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';
import { useSession } from 'next-auth/react';

export default function NavBar() {
    const session = useSession();

    return (
        <header className='p-3 sticky top-0 z-50 flex justify-between shadow-md text-gray-800 items-center bg-white'>
            <AppLogo />
            <AppSearchbar />
            { session.data?.user ?  ( <UserActions user={session.data.user} /> ) : ( <AppLoginButton /> ) }
        </header>
    );
}