import { getBlog, saveBlog, updateBlog, deleteBlog, deleteImage } from '@/api/sys.blog'
import isEmpty from 'lodash/isEmpty'

export default {
    namespaced: true,
    state: {
        blogs: [],
        currentBlog: {},
        editBlog: {},
        pagination: {},
        actionUrl: process.env.VUE_APP_API + 'images'
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
        async getBlog({ commit }, { pageNumber = 1, pageSize = 20 }) {
            const { data: { blogs, page, size, total, totalPages } } = await getBlog({
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

        async saveBlog({ commit }, blog) {
            delete blog._id;
            return await saveBlog(blog);

        },
        async deleteBlog({ dispatch, state }, id) {
            const { data } = await deleteBlog(id);
            dispatch('getBlog', {
                pageNumber: +state.pagination.page,
                pageSize: +state.pagination.size,
            });
            return data;
        },
        /**
         * 博客更新操作
         * @param blog
         * @returns {Promise<*>}
         */
        async updateBlog({ }, blog) {
            return await updateBlog(blog);
        },
        /**
         * 博客更新和新增操作
         * @param dispatch
         * @param blog
         * @returns {Promise<void>}
         */
        async updateOrSave({ dispatch }, blog) {
            const { _id } = blog;
            //新增
            if (isEmpty(_id)) {
                return dispatch('saveBlog', blog)
            } else {
                return dispatch('updateBlog', blog)
            }
        },
        async deleteImage(name, { id, moduleName }) {
            return await deleteImage(name, {
                id,
                moduleName
            })
        }

    }
}
