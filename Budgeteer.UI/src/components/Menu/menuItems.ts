export type Menu = {
    key: string;
    title: string;
    route: string;
};

export const pageItems: Menu[] = [
    {
        key: 'orders',
        title: 'Orders',
        route: '/orders',
    },
];

export const settingsItems: Menu[] = [
    {
        key: 'about',
        title: 'About',
        route: '/about',
    },
];
