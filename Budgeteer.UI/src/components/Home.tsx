import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootStore } from '../store/types/RootStore';

export const Home: FC = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootStore) => state.user);

    return (
        <div>
            {user && <h1> Hello, {user.fullName} </h1>}
            <div>{t('common.hello')}</div>
        </div>
    );
};
