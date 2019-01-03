import {getBlog, saveBlog, updateBlog, deleteBlog, findByIdAndUpdate} from '@/api/sys.blog'
import isEmpty from 'lodash/isEmpty'

export default {
    namespaced: true,
    state: {
        blogs: [],
        currentBlog: {},
        editBlog: {}
    },
    getters: {
        getBlogById(state) {
            return (id) => state.blogs.find(item._id === id);
        }
    },
    mutations: {
        setBlog(state, blogs) {
            state.blogs = blogs
        },
        setCurrentBlog(state, currentBlog) {
            state.currentBlog = currentBlog
        }

    },
    actions: {
        async getBlog({commit}) {
            const {data} = await getBlog();
            commit('setBlog', data);
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
        async deleteBlog({}, title) {
            const data = await deleteBlog(title);
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
