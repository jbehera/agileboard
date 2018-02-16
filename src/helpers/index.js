
export const orderItemsInArray = (position, nextPosition, data) => {
    const item = data.splice(--position, 1);
    data.splice(--nextPosition, 0, ...item);
    return data;
};