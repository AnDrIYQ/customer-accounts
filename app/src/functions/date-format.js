export default (date) => {
    return new Date(date).toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
}