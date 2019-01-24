// 菜单 侧边栏
export default [
    {
        path: '/index',
        title: '首页',
        icon: 'home'
    },
    {
        path: '/index',
        title: '用户管理',
        icon: 'users',
        children: [
            {
                path: '/users',
                title: '用户管理',
                icon: 'user'
            },
            {
                path: '/roles',
                title: '角色管理',
                icon: 'user-secret'
            },
            {
                path: '/permissions',
                title: '权限管理',
                icon: 'lock'
            }
        ]
    },
    {
        title: '博客管理',
        icon: 'file-text',
        children: [
            {
                path: '/blog/articles',
                title: '全部文章',
                icon: 'file-archive-o'
            },
            {
                path: '/demo/page3',
                title: '评论处理',
                icon: 'comment'
            }
        ]
    }
]
