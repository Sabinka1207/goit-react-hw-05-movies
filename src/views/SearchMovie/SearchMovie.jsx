import css from "./SearchMovie.module.css"

function SearchMovie({ onClick }) {
    return (
        <form className={css.searchForm} onSubmit={e => {
            e.preventDefault()
            onClick(e.target.elements.request.value.trim())
            // e.target.elements.request.value = ''
        }} >
            <button type="submit" className={css.submitBtn}>
            <span>Search</span>
            </button>

            <input
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie..."
            className={css.textArea}
            />
        </form>
    )
    
}

export default SearchMovie