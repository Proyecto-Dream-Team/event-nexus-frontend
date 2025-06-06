
export const PathTestId = {
    login: 'login',
    register: 'register',
    recovery: 'recovery',
    home: 'home',
    module: {
        events:'module-events',
        directive:'module-directive-info',
        admin:'module-admin'
    }
}

export const mainPaths = {
    login: `/${PathTestId.login}`,
    register: `/${PathTestId.register}`,
    recovery: `/${PathTestId.recovery}`,
    home: `/${PathTestId.home}`,
    module: {
        events:`/${PathTestId.module.events}`,
        directive:`/${PathTestId.module.directive}`,
        admin:`/${PathTestId.module.admin}`,
    }
}

export const paths = {
    login: {
        path: `${mainPaths.login}`,
        label: 'Eventos'
    },
    register: {
        path: `${mainPaths.register}`,
        label: 'Dashboard'
    },
    recovery: {
        path: `${mainPaths.recovery}`,
        label: 'Dashboard'
    },
    modules:{
        event:{
            home: {
                path: `${mainPaths.module}/events`,
                label: `Book list`
            },
            create: {
                path: `${mainPaths.module}/create`,
                label: `Book list `
            }
        },
        directive:{
            path: `${mainPaths.module.directive}`,
                label: `Book list `
        },
        admin:{
            create: {
                path: `${mainPaths.module.admin}/create-user`,
                label: `Book list`
            },
            search: {
                path: `${mainPaths.module.admin}/search-user`,
                label: `Book list `
            },
            update: {
                path: `${mainPaths.module.admin}/updateUser`,
                label: `Book list `
            }
        },
        
    }
}



export const pathToLabelMap = {

    [paths.dashboard.path]: paths.dashboard.label,

    [paths.author.list.path]: paths.author.list.label,

    [paths.author.create.path]: paths.author.create.label,

    [paths.author.edit.path]: paths.author.edit.label,

    [paths.author.show.path]: paths.author.show.label,

    [paths.books.list.path]: paths.books.list.label,

    [paths.books.create.path]: paths.books.create.label,

    [paths.books.display.path]: paths.books.display.label,

    [paths.books.edit.path]: paths.books.edit.label,


    [paths.list.book.path]: paths.list.book.label,

    [paths.list.autor.path]: paths.list.autor.label
};