import axios from '@/plugin/axios'


const url = '/blogs';

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
    const {_id} = data;
    delete  data._id;
    return axios.request({
        url: `${url}/${_id}`,
        method: 'put',
        data
    })
}

export function deleteBlog(id) {
    return axios.request({
        url: `${url}/${id}`,
        method: 'delete'
    })
}

