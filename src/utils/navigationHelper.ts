export const getNavigationPath = (route: string) => {
    const userRole = localStorage.getItem("userRole")
    const userId = localStorage.getItem("userId")
    
    if (!userRole || !userId) return "/login"
  
    /* Construcción de rutas dinámicas */
    const dynamicRoutes: Record<string, string> = {
        home: `/home`,
        clientHome: `/home/${userRole}/${userId}`,
        profile: `/profile/${userRole}/${userId}`,
        travels: `/profile/${userRole}/${userId}/travels`,
        data: `/profile/${userRole}/${userId}/data`,
        confirmation:`/confirmation`,
        califications: `/profile/${userRole}/${userId}/califications`,
        logout: "/login",
    }
  
    return dynamicRoutes[route] || "/login"
  }