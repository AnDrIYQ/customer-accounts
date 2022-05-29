export default function( BUS, store ) {
    BUS.on('message', (data) => {
        if (store.notificationsEnabled) {
            store.message(data.message);
        }
    });
}