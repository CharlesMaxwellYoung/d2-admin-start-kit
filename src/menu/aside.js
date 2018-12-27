// 菜单 侧边栏
export default [
    {
        path: '/index',
        title: '首页',
        icon: 'home'
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
                path: '/demo/page2',
                title: '草稿文章',
                icon: 'file-text-o',
            },
            {
                path: '/demo/page3',
                title: '已经发表',
                icon: "file-word-o"
            },
            {
                path: '/demo/page3',
                title: '评论处理',
                icon: 'comment'
            }
        ]
    }
]
