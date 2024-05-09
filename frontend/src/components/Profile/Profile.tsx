import React from 'react';
import * as auth0 from '@auth0/auth0-react';
import { IonContent } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface ProfileProps {
    // Define las propiedades del componente aquí
}

const Profile: React.FC<ProfileProps> = () => {
    const { user, getAccessTokenSilently } = auth0.useAuth0();
    const { t, i18n } = useTranslation(['str']);
    let token: any = {};
    const fetchData = async () => {
        let options = {
            audience: 'http://localhost/8100',
            scope: 'read:records',
            responseType: 'token',
            algorithm: 'HS256',
            detailedResponse: true 
        }
        token = await getAccessTokenSilently(options);
        token = token.id_token;
        console.log(token);
    }
    fetchData();
    
    return (
        <IonContent>
            <div className="">
                <div className=" overflow-hidden rounded-lg border">
                    

                    <div className="px-4 py-5 sm:px-6">
                    <div className="inline-block relative">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <img
                            id="avatarButton"
                            className="flex w-32 h-32 rounded-fulloverflow-hidden rounded-full absolute bg-cover object-fit object-cover"
                            src={user?.picture}
                            alt={user?.name}
                        />
                        </div>

                        
                            {user?.email_verified ? (
                                <div className={`fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-8 h-8 items-center`  }>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                </div>
                            ) : (
                                <div className={`fill-current text-white bg-red-600 rounded-full p-1 absolute bottom-0 right-0 w-8 h-8 items-center`  }>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                </div>
                            )}
                            
                    </div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 pt-2">
                            {t('profilePage.profile.userInfo')}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {t('profilePage.profile.userDetails')}
                        </p>

                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('profilePage.profile.fullName')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.name}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('profilePage.profile.correo')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.email}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('profilePage.profile.verified')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.email_verified ? 'Sí' : 'No'}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('profilePage.profile.token')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.sub}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('profilePage.profile.lastUpdate')}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.updated_at}
                                </dd>
                            </div>
                            

                        </dl>
                    </div>
                </div>
                {/* <pre>{JSON.stringify(user)}</pre> */}

            </div>
        </IonContent>
    );
};

export default Profile;