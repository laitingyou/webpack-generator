import Mock from 'mockjs'
Mock.mock('/qq','get', function () {
    return {
        aa:23432
    }
})

export default Mock
