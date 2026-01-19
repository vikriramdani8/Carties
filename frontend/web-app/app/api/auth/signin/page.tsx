import AppEmptyFilter from '@/app/components/AppEmptyFilter'

export default async function SignIn(props: { searchParams: Promise<{ callbackUrl: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <AppEmptyFilter
            title='u need to be logged in to do that'
            subTitle='please click below to login'
            showLogin
            callbackUrl={searchParams.callbackUrl}
        />
    )
}
