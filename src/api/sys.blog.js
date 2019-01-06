import axios from '@/plugin/axios'


const url = '/blog';

export function getBlog({pageNumber, pageSize}) {
    return axios.request({
        url: `${url}?page=${pageNumber}&size=${pageSize}`,
        method: 'get'
    })
}

export function saveBlog(data = {}) {
    return axios.request({
        url,
        method: 'post',
        data
    })
}

export function updateBlog(data = {}) {
    return axios.request({
        url,
        method: 'put',
        data
    })
}

export function deleteBlog(title) {
    return axios.request({
        url: `${url}?title=${title}`,
        method: 'delete'
    })
}

