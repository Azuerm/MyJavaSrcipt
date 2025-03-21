document.querySelector('.bg-ipt').addEventListener('change', e => {
    // 1.图片上传，设置body的背景
    console.log(e.target.files[0])
    const fd = new FormData()
    fd.append('img', e.target.files[0])
    axios({
        url:'http://hmajax.itheima.net/api/uploadimg',
        method: 'post',
        data: fd
    }).then( result => {
        const imgUrl = result.data.data.url
        document.body.style.backgroundImage = `url(${imgUrl})`
        // 2.上传成功， 保存 url网址
        localStorage.setItem('bgImg',imgUrl)
    })
})
 // 3.网页运行后，获取url网址使用
 const bgUrl = localStorage.getItem('bgImg')
 console.log(bgUrl)
//  本地有背景图才设置，利用逻辑与中断
 bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`)
 