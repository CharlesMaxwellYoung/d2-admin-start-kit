// 菜单 侧边栏
export default [
    {path: '/index', title: '首页', icon: 'home'},
    {
        title: '演示页面',
        icon: 'folder-o',
        children: [
            {
                path: '/demo/page1',
                title: '页面 1'
            },
            {
                path: '/demo/page2',
                title: '页面 2'
            },
            {
                path: '/demo/page3',
                title: '页面 3'
            }
        ]
    },
    {
        title: '博客管理',
        icon: 'file-text',
        children: [
            {
                path: '/blog/articles',
                title: '全部文章'
            },
            {
                path: '/blog/write-article',
                title: '编写博客'
            },
            {
                path: '/demo/page2',
                title: '草稿文章'
            },
            {
                path: '/demo/page3',
                title: '已经发表'
            },
            {
                path: '/demo/page3',
                title: '评论处理'
            }
        ]
    }
]
