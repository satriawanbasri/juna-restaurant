const isInRole = (pageRoles, userRoles) => {
    if (Array.isArray(pageRoles) && Array.isArray(userRoles))
        for (const role of pageRoles) if (userRoles.includes(role)) return true
    return false
}

export { isInRole }
