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
            meta: {meta, title: '所有文章'}
        },
        {
            path: 'write-article',
            name: `${pre}write-article`,
            component: () => import('@/pages/blog/write-article'),
            meta: {meta, title: '编写博客'}
        },
        {
            path: 'page2',
            name: `${pre}page2`,
            component: () => import('@/pages/demo/page2'),
            meta: {meta, title: '页面 2'}
        },
        {
            path: 'page3',
            name: `${pre}page3`,
            component: () => import('@/pages/demo/page3'),
            meta: {meta, title: '页面 3'}
        }
    ])('demo-')
}
