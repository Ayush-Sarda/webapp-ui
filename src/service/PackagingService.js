const PackagingService = {}
const BACKEND_URL = "http://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

PackagingService.getAllPackaging = async (categoryId) => {
    let res = await fetch(`/categories/${categoryId}/packaging`)
    return res.json()
}

PackagingService.getPackaging = async (categoryId, packagingId) => {
    let res = await fetch(`${BACKEND_URL}/categories/${categoryId}/packaging/${packagingId}`)
    return res.json();
}

export default PackagingService