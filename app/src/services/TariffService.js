import $api from '../http';

export default class TariffService {
    static columns(cols) {
        cols.map((col, index) => {
            cols[index] = cols[index].replaceAll('_', '');
        })
        return cols.filter(item => item !== 'v' && item !== 'id');
    }
    static get(from, limit) {
        return $api.get(`/tariffs${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
    static create(data) {
        return $api.post('/tariffs/add', data);
    }
    static update(data) {
        return $api.put('/tariffs/update', data);
    }
    static async delete(id) {
        return $api.delete(`/tariffs/remove${id ? '/' + id : ''}`)
    }
}