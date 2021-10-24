function SearchMovie({onClick}) {
    return (
        <form onSubmit={e => {
            e.preventDefault()
            onClick(e.target.elements.request.value.trim())
            // e.target.elements.request.value = ''
        }}>
            <button type="submit">
            <span>Search</span>
            </button>

            <input
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie..."
            />
        </form>
    )
    
}

export default SearchMovie