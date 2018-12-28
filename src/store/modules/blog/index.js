import {getBlog, saveBlog, updateBlog, deleteBlog} from '@/api/sys.blog'

export default {
    namespaced: true,
    state: {
        blogs: [],
        currentBlog: {}
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
            const data = await saveBlog(blog);
        },

        async updateBlog({}, blog) {
            const data = await updateBlog(blog);
        },

        async deleteBlog({}, title) {
            const data = await deleteBlog(title);
        }
    }
}
