const CategoryService = {}

CategoryService.getAllCategories = async () => {
    let res = await fetch(`/categories`)
    return res
}

CategoryService.getCategory = async (categoryId) => {
    let res = await fetch(`/categories/${categoryId}`)
    return res
}

export default CategoryService