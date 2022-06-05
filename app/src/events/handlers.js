export default function( BUS, store, billing, auth ) {
    BUS.on('message', (data) => {
        if (store.notificationsEnabled) {
            store.adminMessage(data.message);
            billing.getMessages(auth?.user?.customer.id);
        }
    });
}