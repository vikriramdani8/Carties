import AppSearchbar from '../components/AppSearchbar';
import AppLogo from '../components/AppLogo';
import AppLoginButton from '../components/AppLoginButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';

export default async function NavBar() {
    const user = await getCurrentUser();

    return (
        <header className='p-3 sticky top-0 z-50 flex justify-between shadow-md text-gray-800 items-center bg-white'>
            <AppLogo />
            <AppSearchbar />
            { user ?  ( <UserActions user={user} /> ) : ( <AppLoginButton /> ) }
        </header>
    );
}