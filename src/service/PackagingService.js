const PackagingService = {}

PackagingService.getAllPackaging = async (categoryId) => {
    let res = await fetch(`/categories/${categoryId}/packaging`)
    return res.json()
}

PackagingService.getPackaging = async (categoryId, packagingId) => {
    let res = await fetch(`/categories/${categoryId}/packaging/${packagingId}`)
    return res.json();
}

export default PackagingService