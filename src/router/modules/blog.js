import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
    path: '/blog',
    name: 'blog',
    meta,
    redirect: {name: 'blog-articles'},
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'articles',
            name: `${pre}articles`,
            component: () => import('@/pages/blog/articles'),
            meta: {
                meta,
                title: '所有文章',
                breadcrumb: [
                    {
                        name: '博客管理',
                        pathName: '/blog/articles'
                    },
                    {
                        name: '全部文章',
                        pathName: '/blog/articles'
                    }
                ]
            }
        },
        {
            path: 'write-article',
            name: `${pre}write-article`,
            component: () => import('@/pages/blog/write-article'),
            meta: {
                meta,
                title: '编写博客',
                breadcrumb: [
                    {
                        name: '博客管理',
                        pathName: '/blog/write-article'
                    },
                    {
                        name: '编写博客',
                        pathName: '/blog/write-article'
                    }
                ]
            }
        }
    ])('article-')
}
