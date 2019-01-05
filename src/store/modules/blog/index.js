import {getBlog, saveBlog, updateBlog, deleteBlog, findByIdAndUpdate} from '@/api/sys.blog'
import isEmpty from 'lodash/isEmpty'

export default {
    namespaced: true,
    state: {
        blogs: [],
        currentBlog: {},
        editBlog: {},
        pagination: {}
    },
    mutations: {
        setBlog(state, blogs) {
            state.blogs = blogs
        },

        setCurrentBlog(state, currentBlog) {
            state.currentBlog = currentBlog
        },

        setPagination(state, setPagination) {
            state.pagination = setPagination;
        }

    },
    actions: {
        async getBlog({commit}, {pageNumber = 1, pageSize = 20}) {
            const {data: {blogs, page, size, total, totalPages}} = await getBlog({
                pageNumber,
                pageSize
            });
            commit('setPagination', {
                page,
                size,
                total,
                totalPages
            });
            commit('setBlog', blogs);
        },

        async saveBlog({commit}, blog) {
            delete blog._id;
            const {success} = await saveBlog(blog);
            return Promise((resolve) => {
                if (success) {
                    resolve('保存成功');
                } else {
                    resolve('保存失败')
                }

            })
        },
        async deleteBlog({dispatch, state}, blogId) {
            const data = await deleteBlog(blogId);
            dispatch('getBlog', {
                pageNumber: state.page,
                pageSize: state.size,
            });
            return data;
        },
        /**
         * 博客更新操作
         * @param blog
         * @returns {Promise<*>}
         */
        async updateBlog({}, blog) {
            return await updateBlog(blog);
        },
        /**
         * 博客更新和新增操作
         * @param dispatch
         * @param blog
         * @returns {Promise<void>}
         */
        async updateOrSave({dispatch}, blog) {
            const {_id} = blog;
            //新增
            if (isEmpty(_id)) {
                return dispatch('saveBlog', blog)
            } else {
                return dispatch('updateBlog', blog)
            }
        }

    }
}
