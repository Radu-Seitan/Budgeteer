export type Order = {
    id: number;
    number: string;
    client: string;
    capacity: number;
    value: number;
    deliveryDate?: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type OrderForm = Omit<Order, 'id' | 'isDeleted' | 'isActive'>;
